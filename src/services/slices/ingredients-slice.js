import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../utils/request-helper';

const initialState = {
	ingredients: [],
	isLoading: false,
};

export const fetchIngredients = createAsyncThunk(
	'ingredients/fetchIngredients',
	async () => {
		const response = await request('ingredients', {});
		return response.data;
	}
);

export const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState,
	reducers: {
		addIngredient: (state, action) => {
			state.ingredients.push(action.payload);
		},
		addIngredients: (state, action) => {
			state.ingredients = state.ingredients.concat(action.payload);
		},
		clearIngredients: (state) => {
			state.ingredients = [];
		},
		increaseIngredientCount: (state, action) => {
			const index = state.ingredients.findIndex(ingredient => ingredient._id === action.payload._id);

			if (index !== -1) {
				if (action.payload.type === 'bun') {
					state.ingredients.forEach((ingredient, idx) => {
						if (ingredient.type === 'bun') {
							state.ingredients[idx].count = 0;
						}
					});
					state.ingredients[index].count = 1;
				} else {
					if (!state.ingredients[index].count) {
						state.ingredients[index].count = 1;
					} else {
						state.ingredients[index].count += 1;
					}
				}
			}
		},
		decreaseIngredientCount: (state, action) => {
			const index = state.ingredients.findIndex(ingredient => ingredient._id === action.payload._id);
			if (index !== -1 && state.ingredients[index].count && state.ingredients[index].count > 0) {
				state.ingredients[index].count -= 1;
			}
		}
	},
	extraReducers: (builder) => {
		builder
		.addCase(fetchIngredients.pending, (state) => {
			state.isLoading = true;
		})
		.addCase(fetchIngredients.fulfilled, (state, action) => {
			state.isLoading = false;
			state.ingredients = action.payload;
		})
		.addCase(fetchIngredients.rejected, (state, action) => {
			state.isLoading = false;
			console.error(action.error.message);
		});
	},
});

export const {
	addIngredient,
	clearIngredients,
	addIngredients,
	increaseIngredientCount,
	decreaseIngredientCount,
} = ingredientsSlice.actions;
export default ingredientsSlice.reducer;