import { PayloadAction } from '@reduxjs/toolkit';
import reducer, {
	setCurrentOrder,
	clearCurrentOrder,
	setCurrentOrderIsOpen,
	initialState,
} from './current-order-slice';
import { TOrder } from '../../utils/types';
import { TEST_ORDER } from '../../utils/test-data';

describe('currentOrderSlice', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {} as PayloadAction<any>)).toEqual(initialState);
	});

	it('should handle setCurrentOrder', () => {
		const expectedState = {
			...initialState,
			currentOrder: TEST_ORDER,
		};

		expect(reducer(initialState, setCurrentOrder(TEST_ORDER))).toEqual(expectedState);
	});

	it('should handle clearCurrentOrder', () => {
		const stateWithOrder = {
			...initialState,
			currentOrder: TEST_ORDER,
		};

		const expectedState = {
			...initialState,
			currentOrder: null,
		};

		expect(reducer(stateWithOrder, clearCurrentOrder())).toEqual(expectedState);
	});

	it('should handle setCurrentOrderIsOpen', () => {
		const expectedState = {
			...initialState,
			isOpen: true,
		};

		expect(reducer(initialState, setCurrentOrderIsOpen(true))).toEqual(expectedState);
	});
});