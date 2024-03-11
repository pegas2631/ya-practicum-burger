import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../utils/request-helper';

const initialState = {
	order: {
		number: null,
	},
	isLoading: false,
};

export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		setOrder: (state, action) => {
			state.order = action.payload;
		},
		clearOrder: (state) => {
			state.order = null;
		},
	},
	extraReducers: (builder) => {
		builder
		.addCase(fetchOrder.pending, (state) => {
			state.isLoading = true;
		})
		.addCase(fetchOrder.fulfilled, (state, action) => {
			state.isLoading = false;
			state.order = action.payload;
		})
		.addCase(fetchOrder.rejected, (state) => {
			state.isLoading = false;
		});
	},
});

export const fetchOrder = createAsyncThunk(
	'order/fetchOrder',
	async (ingredientsIds, { dispatch }) => {
		try {
			const data = await request('orders', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					ingredients: ingredientsIds
				}),
			});
			return data.order;
		} catch (error) {
			throw error;
		}
	}
);

export const {
	setOrder,
	clearOrder,
} = orderSlice.actions;

export default orderSlice.reducer;