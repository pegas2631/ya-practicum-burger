import { configureStore } from '@reduxjs/toolkit';
import currentIngredientReducer from './slices/current-ingredient-slice';
import burgerConstructorIngredientsReducer from './slices/burger-constructor-slice';
import ingredientsReducer from './slices/ingredients-slice';
import orderReducer from './slices/order-slice'
import userReducer from './slices/user-slice'

export const store = configureStore({
	reducer: {
		ingredients: ingredientsReducer,
		burgerConstructor: burgerConstructorIngredientsReducer,
		currentIngredient: currentIngredientReducer,
		order: orderReducer,
		user: userReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;