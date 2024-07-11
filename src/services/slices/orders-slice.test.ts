import reducer, { setOrders, clearOrders } from './orders-slice';
import { TOrder } from '../../utils/types';

interface IOrdersState {
	orders: TOrder[];
	isConnected: boolean;
	total: number;
	totalToday: number;
}

const initialState: IOrdersState = {
	orders: [],
	isConnected: false,
	total: 0,
	totalToday: 0,
};

describe('ordersSlice', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {} as any)).toEqual(initialState);
	});

	it('should handle setOrders', () => {
		const orders: TOrder[] = [
			{ _id: '1', ingredients: ['1', '2'], status: 'done', name: 'Order 1', createdAt: '2023-01-01', updatedAt: '2023-01-01', number: 1, owner: 'owner1', __v: 0 },
			{ _id: '2', ingredients: ['3', '4'], status: 'pending', name: 'Order 2', createdAt: '2023-01-02', updatedAt: '2023-01-02', number: 2, owner: 'owner2', __v: 0 },
		];
		const payload = {
			orders,
			success: true,
			total: 100,
			totalToday: 10,
		};
		const expectedState = {
			...initialState,
			orders: payload.orders,
			total: payload.total,
			totalToday: payload.totalToday,
		};

		expect(reducer(initialState, setOrders(payload))).toEqual(expectedState);
	});

	it('should handle clearOrders', () => {
		const stateWithOrders = {
			...initialState,
			orders: [
				{ _id: '1', ingredients: ['1', '2'], status: 'done', name: 'Order 1', createdAt: '2023-01-01', updatedAt: '2023-01-01', number: 1, owner: 'owner1', __v: 0 },
				{ _id: '2', ingredients: ['3', '4'], status: 'pending', name: 'Order 2', createdAt: '2023-01-02', updatedAt: '2023-01-02', number: 2, owner: 'owner2', __v: 0 },
			],
		};

		expect(reducer(stateWithOrders, clearOrders())).toEqual(initialState);
	});
});