import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

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
			if (action.payload.type === 'bun')
			{
				state.bun = action.payload;
			}
			else
			{
				const ingredient = {...action.payload, index: state.ingredients.length, uuid: uuidv4() }
				state.ingredients.push(ingredient);
			}
			state.totalPrice = calculateTotalPrice(state.ingredients, state.bun);
		},
		addIngredients: (state, action) => {
			state.ingredients = state.ingredients.concat(action.payload);
			state.totalPrice = calculateTotalPrice(state.ingredients, state.bun);
		},
		removeIngredient: (state, action) => {
			const index = state.ingredients.findIndex(ingredient => ingredient._id === action.payload._id);
			if (index !== -1) {
				state.ingredients.splice(index, 1);
				state.totalPrice = calculateTotalPrice(state.ingredients, state.bun);
			}
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
		moveIngredient: (state, action) => {
			const { dragIndex, hoverIndex } = action.payload;
			const newIngredients = [...state.ingredients];
			const [removed] = newIngredients.splice(dragIndex, 1);
			newIngredients.splice(hoverIndex, 0, removed);

			state.ingredients = newIngredients;
		},
	},
});

export const {
	addIngredient,
	removeIngredient,
	clearIngredients,
	addIngredients,
	setBun,
	moveIngredient,
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;