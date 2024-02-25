// ingredient-card.js
import React from 'react'

import ingredientCard from './ingredient-card.module.css'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const IngredientCard = ({name, count = 0, url, price, onClick}) => {
	return (
		<div className={ingredientCard.container} onClick={onClick}>
			{(count > 0) && <Counter count={count} size="default" extraClass="m-1" />}
			<img src={url} alt='name' className='pl-4 pr-4' />
			<section className={`${ingredientCard.currencySection} pt-1 pb-1`}>
				<p className='text text_type_digits-default'>
					{price}
				</p>
				<CurrencyIcon type="primary" />
			</section>
			<p className={'text text_type_main-small text-center'}>{name}</p>
		</div>
	);
}

IngredientCard.propTypes = {
	name: PropTypes.string.isRequired,
	count: PropTypes.number,
	url: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default IngredientCard