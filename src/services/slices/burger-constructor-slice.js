
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	ingredients: [],
	totalPrice: 0,
	bun: null,
};

const calculateTotalPrice = (ingredients, bun) => {
	let total = 0;
	ingredients.forEach(ingredient => {
		total += ingredient.price;
	});
	if (bun) {
		total += bun.price * 2;
	}
	return total;
};

export const burgerConstructorSlice = createSlice({
	name: 'burgerConstructor',
	initialState,
	reducers: {
		addIngredient: (state, action) => {
			state.ingredients.push(action.payload);
			state.totalPrice = calculateTotalPrice(state.ingredients, state.bun);
		},
		addIngredients: (state, action) => {
			state.ingredients = state.ingredients.concat(action.payload);
			state.totalPrice = calculateTotalPrice(state.ingredients, state.bun);
		},
		updateIngredient: (state, action) => {
			const index = state.ingredients.findIndex(ingredient => ingredient._id === action.payload._id);
			if (index !== -1) {
				state.ingredients[index] = action.payload;
				state.totalPrice = calculateTotalPrice(state.ingredients, state.bun);
			}
		},
		removeIngredient: (state, action) => {
			state.ingredients = state.ingredients.filter(ingredient => ingredient._id !== action.payload);
			state.totalPrice = calculateTotalPrice(state.ingredients, state.bun);
		},
		clearIngredients: (state) => {
			state.ingredients = [];
			state.bun = null;
			state.totalPrice = 0;
		},
		setBun: (state, action) => {
			state.bun = action.payload;
			state.totalPrice = calculateTotalPrice(state.ingredients, state.bun);
		},
		setTotalPrice: (state, action) => {
			state.totalPrice = action.payload;
		},
	},
});

export const {
	addIngredient,
	updateIngredient,
	removeIngredient,
	clearIngredients,
	addIngredients,
	setTotalPrice,
	setBun,
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;