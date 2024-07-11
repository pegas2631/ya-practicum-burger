import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import fetchMock from 'fetch-mock';
import reducer, { fetchOrder, setOrder, clearOrder } from './order-slice';
import { IOrderState } from './order-slice'; // Импортируйте интерфейс состояния, если он экспортируется

const BASE_URL = 'https://norma.nomoreparties.space/api';

const middlewares = [thunk];
// @ts-ignore
const mockStore = configureMockStore(middlewares);

describe('orderSlice', () => {
	afterEach(() => {
		fetchMock.restore();
	});

	const initialState: IOrderState = {
		order: {
			number: null,
		},
		isLoading: false,
	};

	it('should return the initial state', () => {
		expect(reducer(undefined, {} as any)).toEqual(initialState);
	});

	it('should handle setOrder', () => {
		const order = { number: 12345 };
		const expectedState = {
			...initialState,
			order,
		};

		expect(reducer(initialState, setOrder(order))).toEqual(expectedState);
	});

	it('should handle clearOrder', () => {
		const stateWithOrder = {
			...initialState,
			order: { number: 12345 },
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
		const order = { number: 12345 };
		const action = { type: fetchOrder.fulfilled.type, payload: order };
		const expectedState = {
			...initialState,
			isLoading: false,
			order,
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
		const order = { number: 12345 };
		const ingredientsIds = ['1', '2'];

		fetchMock.postOnce(`${BASE_URL}/orders`, {
			body: { order, success: true },
			headers: { 'content-type': 'application/json' },
		});

		const expectedActions = [
			{ type: fetchOrder.pending.type, meta: expect.any(Object) },
			{ type: fetchOrder.fulfilled.type, payload: order, meta: expect.any(Object) },
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