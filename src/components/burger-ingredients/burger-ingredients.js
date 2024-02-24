// burger-ingredients.js
import React, {useState} from 'react'

import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";

import burgerIngredients from './burger-ingredients.module.css'
import ScrollableBlock from "../scrollable-block/scrollable-block";
import IngredientCard from "../ingredient-card/ingredient-card";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import PropTypes from "prop-types";

const Tabs = () => {
	const [current, setCurrent] = React.useState('one')
	return (
		<div style={{ display: 'flex' }} className={'pt-5'}>
			<Tab value='one' active={current === 'one'} onClick={setCurrent}>
				Булки
			</Tab>
			<Tab value='two' active={current === 'two'} onClick={setCurrent}>
				Соусы
			</Tab>
			<Tab value='three' active={current === 'three'} onClick={setCurrent}>
				Начинки
			</Tab>
		</div>
	)
}

const BurgerIngredients = ({ ingredients, style })  => {

	const buns = ingredients.filter((ingredient) => ingredient.type === 'bun');
	const mains = ingredients.filter((ingredient) => ingredient.type === 'main');
	const sauces = ingredients.filter((ingredient) => ingredient.type === 'sauce');

	const [isIngredientOpen, setIsIngredientOpen] = useState(false);
	const [currentIngredient, setCurrentIngredient] = useState(null);

	const openIngredient = (ingredient) => {
		setCurrentIngredient(ingredient);
		setIsIngredientOpen(true);
	};

	const closeIngredient = () => {
		setIsIngredientOpen(false);
		setCurrentIngredient(null);
	};

	return (
		<div className={burgerIngredients.container} style={{...style}}>
			<h2 className='text text_type_main-large pt-10'>
				Соберите бургер
			</h2>
			<div style={{display: 'flex', justifyContent:'center'}}>
				<Tabs />
			</div>
			<ScrollableBlock>
				<h3 className='text text_type_main-medium pt-10'>
					Булки
				</h3>

				<div className={`${burgerIngredients.ingredientsContainer} pt-6 pl-4 pb-6 pr-4`}>
					{buns.map((ingredient, key) => {
						return <IngredientCard key={key} count={0} price={ingredient.price} name={ingredient.name} url={ingredient.image} onClick={() => openIngredient(ingredient)}/>
					})}
				</div>

				<h3 className='text text_type_main-medium pt-10'>
					Соусы
				</h3>

				<div className={`${burgerIngredients.ingredientsContainer} pt-6 pl-4 pb-6 pr-4`}>
					{sauces.map((ingredient) => {
						return <IngredientCard count={0} price={ingredient.price} name={ingredient.name} url={ingredient.image} onClick={() => openIngredient(ingredient)}/>
					})}
				</div>

				<h3 className='text text_type_main-medium pt-10'>
					Начинки
				</h3>

				<div className={`${burgerIngredients.ingredientsContainer} pt-6 pl-4 pb-6 pr-4`}>
					{mains.map((ingredient) => {
						return <IngredientCard count={0} price={ingredient.price} name={ingredient.name} url={ingredient.image} onClick={() => openIngredient(ingredient)}/>
					})}
				</div>
			</ScrollableBlock>
			{isIngredientOpen && (
				<Modal title="Детали ингредиента" onClose={closeIngredient}>
					<IngredientDetails ingredient={currentIngredient} />
				</Modal>
			)}
		</div>
	);
}

BurgerIngredients.propTypes = {
	ingredients: PropTypes.arrayOf(PropTypes.shape({
		type: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		image: PropTypes.string.isRequired,
	})).isRequired,
	style: PropTypes.object,
};

export default BurgerIngredients