import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import fetchMock from 'fetch-mock';
import reducer, { fetchOrder, setOrder, clearOrder, initialState } from './order-slice';
import { BASE_URL } from '../../utils/request-helper';
import { TEST_ORDER } from '../../utils/test-data';

const middlewares = [thunk];
// @ts-ignore
const mockStore = configureMockStore(middlewares);

describe('orderSlice', () => {
	afterEach(() => {
		fetchMock.restore();
	});

	it('should return the initial state', () => {
		expect(reducer(undefined, {} as any)).toEqual(initialState);
	});

	it('should handle setOrder', () => {
		const expectedState = {
			...initialState,
			order: TEST_ORDER,
		};

		expect(reducer(initialState, setOrder(TEST_ORDER))).toEqual(expectedState);
	});

	it('should handle clearOrder', () => {
		const stateWithOrder = {
			...initialState,
			order: TEST_ORDER,
		};

		expect(reducer(stateWithOrder, clearOrder())).toEqual(initialState);
	});

	it('should handle fetchOrder pending', () => {
		const action = { type: fetchOrder.pending.type };
		const expectedState = {
			...initialState,
			isLoading: true,
		};

		expect(reducer(initialState, action)).toEqual(expectedState);
	});

	it('should handle fetchOrder fulfilled', () => {
		const action = { type: fetchOrder.fulfilled.type, payload: TEST_ORDER };
		const expectedState = {
			...initialState,
			isLoading: false,
			order: TEST_ORDER,
		};

		expect(reducer(initialState, action)).toEqual(expectedState);
	});

	it('should handle fetchOrder rejected', () => {
		const action = { type: fetchOrder.rejected.type, error: { message: 'Fetch failed' } };
		const expectedState = {
			...initialState,
			isLoading: false,
		};

		expect(reducer(initialState, action)).toEqual(expectedState);
	});

	it('should dispatch fetchOrder and handle success', async () => {
		const ingredientsIds = ['1', '2'];

		fetchMock.postOnce(`${BASE_URL}/orders`, {
			body: { order: TEST_ORDER, success: true },
			headers: { 'content-type': 'application/json' },
		});

		const expectedActions = [
			{ type: fetchOrder.pending.type, meta: expect.any(Object) },
			{ type: fetchOrder.fulfilled.type, payload: TEST_ORDER, meta: expect.any(Object) },
		];

		const store = mockStore(initialState);

		await store.dispatch(fetchOrder(ingredientsIds) as any);
		expect(store.getActions()).toEqual(expectedActions);
	});

	it('should dispatch fetchOrder and handle failure', async () => {
		const ingredientsIds = ['1', '2'];

		fetchMock.postOnce(`${BASE_URL}/orders`, {
			throws: new Error('Fetch failed'),
		});

		const expectedActions = [
			{ type: fetchOrder.pending.type, meta: expect.any(Object) },
			{ type: fetchOrder.rejected.type, error: expect.any(Object), meta: expect.any(Object) },
		];

		const store = mockStore(initialState);

		await store.dispatch(fetchOrder(ingredientsIds) as any);
		expect(store.getActions()).toEqual(expectedActions);
	});
});