import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {PayloadAction} from '@reduxjs/toolkit';
import reducer, {
	addIngredient,
	removeIngredient,
	clearIngredients,
	addIngredients,
	setBun,
	moveIngredient,
} from './burger-constructor-slice';
import { TIngredient } from '../../utils/types';
import {Middleware} from "redux";
import {IBurgerConstructorState} from "./burger-constructor-slice";

const middlewares: any = [thunk];
const mockStore = configureMockStore(middlewares);

describe('burgerConstructorSlice', () => {
	afterEach(() => {
		fetchMock.restore();
	});

	const initialState = {
		ingredients: [],
		totalPrice: 0,
		bun: null,
	};

	it('should return the initial state', () => {
		expect(reducer(undefined, {} as  PayloadAction<TIngredient>)).toEqual(initialState);
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
			ingredients: [{ ...ingredient, uuid: expect.any(String), index: 0 }],
			totalPrice: 1,
		};

		expect(reducer(initialState, addIngredient(ingredient))).toEqual(expectedState);
	});

	it('should handle removeIngredient', () => {
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

		const stateWithIngredient = {
			...initialState,
			ingredients: [{ ...ingredient, uuid: 'uuid-1', index: 0 }],
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
				{ _id: '1', name: 'Lettuce', type: 'main', proteins: 1, fat: 1, carbohydrates: 1, calories: 1, price: 1, image: 'image_url', image_mobile: 'image_mobile_url', image_large: 'image_large_url', uuid: 'uuid-1', __v: 0, count: 1, index: 0 },
				{ _id: '2', name: 'Tomato', type: 'main', proteins: 1, fat: 1, carbohydrates: 1, calories: 1, price: 2, image: 'image_url', image_mobile: 'image_mobile_url', image_large: 'image_large_url', uuid: 'uuid-2', __v: 0, count: 1, index: 1 },
			],
			totalPrice: 3,
			bun: { _id: '3', name: 'Bun', type: 'bun', proteins: 1, fat: 1, carbohydrates: 1, calories: 1, price: 2, image: 'image_url', image_mobile: 'image_mobile_url', image_large: 'image_large_url', uuid: 'uuid-3', __v: 0, count: 1 },
		};


		// @ts-ignore
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
			totalPrice: 3,
		};

		expect(reducer(initialState, addIngredients(ingredients))).toEqual(expectedState);
	});

	it('should handle setBun', () => {
		const bun = { _id: '1', name: 'Bun', type: 'bun', proteins: 1, fat: 1, carbohydrates: 1, calories: 1, price: 2, image: 'image_url', image_mobile: 'image_mobile_url', image_large: 'image_large_url', uuid: 'uuid-1', __v: 0, count: 1 };

		const expectedState = {
			...initialState,
			bun: bun,
			totalPrice: 4,
		};

		expect(reducer(initialState, setBun(bun))).toEqual(expectedState);
	});

	it('should handle moveIngredient', () => {
		const ingredients: TIngredient[] = [
			{ _id: '1', name: 'Lettuce', type: 'main', proteins: 1, fat: 1, carbohydrates: 1, calories: 1, price: 1, image: 'image_url', image_mobile: 'image_mobile_url', image_large: 'image_large_url', uuid: 'uuid-1', __v: 0, count: 1, index: 0 },
			{ _id: '2', name: 'Tomato', type: 'main', proteins: 1, fat: 1, carbohydrates: 1, calories: 1, price: 2, image: 'image_url', image_mobile: 'image_mobile_url', image_large: 'image_large_url', uuid: 'uuid-2', __v: 0, count: 1, index: 1 },
		];

		const stateWithIngredients: IBurgerConstructorState = {
			...initialState,
			ingredients: ingredients,
			totalPrice: 3,
		};

		const expectedState: IBurgerConstructorState = {
			...initialState,
			ingredients: [
				{ _id: '2', name: 'Tomato', type: 'main', proteins: 1, fat: 1, carbohydrates: 1, calories: 1, price: 2, image: 'image_url', image_mobile: 'image_mobile_url', image_large: 'image_large_url', uuid: 'uuid-2', __v: 0, count: 1, index: 1 },
				{ _id: '1', name: 'Lettuce', type: 'main', proteins: 1, fat: 1, carbohydrates: 1, calories: 1, price: 1, image: 'image_url', image_mobile: 'image_mobile_url', image_large: 'image_large_url', uuid: 'uuid-1', __v: 0, count: 1, index: 0 },
			],
			totalPrice: 3,
		};

		expect(reducer(stateWithIngredients, moveIngredient({ dragIndex: 0, hoverIndex: 1 }))).toEqual(expectedState);
	});
});
