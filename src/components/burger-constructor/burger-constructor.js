import React, { useState} from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ScrollableBlock from '../scrollable-block/scrollable-block';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import burgerConstructor from './burger-constructor.module.css';
import { fetchOrder } from '../../services/slices/order-slice';
import {addIngredient} from '../../services/slices/burger-constructor-slice';
import {increaseIngredientCount} from '../../services/slices/ingredients-slice';
import DraggableIngredient from "../draggable-ingredient/draggable-ingredient";

const BurgerConstructor = ({ style }) => {
	const dispatch = useDispatch();
	const { ingredients, totalPrice, bun } = useSelector((state) => state.burgerConstructor);

	const [isOrderDetailOpen, setIsOrderDetailOpen] = useState(false);

	const [, dropRef] = useDrop(() => ({
		accept: 'ingredient',
		drop: (ingredient) => {
			dispatch(addIngredient(ingredient));
			dispatch(increaseIngredientCount(ingredient));
		},
	}));


	const handleFetchOrder = () => {
		const ingredientsIds = ingredients.map((ingredient) => ingredient._id);
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
				{
					// todo сделать красивее как будет время
					bun ? <ConstructorElement
						type="top"
						isLocked={true}
						text={`${bun.name} (верх)`}
						price={bun.price}
						thumbnail={bun.image}
					/> : <span>Переместите сюда булочку</span>
				}
			</div>
			<ScrollableBlock>
				<div className={`${burgerConstructor.ingredientsContainer} pt-4 pb-4 pr-4 pl-2`}>
					{ingredients.map((ingredient, index) => {
						return (
							<DraggableIngredient
								key={ingredient.uuid}
								ingredient={ingredient}
								index={index}
							/>
						);
					})}
				</div>
			</ScrollableBlock>
			<div className={`${burgerConstructor.bunContainer} pr-4 pl-7`}>
				{
					bun ? <ConstructorElement
						type="bottom"
						isLocked={true}
						text={`${bun.name} (низ)`}
						price={bun.price}
						thumbnail={bun.image}
					/> : <span>Переместите сюда булочку</span>
				}
			</div>

			<section className={`${burgerConstructor.priceSection} pt-10 pb-10`}>
				<div className={burgerConstructor.priceContainer}>
					<span className='text text_type_digits-medium'>{totalPrice}</span>
					<CurrencyIcon type="primary" />
				</div>
				<Button htmlType="button" type="primary" size="large" onClick={() => {
					handleFetchOrder();
					openOrderDetail();
				}}>
					Оформить заказ
				</Button>
			</section>
			{isOrderDetailOpen && (
				<Modal title='' onClose={closeOrderDetail}>
					<OrderDetails />
				</Modal>
			)}
		</div>
	);
}

BurgerConstructor.propTypes = {
	style: PropTypes.object,
};

export default BurgerConstructor;