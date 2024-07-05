import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {TIngredient} from '../../utils/types';

interface ICurrentIngredientState {
	currentIngredient: TIngredient | null;
	isOpen: boolean;
}

const initialState: ICurrentIngredientState = {
	currentIngredient: null,
	isOpen: false,
};

export const currentIngredientSlice = createSlice({
	name: 'currentIngredient',
	initialState,
	reducers: {
		setCurrentIngredient: (state, action: PayloadAction<TIngredient | null>) => {
			state.currentIngredient = action.payload;
		},
		clearCurrentIngredient: (state) => {
			state.currentIngredient = null;
		},
		setCurrentIngredientIsOpen: (state, action: PayloadAction<boolean>) => {
			state.isOpen = action.payload;
		},
	},
});

export const {
	setCurrentIngredient,
	clearCurrentIngredient,
	setCurrentIngredientIsOpen,
} = currentIngredientSlice.actions;

export default currentIngredientSlice.reducer;