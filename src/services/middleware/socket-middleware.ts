import type { Middleware, MiddlewareAPI } from 'redux';
import type { AppDispatch, RootState } from '../store';
import { connect, disconnect, setError } from '../slices/ws-slice';
import {refreshToken} from "../slices/user-slice";

type TActionType = {
	type: string;
	payload: any | null;
}

export const socketMiddleware = (): Middleware => {
	return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
		let socket: WebSocket | null = null;
		const { dispatch } = store;
		let reconnectAttempt = false;

		const connectSocket = (wsUrl: string, token: string, onMessageAction: string) => {
			console.log('connectSocket');

			socket = new WebSocket(`${wsUrl}${token ? '?token=' + token : ''}`);

			socket.onopen = () => {
				dispatch(connect({ wsConnected: true }));
			};

			socket.onerror = (event) => {
				console.log(event);
				dispatch(setError('WebSocket error'));
			};

			socket.onmessage = (event) => {
				const data = JSON.parse(event.data);
				if (data.success)
				{
					dispatch({type: onMessageAction, payload: data});
				}
				else if (data.message === 'Invalid or missing token')
				{
					dispatch(refreshToken()).then(()=>{
						console.log('refreshToken is fullfilled');
						console.log(socket);
						if (socket)
						{
							socket.close();
							const newToken = localStorage.getItem('accessToken');
							if (newToken) {
								const token = newToken.startsWith('Bearer ') ? newToken.slice(7) : newToken;
								connectSocket(wsUrl, token, onMessageAction);
							}
						}
					});
				}
			};

			socket.onclose = () => {
				console.log('socket.onclose');
				console.log(reconnectAttempt);
				store.dispatch(disconnect());
			};
		}

		return next => (action: TActionType) => {

			const { type, payload } = action;

			const accessToken = localStorage.getItem('accessToken');
			if (!accessToken) {
				return next(action);
			}

			const token = accessToken.startsWith('Bearer ') ? accessToken.slice(7) : accessToken;


			if (type === 'webSocket/connect' && token) {
				const { wsUrl, token, onMessageAction } = payload;

				if (!wsUrl){
					return next(action);
				}

				connectSocket(wsUrl, token, onMessageAction)
			}

			if (socket && type === 'webSocket/sendMessage') {
				const message = action.payload;
				socket.send(JSON.stringify({ ...message, token }));
			}

			next(action);
		};
	}) as Middleware;
};