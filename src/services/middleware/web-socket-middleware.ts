import { Middleware } from '@reduxjs/toolkit';

const webSocketMiddleware: Middleware = storeAPI => {
	let allOrdersSocket: WebSocket | null = null;
	let userOrdersSocket: WebSocket | null = null;

	return next => action => {
		// @ts-ignore
		if (action.type === 'orders/connect') {
			// @ts-ignore
			allOrdersSocket = new WebSocket(action.payload);

			allOrdersSocket.onopen = () => {
				console.log('WebSocket connection established for all orders');
			};

			allOrdersSocket.onmessage = event => {
				const data = JSON.parse(event.data);
				storeAPI.dispatch({ type: 'orders/setOrders', payload: data.orders });
				storeAPI.dispatch({ type: 'orders/setTotal', payload: data.total });
				storeAPI.dispatch({ type: 'orders/setTotalToday', payload: data.totalToday });
			};

			allOrdersSocket.onclose = event => {
				console.log('WebSocket connection closed for all orders', event);
			};

			allOrdersSocket.onerror = error => {
				console.error('WebSocket error for all orders:', error);
			};
		}

		// @ts-ignore
		if (action.type === 'orders/disconnect' && allOrdersSocket) {
			allOrdersSocket.close();
		}

		// @ts-ignore
		if (action.type === 'userOrders/connect') {
			const accessToken = localStorage.getItem('accessToken');
			if (!accessToken) {
				storeAPI.dispatch({ type: 'userOrders/setError', payload: 'No access token found' });
				return next(action);
			}

			const token = accessToken.startsWith('Bearer ') ? accessToken.slice(7) : accessToken;
			// @ts-ignore
			const wsUrl = `${action.payload}?token=${token}`;
			console.log('Connecting to WebSocket for user orders:', wsUrl);

			userOrdersSocket = new WebSocket(wsUrl);

			userOrdersSocket.onopen = () => {
				storeAPI.dispatch({ type: 'userOrders/connect' });
				console.log('WebSocket connection established for user orders');
			};

			userOrdersSocket.onmessage = event => {
				const data = JSON.parse(event.data);
				if (data.success) {
					storeAPI.dispatch({ type: 'userOrders/setOrders', payload: data.orders });
				} else {
					storeAPI.dispatch({ type: 'userOrders/setError', payload: 'Failed to fetch orders' });
				}
			};

			userOrdersSocket.onclose = event => {
				storeAPI.dispatch({ type: 'userOrders/disconnect' });
				console.log('WebSocket connection closed for user orders', event);
				if (!event.wasClean) {
					console.error('WebSocket closed unexpectedly with code:', event.code, 'reason:', event.reason);
				}
			};

			userOrdersSocket.onerror = error => {
				storeAPI.dispatch({ type: 'userOrders/setError', payload: 'WebSocket error' });
				console.error('WebSocket error for user orders:', error);
			};
		}

		// @ts-ignore
		if (action.type === 'userOrders/disconnect' && userOrdersSocket) {
			userOrdersSocket.close();
		}

		return next(action);
	};
};

export default webSocketMiddleware;