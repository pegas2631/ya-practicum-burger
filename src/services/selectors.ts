import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';
import { TOrder } from '../utils/types';

const selectOrders = (state: RootState) => state.orders.orders;

export const selectOrderByNumber = (orderNumber: number) =>
	createSelector([selectOrders], (orders: TOrder[]) =>
		orders.find(order => order.number === orderNumber)
	);