import {configureStore, PayloadAction} from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';

import currentIngredientReducer from './slices/current-ingredient-slice';
import burgerConstructorIngredientsReducer from './slices/burger-constructor-slice';
import ingredientsReducer from './slices/ingredients-slice';
import orderReducer from './slices/order-slice';
import userReducer from './slices/user-slice';
import currentOrderReducer from './slices/current-order-slice';
import ordersReducer from './slices/orders-slice';
import userOrdersReducer from './slices/user-orders-slice';
import webSocketReducer from './slices/ws-slice';
import { socketMiddleware } from './middleware/socket-middleware';

export const store = configureStore({
	reducer: {
		ingredients: ingredientsReducer,
		burgerConstructor: burgerConstructorIngredientsReducer,
		currentIngredient: currentIngredientReducer,
		order: orderReducer,
		orders: ordersReducer,
		user: userReducer,
		currentOrder: currentOrderReducer,
		userOrders: userOrdersReducer,
		webSocket: webSocketReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware()),
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;