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
	updateIngredient,
	removeIngredient,
	clearIngredients,
	addIngredients,
	setLoading,
} = ingredientsSlice.actions;
export default ingredientsSlice.reducer;