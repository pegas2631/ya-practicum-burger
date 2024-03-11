import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	currentIngredient: null,
	isOpen: false,
};

export const currentIngredientSlice = createSlice({
	name: 'currentIngredient',
	initialState,
	reducers: {
		setCurrentIngredient: (state, action) => {
			state.currentIngredient = action.payload;
		},
		clearCurrentIngredient: (state) => {
			state.currentIngredient = null;
		},
		setCurrentIngredientIsOpen: (state, action) => {
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