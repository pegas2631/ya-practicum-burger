import fetchMock from 'fetch-mock';
import {PayloadAction} from '@reduxjs/toolkit';
import reducer, {
	addIngredient,
	removeIngredient,
	clearIngredients,
	addIngredients,
	setBun,
	moveIngredient,
	initialState,
} from './burger-constructor-slice';
import { TIngredient } from '../../utils/types';
import { IBurgerConstructorState } from './burger-constructor-slice';
import { TEST_INGREDIENT } from '../../utils/test-data';

describe('burgerConstructorSlice', () => {
	afterEach(() => {
		fetchMock.restore();
	});

	it('should return the initial state', () => {
		expect(reducer(undefined, {} as  PayloadAction<TIngredient>)).toEqual(initialState);
	});

	it('should handle addIngredient', () => {

		const expectedState = {
			...initialState,
			ingredients: [{ ...TEST_INGREDIENT, uuid: expect.any(String), index: 0 }],
			totalPrice: 1,
		};

		expect(reducer(initialState, addIngredient(TEST_INGREDIENT))).toEqual(expectedState);
	});

	it('should handle removeIngredient', () => {
		const stateWithIngredient = {
			...initialState,
			ingredients: [{ ...TEST_INGREDIENT, uuid: 'uuid-1', index: 0 }],
			totalPrice: 1,
		};

		const expectedState = {
			...initialState,
			ingredients: [],
			totalPrice: 0,
		};

		expect(reducer(stateWithIngredient, removeIngredient({ _id: '1' }))).toEqual(expectedState);
	});

	it('should handle clearIngredients', () => {
		const stateWithIngredients = {
			...initialState,
			ingredients: [
				{...TEST_INGREDIENT, _id: '1', name: 'Lettuce', uuid: 'uuid-1', index: 0 },
				{...TEST_INGREDIENT, _id: '2', name: 'Tomato', uuid: 'uuid-2', index: 1 },
			],
			totalPrice: 3,
			bun: {...TEST_INGREDIENT, _id: '3', name: 'Bun', type: 'bun',  uuid: 'uuid-3'}
		};


		// @ts-ignore
		expect(reducer(stateWithIngredients, clearIngredients())).toEqual(initialState);
	});

	it('should handle addIngredients', () => {
		const ingredients: TIngredient[] = [
			{...TEST_INGREDIENT, _id: '1', name: 'Lettuce', uuid: 'uuid-1', index: 0 },
			{...TEST_INGREDIENT, _id: '2', name: 'Tomato', uuid: 'uuid-2', index: 1, price: 3 },
		];

		const expectedState = {
			...initialState,
			ingredients: ingredients,
			totalPrice: 4,
		};

		expect(reducer(initialState, addIngredients(ingredients))).toEqual(expectedState);
	});

	it('should handle setBun', () => {
		const bun = { ...TEST_INGREDIENT, type: 'bun', price: 2};

		const expectedState = {
			...initialState,
			bun: bun,
			totalPrice: bun.price * 2,
		};

		expect(reducer(initialState, setBun(bun))).toEqual(expectedState);
	});

	it('should handle moveIngredient', () => {
		const ingredients: TIngredient[] = [
			{...TEST_INGREDIENT, _id: '1', name: 'Lettuce', uuid: 'uuid-1', index: 0 },
			{...TEST_INGREDIENT, _id: '2', name: 'Tomato', uuid: 'uuid-2', index: 1, price: 3 },
		];

		const stateWithIngredients: IBurgerConstructorState = {
			...initialState,
			ingredients: ingredients,
			totalPrice: 3,
		};

		const expectedState: IBurgerConstructorState = {
			...initialState,
			ingredients: [
				{...TEST_INGREDIENT, _id: '2', name: 'Tomato', uuid: 'uuid-2', index: 1, price: 3 },
				{...TEST_INGREDIENT, _id: '1', name: 'Lettuce', uuid: 'uuid-1', index: 0 },
			],
			totalPrice: 3,
		};

		expect(reducer(stateWithIngredients, moveIngredient({ dragIndex: 0, hoverIndex: 1 }))).toEqual(expectedState);
	});
});
