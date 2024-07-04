import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';

interface IUserOrdersState {
	orders: TOrder[];
}

interface ISetOrderPayload {
	orders: TOrder[];
	success: boolean;
	total: number;
	totalToday: number;
}

const initialState: IUserOrdersState = {
	orders: [],
};

export const userOrdersSlice = createSlice({
	name: 'userOrders',
	initialState,
	reducers: {
		setOrders: (state, action: PayloadAction<ISetOrderPayload>) => {
			state.orders = action.payload.orders;
		},
		clearOrders: (state) => {
			state.orders = [];
		},
	},
});

export const { setOrders, clearOrders } = userOrdersSlice.actions;
export default userOrdersSlice.reducer;