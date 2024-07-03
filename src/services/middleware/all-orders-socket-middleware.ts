import { Middleware } from '@reduxjs/toolkit';

const allOrdersSocketMiddleware: Middleware = storeAPI => {
	let allOrdersSocket: WebSocket | null = null;

	return next => (action: any) => {

		if (action.type === 'orders/connect') {

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

		if (action.type === 'orders/disconnect' && allOrdersSocket) {
			allOrdersSocket.close();
		}

		return next(action);
	};
};

export default allOrdersSocketMiddleware;