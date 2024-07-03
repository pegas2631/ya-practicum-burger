import { Middleware } from '@reduxjs/toolkit';
import { connect, disconnect, setOrders, setError } from '../slices/user-orders-slice';
import { refreshToken } from '../slices/user-slice';

const userOrdersSocketMiddleware: Middleware = storeAPI => {
	let userOrdersSocket: WebSocket | null = null;

	const connectWebSocket = (wsUrl: string) => {
		if (userOrdersSocket) {
			console.log('WebSocket for user orders already exists');
			return;
		}

		userOrdersSocket = new WebSocket(wsUrl);

		userOrdersSocket.onopen = () => {
			storeAPI.dispatch(connect(''));
			console.log('WebSocket connection established for user orders');
		};

		userOrdersSocket.onmessage = event => {
			const data = JSON.parse(event.data);
			console.log(data);

			if (data.success) {
				storeAPI.dispatch(setOrders(data.orders));
				storeAPI.dispatch(setError(null));
			}
			if (data.message === 'Invalid or missing token') {
				storeAPI.dispatch(refreshToken() as any);
			}
		};

		userOrdersSocket.onclose = event => {
			storeAPI.dispatch(disconnect());
			console.log('WebSocket connection closed for user orders', event);
			userOrdersSocket = null;
			if (!event.wasClean) {
				console.error('WebSocket closed unexpectedly with code:', event.code, 'reason:', event.reason);
				setTimeout(() => connectWebSocket(wsUrl), 2000);
			}
		};

		userOrdersSocket.onerror = error => {
			storeAPI.dispatch(setError('WebSocket error'));
			console.error('WebSocket error for user orders:', error);
		};
	};

	return next => action => {
		// @ts-ignore
		if (action.type === 'userOrders/connect') {
			const accessToken = localStorage.getItem('accessToken');
			if (!accessToken) {
				storeAPI.dispatch(setError('No access token found'));
				return next(action);
			}

			const token = accessToken.startsWith('Bearer ') ? accessToken.slice(7) : accessToken;
			// @ts-ignore
			const wsUrl = `${action.payload}?token=${token}`;
			console.log('Connecting to WebSocket for user orders:', wsUrl);

			connectWebSocket(wsUrl);
		}

		// @ts-ignore
		if (action.type === 'userOrders/disconnect' && userOrdersSocket) {
			userOrdersSocket.close();
		}

		return next(action);
	};
};

export default userOrdersSocketMiddleware;