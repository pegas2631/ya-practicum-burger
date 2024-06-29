import React, { CSSProperties, useRef, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredients from './burger-ingredients.module.css';
import ScrollableBlock from '../scrollable-block/scrollable-block';
import IngredientCard from '../ingredient-card/ingredient-card';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setCurrentIngredient, clearCurrentIngredient, setCurrentIngredientIsOpen } from '../../services/slices/current-ingredient-slice';
import TIngredient from '../../utils/types';

interface ITabsProps {
	current: string;
	setCurrent: (value: string) => void;
}

const Tabs: React.FC<ITabsProps> = ({ current, setCurrent }) => {
	return (
		<div className={`${burgerIngredients.tabs} pt-5`}>
			<Tab value='buns' active={current === 'buns'} onClick={() => setCurrent('buns')}>
				Булки
			</Tab>
			<Tab value='sauces' active={current === 'sauces'} onClick={() => setCurrent('sauces')}>
				Соусы
			</Tab>
			<Tab value='mains' active={current === 'mains'} onClick={() => setCurrent('mains')}>
				Начинки
			</Tab>
		</div>
	);
};

interface IBurgerIngredientsProps {
	style?: CSSProperties;
}

const BurgerIngredients: React.FC<IBurgerIngredientsProps> = ({ style }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();
	const ingredients = useSelector((state: any) => state.ingredients.ingredients);
	const currentIngredient = useSelector((state: any) => state.currentIngredient.currentIngredient);
	const currentIngredientIsOpen = useSelector((state: any) => state.currentIngredient.isOpen);

	const buns = ingredients.filter((ingredient: TIngredient) => ingredient.type === 'bun');
	const mains = ingredients.filter((ingredient: TIngredient) => ingredient.type === 'main');
	const sauces = ingredients.filter((ingredient: TIngredient) => ingredient.type === 'sauce');

	const openIngredient = (ingredient: TIngredient) => {
		dispatch(setCurrentIngredient(ingredient));
		navigate(`/ingredients/${ingredient._id}`, {
			state: {
				background: location,
				ingredientId: ingredient._id,
			},
		});
	};

	const closeIngredient = () => {
		dispatch(clearCurrentIngredient());
		dispatch(setCurrentIngredientIsOpen(false));
		window.history.pushState({ modal: true }, '', `/`);
	};

	const bunsRef = useRef<HTMLHeadingElement>(null);
	const saucesRef = useRef<HTMLHeadingElement>(null);
	const mainsRef = useRef<HTMLHeadingElement>(null);

	const [current, setCurrent] = useState('buns');
	const handleScroll = () => {
		const bunsPosition = bunsRef.current?.getBoundingClientRect().top || 0;
		const saucesPosition = saucesRef.current?.getBoundingClientRect().top || 0;
		const mainsPosition = mainsRef.current?.getBoundingClientRect().top || 0;
		const tabOffset = 100;

		if (mainsPosition < tabOffset) {
			setCurrent('mains');
		} else if (saucesPosition < tabOffset) {
			setCurrent('sauces');
		} else if (bunsPosition < tabOffset) {
			setCurrent('buns');
		}
	};

	return (
		<div className={burgerIngredients.container} style={{ ...style }}>
			<h2 className='text text_type_main-large pt-10'>
				Соберите бургер
			</h2>
			<div className={burgerIngredients.tabsContainer}>
				<Tabs current={current} setCurrent={setCurrent} />
			</div>
			<ScrollableBlock onScroll={handleScroll}>
				<h3 ref={bunsRef} className='text text_type_main-medium pt-10'>
					Булки
				</h3>

				<div className={`${burgerIngredients.ingredientsContainer} pt-6 pl-4 pb-6 pr-4`}>
					{buns.map((ingredient: TIngredient) => (
						<IngredientCard key={ingredient._id} ingredient={ingredient} onClick={() => openIngredient(ingredient)} />
					))}
				</div>

				<h3 ref={saucesRef} className='text text_type_main-medium pt-10'>
					Соусы
				</h3>

				<div className={`${burgerIngredients.ingredientsContainer} pt-6 pl-4 pb-6 pr-4`}>
					{sauces.map((ingredient: TIngredient) => (
						<IngredientCard key={ingredient._id} ingredient={ingredient} onClick={() => openIngredient(ingredient)} />
					))}
				</div>

				<h3 ref={mainsRef} className='text text_type_main-medium pt-10'>
					Начинки
				</h3>

				<div className={`${burgerIngredients.ingredientsContainer} pt-6 pl-4 pb-6 pr-4`}>
					{mains.map((ingredient: TIngredient) => (
						<IngredientCard key={ingredient._id} ingredient={ingredient} onClick={() => openIngredient(ingredient)} />
					))}
				</div>
			</ScrollableBlock>
			{currentIngredientIsOpen && (
				<Modal title="Детали ингредиента" onClose={closeIngredient}>
					<IngredientDetails ingredientId={currentIngredient._id} />
				</Modal>
			)}
		</div>
	);
};

export default BurgerIngredients;