import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../utils/request-helper';

const initialState = {
	ingredients: [],
	isLoading: false,
};

export const fetchIngredients = createAsyncThunk(
	'ingredients/fetchIngredients',
	async (_, { rejectWithValue }) => {
		try {
			const response = await request('ingredients', {});
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
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
			if (action.payload.type !== 'bun')
			{
				const index = state.ingredients.findIndex(ingredient => ingredient._id === action.payload._id);

				if (index !== -1) {
					if (!state.ingredients[index].count) {
						state.ingredients[index].count = 1;
					} else {
						state.ingredients[index].count += 1;
					}
				}
			}
		},
		decreaseIngredientCount: (state, action) => {
			if (action.payload.type !== 'bun')
			{
				const index = state.ingredients.findIndex(ingredient => ingredient._id === action.payload._id);
				if (index !== -1 && state.ingredients[index].count && state.ingredients[index].count > 0) {
					state.ingredients[index].count -= 1;
				}
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
		.addCase(fetchIngredients.rejected, (state) => {
			state.isLoading = false;
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