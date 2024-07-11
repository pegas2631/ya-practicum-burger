import { PayloadAction } from '@reduxjs/toolkit';
import reducer, {
	setCurrentIngredient,
	clearCurrentIngredient,
	setCurrentIngredientIsOpen, currentIngredientSlice,
} from './current-ingredient-slice';
import { TIngredient } from '../../utils/types';

describe('currentIngredientSlice', () => {
	const initialState = {
		currentIngredient: null,
		isOpen: false,
	};

	it('should return the initial state', () => {
		expect(reducer(undefined, {} as PayloadAction<any>)).toEqual(initialState);
	});

	it('should handle setCurrentIngredient', () => {
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
			currentIngredient: ingredient,
		};

		expect(reducer(initialState, setCurrentIngredient(ingredient))).toEqual(expectedState);
	});

	it('should handle clearCurrentIngredient', () => {
		const currentIngredient: TIngredient = {
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
			currentIngredient,
		};

		const expectedState = {
			...initialState,
			currentIngredient: null,
		};

		expect(reducer(stateWithIngredient, clearCurrentIngredient())).toEqual(expectedState);
	});

	it('should handle setCurrentIngredientIsOpen', () => {
		const expectedState = {
			...initialState,
			isOpen: true,
		};

		expect(reducer(initialState, setCurrentIngredientIsOpen(true))).toEqual(expectedState);
	});
});