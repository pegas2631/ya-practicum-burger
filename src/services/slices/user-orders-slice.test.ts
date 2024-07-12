import reducer, { setOrders, clearOrders, initialState } from './user-orders-slice';
import { TOrder } from '../../utils/types';
import { TEST_ORDER } from '../../utils/test-data';

describe('userOrdersSlice', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {} as any)).toEqual(initialState);
	});

	it('should handle setOrders', () => {
		const orders: TOrder[] = [
			{ ...TEST_ORDER, _id: '1', number: 1, owner: 'owner1' },
			{ ...TEST_ORDER, _id: '2', status: 'pending', name: 'Order 2', createdAt: '2023-01-02', updatedAt: '2023-01-02', number: 2, owner: 'owner2' },
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
		};

		expect(reducer(initialState, setOrders(payload))).toEqual(expectedState);
	});

	it('should handle clearOrders', () => {
		const stateWithOrders = {
			...initialState,
			orders: [
				{ ...TEST_ORDER, _id: '1', number: 1, owner: 'owner1' },
				{ ...TEST_ORDER, _id: '2', status: 'pending', name: 'Order 2', createdAt: '2023-01-02', updatedAt: '2023-01-02', number: 2, owner: 'owner2' },
			],
		};

		expect(reducer(stateWithOrders, clearOrders())).toEqual(initialState);
	});
});