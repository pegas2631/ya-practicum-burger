import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';

interface IUserOrdersState {
	orders: TOrder[];
	isConnected: boolean;
	error: string | null;
}

const initialState: IUserOrdersState = {
	orders: [],
	isConnected: false,
	error: null,
};

export const userOrdersSlice = createSlice({
	name: 'userOrders',
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
		setError: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		},
		clearOrders: (state) => {
			state.orders = [];
		},
	},
});

export const { connect, disconnect, setOrders, setError, clearOrders } = userOrdersSlice.actions;
export default userOrdersSlice.reducer;