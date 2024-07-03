import { configureStore } from '@reduxjs/toolkit';
import currentIngredientReducer from './slices/current-ingredient-slice';
import burgerConstructorIngredientsReducer from './slices/burger-constructor-slice';
import ingredientsReducer from './slices/ingredients-slice';
import orderReducer from './slices/order-slice';
import userReducer from './slices/user-slice';
import currentOrderReducer from './slices/current-order-slice';
import ordersReducer from './slices/orders-slice';
import userOrdersReducer from './slices/user-orders-slice';
import allOrdersSocketMiddleware from './middleware/all-orders-socket-middleware';
import userOrdersSocketMiddleware from './middleware/user-orders-socket-middleware';

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
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(allOrdersSocketMiddleware, userOrdersSocketMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;