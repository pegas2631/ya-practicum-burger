import { PayloadAction } from '@reduxjs/toolkit';
import reducer, {
	setCurrentOrder,
	clearCurrentOrder,
	setCurrentOrderIsOpen,
} from './current-order-slice';
import { TOrder } from '../../utils/types';

describe('currentOrderSlice', () => {
	const initialState = {
		currentOrder: null,
		isOpen: false,
	};

	it('should return the initial state', () => {
		expect(reducer(undefined, {} as PayloadAction<any>)).toEqual(initialState);
	});

	it('should handle setCurrentOrder', () => {
		const order: TOrder = {
			_id: '1',
			ingredients: ['ingredient1', 'ingredient2'],
			owner: 'owner1',
			status: 'done',
			name: 'Order 1',
			createdAt: '2023-01-01T00:00:00.000Z',
			updatedAt: '2023-01-01T00:00:00.000Z',
			number: 1,
			__v: 0,
		};

		const expectedState = {
			...initialState,
			currentOrder: order,
		};

		expect(reducer(initialState, setCurrentOrder(order))).toEqual(expectedState);
	});

	it('should handle clearCurrentOrder', () => {
		const stateWithOrder = {
			...initialState,
			currentOrder: {
				_id: '1',
				ingredients: ['ingredient1', 'ingredient2'],
				owner: 'owner1',
				status: 'done',
				name: 'Order 1',
				createdAt: '2023-01-01T00:00:00.000Z',
				updatedAt: '2023-01-01T00:00:00.000Z',
				number: 1,
				__v: 0,
			},
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