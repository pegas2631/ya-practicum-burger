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

export const ordersSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {
		connect: (state, action: PayloadAction<string>) => {
			state.isConnected = true;
		},
		disconnect: (state) => {
			state.isConnected = false;
		},
		setOrders: (state, action: PayloadAction<TOrder[]>) => {
			state.orders = action.payload;
		},
		clearOrders: (state) => {
			state.orders = [];
		},
		setTotal: (state, action: PayloadAction<number>) => {
			state.total = action.payload;
		},
		setTotalToday: (state, action: PayloadAction<number>) => {
			state.totalToday = action.payload;
		},
	},
});

export const { connect, disconnect, setOrders, clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;