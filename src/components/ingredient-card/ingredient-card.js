// ingredient-card.js
import React from 'react'

import ingredientCard from './ingredient-card.module.css'
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import ingredientType from "../../utils/types";

const IngredientCard = ({ ingredient, onClick }) => {

	const [{ isDragging }, dragRef] = useDrag(() => ({
		type: 'ingredient',
		item: ingredient,
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	}));

	return (
		<div ref={dragRef} style={{ opacity: isDragging ? 0.5 : 1 }} className={ingredientCard.container} onClick={onClick}>
			{ ingredient.count > 0 && <Counter count={ingredient.count} size="default" extraClass="m-1" />}
			<img src={ingredient.image} alt={ingredient.name} className='pl-4 pr-4' />
			<section className={`${ingredientCard.currencySection} pt-1 pb-1`}>
				<p className='text text_type_digits-default'>
					{ingredient.price}
				</p>
				<CurrencyIcon type="primary" />
			</section>
			<p className={'text text_type_main-small text-center'}>{ingredient.name}</p>
		</div>
	);
}

IngredientCard.propTypes = {
	ingredient: ingredientType.isRequired,
	onClick: PropTypes.func.isRequired,
};


export default IngredientCard