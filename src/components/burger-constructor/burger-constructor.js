import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ScrollableBlock from '../scrollable-block/scrollable-block';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import burgerConstructor from './burger-constructor.module.css';
import ingredientType from "../../utils/types";
import { fetchOrder } from '../../services/slices/order-slice';
import {addIngredient, removeIngredient, setBun} from '../../services/slices/burger-constructor-slice';
import {increaseIngredientCount, decreaseIngredientCount} from '../../services/slices/ingredients-slice';
import DraggableIngredient from "../draggable-ingredient/draggable-ingredient";


const BurgerConstructor = ({ style }) => {
	const dispatch = useDispatch();
	const { ingredients, totalPrice, bun } = useSelector((state) => state.burgerConstructor);
	const allIngredients = useSelector((state) => state.ingredients.ingredients);

	useEffect(() => {
		if (!bun) {
			const defaultBun = allIngredients.find((item) => item.type === 'bun');
			if (defaultBun) {
				dispatch(setBun(defaultBun));
			}
		}
	}, [bun, allIngredients, dispatch]);

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

	if (!bun) {
		return (<p>Что-то пошло не так... :((</p>);
	}

	return (
		<div ref={dropRef} className={`${burgerConstructor.container} pt-25 pr-4 pl-4`} style={{ ...style }}>
			<div className={`${burgerConstructor.bunContainer} pr-4 pl-7`}>
				<ConstructorElement
					type="top"
					isLocked={true}
					text={`${bun.name} (верх)`}
					price={bun.price}
					thumbnail={bun.image}
				/>
			</div>
			<ScrollableBlock>
				<div className={`${burgerConstructor.ingredientsContainer} pt-4 pb-4 pr-4 pl-2`}>
					{ingredients.map((ingredient, index) => {
						return (
							<DraggableIngredient
								key={`${ingredient._id}_${index}`}
								ingredient={ingredient}
								index={index}
							/>
						);
					})}
				</div>
			</ScrollableBlock>
			<div className={`${burgerConstructor.bunContainer} pr-4 pl-7`}>
				<ConstructorElement
					type="bottom"
					isLocked={true}
					text={`${bun.name} (низ)`}
					price={bun.price}
					thumbnail={bun.image}
				/>
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