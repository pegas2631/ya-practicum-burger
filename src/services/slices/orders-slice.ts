import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';

interface IOrdersState {
	orders: TOrder[];
	isConnected: boolean;
	total: number;
	totalToday: number;
}

const initialState: IOrdersState = {
	orders: [],
	isConnected: false,
	total: 0,
	totalToday: 0,
};

interface ISetOrderPayload {
	orders: TOrder[];
	success: boolean;
	total: number;
	totalToday: number;
}

export const ordersSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {
		setOrders: (state, action: PayloadAction<ISetOrderPayload>) => {
			state.orders = action.payload.orders;
			state.total = action.payload.total;
			state.totalToday = action.payload.totalToday;
		},
		clearOrders: (state) => {
			state.orders = [];
		},
	},
});

export const {
	setOrders,
	clearOrders,
} = ordersSlice.actions;
export default ordersSlice.reducer;