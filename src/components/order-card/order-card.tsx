import React from 'react'

import orderCard from './order-card.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {TIngredient, TOrder} from '../../utils/types';
import IngredientStack from '../ingredient-stack/ingredient-stack';
import {useSelector} from '../../services/hooks';
import { formatDate } from '../../utils/date-format';
import {RootState} from "../../services/store";

interface IOrderCardProps {
	order: TOrder;
	onClick: () => void;
}

const OrderCard: React.FC<IOrderCardProps> = ({ order, onClick }) => {

	const orderIngredients = order.ingredients;
	const allIngredients = useSelector((state: RootState) => state.ingredients.ingredients);


	const totalPrice = orderIngredients.reduce((total, ingredientId) => {
		const ingredient = allIngredients.find((item: any) => item._id === ingredientId);
		return ingredient ? total + ingredient.price : total;
	}, 0);

	return (
		<div className={`${orderCard.container} p-6 ml-2 mr-2`} onClick={onClick}>
			<div className={orderCard.orderTitle}>
				<p className={'text text_type_digits-default'}>#{order.number}</p>
				<p className={'text text_type_main-default text_color_inactive'}>{formatDate(order.createdAt)}</p>
			</div>
			<p className={'text text_type_main-medium mt-6 mb-6'}>{order.name}</p>
			<div className={orderCard.footer}>
				<div className={orderCard.ingredientStackContainer}>
					{orderIngredients && <IngredientStack ingredients={orderIngredients} />}
				</div>
				<div className={orderCard.priceContainer}>
					<p className={'text text_type_digits-default mr-2'}>{totalPrice}</p>
					<CurrencyIcon type='primary' />
				</div>
			</div>
		</div>
	);
};

export default OrderCard