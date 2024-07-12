import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';

interface ICurrentOrderState {
	currentOrder: TOrder | null;
	isOpen: boolean;
}

export const initialState: ICurrentOrderState = {
	currentOrder: null,
	isOpen: false,
};

export const currentOrderSlice = createSlice({
	name: 'currentOrder',
	initialState,
	reducers: {
		setCurrentOrder: (state, action: PayloadAction<TOrder | null>) => {
			state.currentOrder = action.payload;
		},
		clearCurrentOrder: (state) => {
			state.currentOrder = null;
		},
		setCurrentOrderIsOpen: (state, action: PayloadAction<boolean>) => {
			state.isOpen = action.payload;
		},
	},
});

export const {
	setCurrentOrder,
	clearCurrentOrder,
	setCurrentOrderIsOpen,
} = currentOrderSlice.actions;

export default currentOrderSlice.reducer;