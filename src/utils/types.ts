type TIngredient = {
	_id: string;
	name: string;
	type: 'bun' | 'main' | 'sauce';
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	uuid: string;
	__v: number;
	count: number;
	index?: number;
};

type TOrder = {
	_id: string;
	ingredients: string[];
	owner: string;
	status: string;
	name: string;
	createdAt: string;
	updatedAt: string;
	number: number;
	__v: number;
};

export type { TIngredient, TOrder }