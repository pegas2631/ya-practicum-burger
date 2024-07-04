import type { Middleware, MiddlewareAPI } from 'redux';
import type { AppDispatch, RootState } from '../store';
import { connect, disconnect, setError } from '../slices/ws-slice';

type TActionType = {
	type: string;
	payload: any | null;
}

export const socketMiddleware = (): Middleware => {
	return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
		let socket: WebSocket | null = null;

		return next => (action: TActionType) => {
			const { dispatch } = store;
			const { type, payload } = action;

			const accessToken = localStorage.getItem('accessToken');
			if (!accessToken) {
				return next(action);
			}

			const token = accessToken.startsWith('Bearer ') ? accessToken.slice(7) : accessToken;

			if (type === 'webSocket/connect' && token) {
				const { wsUrl, onMessageAction } = payload;
				socket = new WebSocket(`${wsUrl}?token=${token}`);

				socket.onopen = () => {
					dispatch(connect({ wsConnected: true }));
				};

				socket.onerror = (event) => {
					dispatch(setError('WebSocket error'));
				};

				socket.onmessage = (event) => {
					const data = JSON.parse(event.data);
					dispatch({type: payload.onMessageAction, payload: data});
				};

				socket.onclose = () => {
					dispatch(disconnect());
				};
			}

			if (socket && type === 'webSocket/sendMessage') {
				const message = action.payload;
				socket.send(JSON.stringify({ ...message, token }));
			}

			next(action);
		};
	}) as Middleware;
};