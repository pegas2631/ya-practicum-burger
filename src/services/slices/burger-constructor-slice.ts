import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import {TIngredient} from '../../utils/types';

interface IBun {
    image: string;
	_id: string;
	name: string;
	type: string;
	price: number;
}

interface IBurgerConstructorState {
	ingredients: TIngredient[];
	totalPrice: number;
	bun: IBun | null;
}

const initialState: IBurgerConstructorState = {
	ingredients: [],
	totalPrice: 0,
	bun: null,
};
const calculateTotalPrice = (ingredients: TIngredient[], bun: IBun | null): number => {
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
		addIngredient: (state, action: PayloadAction<TIngredient>) => {
			if (action.payload.type === 'bun')
			{
				state.bun = action.payload;
			}
			else
			{
				const ingredient = { ...action.payload, index: state.ingredients.length, uuid: uuidv4() };
				state.ingredients.push(ingredient);
			}
			state.totalPrice = calculateTotalPrice(state.ingredients, state.bun);
		},
		addIngredients: (state, action: PayloadAction<TIngredient[]>) => {
			state.ingredients = state.ingredients.concat(action.payload);
			state.totalPrice = calculateTotalPrice(state.ingredients, state.bun);
		},
		removeIngredient: (state, action: PayloadAction<{ _id: string }>) => {
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
		setBun: (state, action: PayloadAction<IBun>) => {
			state.bun = action.payload;
			state.totalPrice = calculateTotalPrice(state.ingredients, state.bun);
		},
		moveIngredient: (state, action: PayloadAction<{ dragIndex: number; hoverIndex: number }>) => {
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