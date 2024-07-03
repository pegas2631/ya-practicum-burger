import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';
import { TOrder } from '../utils/types';

const selectOrders = (state: RootState) => state.orders.orders;
const selectUserOrders = (state: RootState) => state.userOrders.orders;

export const selectOrderByNumber = (orderNumber: number) =>
	createSelector(
		[selectOrders, selectUserOrders],
		(orders: TOrder[], userOrders: TOrder[]) => {
			const allOrders = [...orders, ...userOrders];
			return allOrders.find(order => order.number === orderNumber);
		}
	);