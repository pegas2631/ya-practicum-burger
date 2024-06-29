import React, { useState, CSSProperties } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ScrollableBlock from '../scrollable-block/scrollable-block';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import burgerConstructor from './burger-constructor.module.css';
import { fetchOrder } from '../../services/slices/order-slice';
import { addIngredient } from '../../services/slices/burger-constructor-slice';
import { increaseIngredientCount } from '../../services/slices/ingredients-slice';
import DraggableIngredient from '../draggable-ingredient/draggable-ingredient';
import useAuth from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import TIngredient from '../../utils/types';
import { AppDispatch } from '../../services/store';

interface IBurgerConstructorProps {
	style?: CSSProperties;
}

const BurgerConstructor: React.FC<IBurgerConstructorProps> = ({ style }) => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const { ingredients, totalPrice, bun } = useSelector((state: any) => state.burgerConstructor);
	const [isOrderDetailOpen, setIsOrderDetailOpen] = useState(false);

	const [, dropRef] = useDrop<TIngredient>({
		accept: 'ingredient',
		drop: (ingredient) => {
			dispatch(addIngredient(ingredient));
			dispatch(increaseIngredientCount(ingredient));
		},
	});

	const isAuth = useAuth();

	const handleFetchOrder = () => {
		if (!isAuth) {
			navigate('/login');
		}
		const ingredientsIds = ingredients.map((ingredient: TIngredient) => ingredient._id);
		if (bun) ingredientsIds.push(bun._id, bun._id);
		dispatch(fetchOrder(ingredientsIds));
	};

	const openOrderDetail = () => {
		setIsOrderDetailOpen(true);
	};

	const closeOrderDetail = () => {
		setIsOrderDetailOpen(false);
	};

	return (
		<div ref={dropRef} className={`${burgerConstructor.container} pt-25 pr-4 pl-4`} style={{ ...style }}>
			<div className={`${burgerConstructor.bunContainer} pr-4 pl-7`}>
				{bun ? (
					<ConstructorElement
						type="top"
						isLocked={true}
						text={`${bun.name} (верх)`}
						price={bun.price}
						thumbnail={bun.image}
					/>
				) : (
					<span>Переместите сюда булочку</span>
				)}
			</div>
			<ScrollableBlock>
				<div className={`${burgerConstructor.ingredientsContainer} pt-4 pb-4 pr-4 pl-2`}>
					{ingredients.map((ingredient: TIngredient, index: number) => (
						<DraggableIngredient key={ingredient.uuid} ingredient={ingredient} index={index} />
					))}
				</div>
			</ScrollableBlock>
			<div className={`${burgerConstructor.bunContainer} pr-4 pl-7`}>
				{bun ? (
					<ConstructorElement
						type="bottom"
						isLocked={true}
						text={`${bun.name} (низ)`}
						price={bun.price}
						thumbnail={bun.image}
					/>
				) : (
					<span>Переместите сюда булочку</span>
				)}
			</div>

			<section className={`${burgerConstructor.priceSection} pt-10 pb-10`}>
				<div className={burgerConstructor.priceContainer}>
					<span className="text text_type_digits-medium">{totalPrice}</span>
					<CurrencyIcon type="primary" />
				</div>
				<Button
					htmlType="button"
					type="primary"
					size="large"
					onClick={() => {
					handleFetchOrder();
					openOrderDetail();
				}}
				>
					Оформить заказ
				</Button>
			</section>
			{isOrderDetailOpen && (
				<Modal title="" onClose={closeOrderDetail}>
					<OrderDetails />
				</Modal>
			)}
		</div>
	);
};

export default BurgerConstructor;