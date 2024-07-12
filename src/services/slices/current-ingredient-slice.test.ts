import { PayloadAction } from '@reduxjs/toolkit';
import reducer, {
	setCurrentIngredient,
	clearCurrentIngredient,
	setCurrentIngredientIsOpen,
	initialState,
} from './current-ingredient-slice';
import { TEST_INGREDIENT } from '../../utils/test-data';

describe('currentIngredientSlice', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {} as PayloadAction<any>)).toEqual(initialState);
	});

	it('should handle setCurrentIngredient', () => {
		const expectedState = {
			...initialState,
			currentIngredient: TEST_INGREDIENT,
		};

		expect(reducer(initialState, setCurrentIngredient(TEST_INGREDIENT))).toEqual(expectedState);
	});

	it('should handle clearCurrentIngredient', () => {
		const stateWithIngredient = {
			...initialState,
			currentIngredient: TEST_INGREDIENT,
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