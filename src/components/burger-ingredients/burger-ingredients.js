// burger-ingredients.js
import React, {useState} from 'react'

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import burgerIngredients from './burger-ingredients.module.css'
import ScrollableBlock from '../scrollable-block/scrollable-block';
import IngredientCard from '../ingredient-card/ingredient-card';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import PropTypes from 'prop-types';
import ingredientType from '../../utils/types';
import { useDispatch, useSelector } from "react-redux";
import { setCurrentIngredient, clearCurrentIngredient, setCurrentIngredientIsOpen } from '../../services/slices/current-ingredient-slice';

const Tabs = () => {
	const [current, setCurrent] = React.useState('one')
	return (
		<div className={`${burgerIngredients.tabs} pt-5`}>
			<Tab value='buns' active={current === 'buns'} onClick={setCurrent}>
				Булки
			</Tab>
			<Tab value='sauces' active={current === 'sauces'} onClick={setCurrent}>
				Соусы
			</Tab>
			<Tab value='mains' active={current === 'mains'} onClick={setCurrent}>
				Начинки
			</Tab>
		</div>
	)
}

const BurgerIngredients = ({ style })  => {

	const dispatch = useDispatch();
	const ingredients = useSelector((state) => state.ingredients.ingredients);
	const currentIngredient = useSelector((state) => state.currentIngredient.currentIngredient)
	const currentIngredientIsOpen = useSelector((state) => state.currentIngredient.isOpen);

	const buns = ingredients.filter((ingredient) => ingredient.type === 'bun');
	const mains = ingredients.filter((ingredient) => ingredient.type === 'main');
	const sauces = ingredients.filter((ingredient) => ingredient.type === 'sauce');

	const openIngredient = (ingredient) => {
		dispatch(setCurrentIngredient(ingredient));
		dispatch(setCurrentIngredientIsOpen(true));
	};

	const closeIngredient = () => {
		dispatch(clearCurrentIngredient());
		dispatch(setCurrentIngredientIsOpen(false));
	};

	return (
		<div className={burgerIngredients.container} style={{...style}}>
			<h2 className='text text_type_main-large pt-10'>
				Соберите бургер
			</h2>
			<div className={burgerIngredients.tabsContainer}>
				<Tabs />
			</div>
			<ScrollableBlock>
				<h3 className='text text_type_main-medium pt-10'>
					Булки
				</h3>

				<div className={`${burgerIngredients.ingredientsContainer} pt-6 pl-4 pb-6 pr-4`}>
					{buns.map((ingredient) => {
						return (<IngredientCard key={ingredient._id} count={0} price={ingredient.price} name={ingredient.name} url={ingredient.image} onClick={() => openIngredient(ingredient)}/>)
					})}
				</div>

				<h3 className='text text_type_main-medium pt-10'>
					Соусы
				</h3>

				<div className={`${burgerIngredients.ingredientsContainer} pt-6 pl-4 pb-6 pr-4`}>
					{sauces.map((ingredient) => {
						return (<IngredientCard key={ingredient._id} count={0} price={ingredient.price} name={ingredient.name} url={ingredient.image} onClick={() => openIngredient(ingredient)}/>)
					})}
				</div>

				<h3 className='text text_type_main-medium pt-10'>
					Начинки
				</h3>

				<div className={`${burgerIngredients.ingredientsContainer} pt-6 pl-4 pb-6 pr-4`}>
					{mains.map((ingredient) => {
						return (<IngredientCard key={ingredient._id} count={0} price={ingredient.price} name={ingredient.name} url={ingredient.image} onClick={() => openIngredient(ingredient)}/>)
					})}
				</div>
			</ScrollableBlock>
			{currentIngredientIsOpen && (
				<Modal title="Детали ингредиента" onClose={closeIngredient}>
					<IngredientDetails ingredient={currentIngredient} />
				</Modal>
			)}
		</div>
	);
}

BurgerIngredients.propTypes = {
	//ingredients: PropTypes.arrayOf(ingredientType).isRequired,
	style: PropTypes.object,
};

export default BurgerIngredients