import configureMockStore from 'redux-mock-store';
import {thunk} from 'redux-thunk';
import fetchMock from 'fetch-mock';
import reducer, {
	addIngredient,
	clearIngredients,
	addIngredients,
	increaseIngredientCount,
	decreaseIngredientCount,
	fetchIngredients,
} from './ingredients-slice';
import { TIngredient } from '../../utils/types';

const BASE_URL = 'https://norma.nomoreparties.space/api';

const middlewares = [thunk];
// @ts-ignore
const mockStore = configureMockStore(middlewares);

describe('ingredientsSlice', () => {
	afterEach(() => {
		fetchMock.restore();
	});

	const initialState = {
		ingredients: [],
		isLoading: false,
	};

	it('should return the initial state', () => {
		expect(reducer(undefined, {} as any)).toEqual(initialState);
	});

	it('should handle addIngredient', () => {
		const ingredient: TIngredient = {
			_id: '1',
			name: 'Lettuce',
			type: 'main',
			proteins: 1,
			fat: 1,
			carbohydrates: 1,
			calories: 1,
			price: 1,
			image: 'image_url',
			image_mobile: 'image_mobile_url',
			image_large: 'image_large_url',
			uuid: 'uuid-1',
			__v: 0,
			count: 1,
		};

		const expectedState = {
			...initialState,
			ingredients: [ingredient],
		};

		expect(reducer(initialState, addIngredient(ingredient))).toEqual(expectedState);
	});

	it('should handle clearIngredients', () => {
		const ingredients: TIngredient[] = [
			{ _id: '1', name: 'Lettuce', type: 'main', proteins: 1, fat: 1, carbohydrates: 1, calories: 1, price: 1, image: 'image_url', image_mobile: 'image_mobile_url', image_large: 'image_large_url', uuid: 'uuid-1', __v: 0, count: 1 },
			{ _id: '2', name: 'Tomato', type: 'main', proteins: 1, fat: 1, carbohydrates: 1, calories: 1, price: 2, image: 'image_url', image_mobile: 'image_mobile_url', image_large: 'image_large_url', uuid: 'uuid-2', __v: 0, count: 1 },
		];
		const stateWithIngredients = {
			...initialState,
			ingredients,
		};

		expect(reducer(stateWithIngredients, clearIngredients())).toEqual(initialState);
	});

	it('should handle addIngredients', () => {
		const ingredients: TIngredient[] = [
			{ _id: '1', name: 'Lettuce', type: 'main', proteins: 1, fat: 1, carbohydrates: 1, calories: 1, price: 1, image: 'image_url', image_mobile: 'image_mobile_url', image_large: 'image_large_url', uuid: 'uuid-1', __v: 0, count: 1 },
			{ _id: '2', name: 'Tomato', type: 'main', proteins: 1, fat: 1, carbohydrates: 1, calories: 1, price: 2, image: 'image_url', image_mobile: 'image_mobile_url', image_large: 'image_large_url', uuid: 'uuid-2', __v: 0, count: 1 },
		];

		const expectedState = {
			...initialState,
			ingredients: ingredients,
		};

		expect(reducer(initialState, addIngredients(ingredients))).toEqual(expectedState);
	});

	it('should handle increaseIngredientCount', () => {
		const ingredients: TIngredient[] = [
			{ _id: '1', name: 'Lettuce', type: 'main', proteins: 1, fat: 1, carbohydrates: 1, calories: 1, price: 1, image: 'image_url', image_mobile: 'image_mobile_url', image_large: 'image_large_url', uuid: 'uuid-1', __v: 0, count: 0 },
			{ _id: '2', name: 'Tomato', type: 'main', proteins: 1, fat: 1, carbohydrates: 1, calories: 1, price: 2, image: 'image_url', image_mobile: 'image_mobile_url', image_large: 'image_large_url', uuid: 'uuid-2', __v: 0, count: 0 },
		];

		const stateWithIngredients = {
			...initialState,
			ingredients: ingredients,
		};

		const expectedState = {
			...initialState,
			ingredients: [
				{ ...ingredients[0], count: 1 },
				ingredients[1],
			],
		};

		expect(reducer(stateWithIngredients, increaseIngredientCount({ _id: '1', type: 'main' }))).toEqual(expectedState);
	});

	it('should handle decreaseIngredientCount', () => {
		const ingredients: TIngredient[] = [
			{ _id: '1', name: 'Lettuce', type: 'main', proteins: 1, fat: 1, carbohydrates: 1, calories: 1, price: 1, image: 'image_url', image_mobile: 'image_mobile_url', image_large: 'image_large_url', uuid: 'uuid-1', __v: 0, count: 1 },
			{ _id: '2', name: 'Tomato', type: 'main', proteins: 1, fat: 1, carbohydrates: 1, calories: 1, price: 2, image: 'image_url', image_mobile: 'image_mobile_url', image_large: 'image_large_url', uuid: 'uuid-2', __v: 0, count: 0 },
		];

		const stateWithIngredients = {
			...initialState,
			ingredients: ingredients,
		};

		const expectedState = {
			...initialState,
			ingredients: [
				{ ...ingredients[0], count: 0 },
				ingredients[1],
			],
		};

		expect(reducer(stateWithIngredients, decreaseIngredientCount({ _id: '1' }))).toEqual(expectedState);
	});

	it('should handle fetchIngredients pending', () => {
		const action = { type: fetchIngredients.pending.type };
		const expectedState = {
			...initialState,
			isLoading: true,
		};

		expect(reducer(initialState, action)).toEqual(expectedState);
	});

	it('should handle fetchIngredients fulfilled', () => {
		const ingredients: TIngredient[] = [
			{ _id: '1', name: 'Lettuce', type: 'main', proteins: 1, fat: 1, carbohydrates: 1  , calories: 1, price: 1, image: 'image_url', image_mobile: 'image_mobile_url', image_large: 'image_large_url', uuid: 'uuid-1', __v: 0, count: 1 },
			{ _id: '2', name: 'Tomato', type: 'main', proteins: 1, fat: 1, carbohydrates: 1, calories: 1, price: 2, image: 'image_url', image_mobile: 'image_mobile_url', image_large: 'image_large_url', uuid: 'uuid-2', __v: 0, count: 1 },
		];

		const action = { type: fetchIngredients.fulfilled.type, payload: ingredients };
		const expectedState = {
			...initialState,
			isLoading: false,
			ingredients: ingredients,
		};

		expect(reducer(initialState, action)).toEqual(expectedState);
	});

	it('should handle fetchIngredients rejected', () => {
		const action = { type: fetchIngredients.rejected.type, error: { message: 'Fetch failed' } };
		const expectedState = {
			...initialState,
			isLoading: false,
		};

		expect(reducer(initialState, action)).toEqual(expectedState);
	});

	it('should dispatch fetchIngredients and handle success', async () => {
		const ingredients: TIngredient[] = [
			{ _id: '1', name: 'Lettuce', type: 'main', proteins: 1, fat: 1, carbohydrates: 1, calories: 1, price: 1, image: 'image_url', image_mobile: 'image_mobile_url', image_large: 'image_large_url', uuid: 'uuid-1', __v: 0, count: 1 },
			{ _id: '2', name: 'Tomato', type: 'main', proteins: 1, fat: 1, carbohydrates: 1, calories: 1, price: 2, image: 'image_url', image_mobile: 'image_mobile_url', image_large: 'image_large_url', uuid: 'uuid-2', __v: 0, count: 1 },
		];

		fetchMock.getOnce(`${BASE_URL}/ingredients`, {
			body: { data: ingredients, success: true },
			headers: { 'content-type': 'application/json' },
		});

		const expectedActions = [
			{ type: fetchIngredients.pending.type, meta: expect.any(Object) },
			{ type: fetchIngredients.fulfilled.type, payload: ingredients, meta: expect.any(Object) },
		];

		const store = mockStore(initialState);

		await store.dispatch(fetchIngredients() as any);
		expect(store.getActions()).toEqual(expectedActions);
	});

	it('should dispatch fetchIngredients and handle failure', async () => {
		fetchMock.getOnce(`${BASE_URL}/ingredients`, {
			throws: new Error('Fetch failed'),
		});

		const expectedActions = [
			{ type: fetchIngredients.pending.type, meta: expect.any(Object) },
			{ type: fetchIngredients.rejected.type, error: expect.any(Object), meta: expect.any(Object) },
		];

		const store = mockStore(initialState);

		await store.dispatch(fetchIngredients() as any);
		expect(store.getActions()).toEqual(expectedActions);
	});
});