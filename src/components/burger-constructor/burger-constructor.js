import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ScrollableBlock from "../scrollable-block/scrollable-block";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import burgerConstructor from "./burger-constructor.module.css";
import ingredientType from "../../utils/types";
import { fetchOrder } from '../../services/slices/order-slice';

const BurgerConstructor = ({ style }) => {
	const dispatch = useDispatch();
	let { ingredients, totalPrice, bun } = useSelector((state) => state.burgerConstructor);
	const allIngredients = useSelector((state) => state.ingredients.ingredients);
	bun = allIngredients.find((item) => item.type === 'bun'); //todo


	const [isOrderDetailOpen, setIsOrderDetailOpen] = useState(false);

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
		<div className={`${burgerConstructor.container} pt-25 pr-4 pl-4`} style={{ ...style }}>
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
					{ingredients.map((ingredient) => {
						return (
							<div key={ingredient._id} className={burgerConstructor.elementContainer}>
								<DragIcon type='primary' />
								<ConstructorElement
									text={ingredient.name}
									price={ingredient.price}
									thumbnail={ingredient.image}
								/>
							</div>
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