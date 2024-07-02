import React from 'react'

import ingredientListItem from './ingredient-list-item.module.css';

import {TIngredient} from '../../utils/types';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientPreview from "../ingredient-preview/ingredient-preview";

interface IIngredientProps {
	ingredient: TIngredient;
	onClick: () => void;
}

interface IPriceProps {
	count: number;
	price: number;
}

const IngredientPrice: React.FC<IPriceProps> = ({ count, price }) => {
	return(
		<>
			<p className={'text text_type_digits-default mr-2'}>
				{count} x {count * price}
			</p>
			<CurrencyIcon type='primary' />
		</>
	);
}

const IngredientListItem: React.FC<IIngredientProps> = ({ ingredient, onClick }) => {

	return (
		<div className={ingredientListItem.container} onClick={onClick}>
			<div className={ingredientListItem.previewContainer}>
				<IngredientPreview name={ingredient.name} image={ingredient.image_mobile}/>
			</div>
			<div className={ingredientListItem.nameContainer}>
				<p>
					{ingredient.name}
				</p>
			</div>
			<div className={ingredientListItem.priceContainer}>
				<IngredientPrice  count={ingredient.count} price={ingredient.price}/>
			</div>
		</div>
	);
};

export default IngredientListItem