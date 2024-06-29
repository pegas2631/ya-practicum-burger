import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import request from '../../utils/request-helper';

interface IOrder {
	number: number | null;
}

interface IOrderState {
	order: IOrder | null;
	isLoading: boolean;
}

const initialState: IOrderState = {
	order: {
		number: null,
	},
	isLoading: false,
};

export const fetchOrder = createAsyncThunk<IOrder, string[]>(
	'order/fetchOrder',
	async (ingredientsIds, { dispatch }) => {
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
	}
);

export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		setOrder: (state, action: PayloadAction<IOrder>) => {
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
			.addCase(fetchOrder.fulfilled, (state, action: PayloadAction<IOrder>) => {
				state.isLoading = false;
				state.order = action.payload;
			})
			.addCase(fetchOrder.rejected, (state, action) => {
				state.isLoading = false;
				console.error(action.error.message);
			});
	},
});

export const {
	setOrder,
	clearOrder,
} = orderSlice.actions;

export default orderSlice.reducer;