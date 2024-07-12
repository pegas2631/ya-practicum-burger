import {TIngredient, TOrder} from "./types";
import { IUser } from '../services/slices/user-slice';

export const TEST_INGREDIENT: TIngredient = {
	_id: '1',
	name: 'Lettuce',
	type: 'main',
	proteins: 1,
	fat: 1,
	carbohydrates: 1,
	calories: 1,
	price: 1,
	image: 'image_url',
	image_mobile: 'image_mobile_url',
	image_large: 'image_large_url',
	uuid: 'uuid-1',
	__v: 0,
	count: 1,
};

export const TEST_ORDER: TOrder = {
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

export const TEST_USER: IUser = {
	id: '1',
	name: 'John Doe',
	email: 'john.doe@example.com',
	password: 'password123',
};