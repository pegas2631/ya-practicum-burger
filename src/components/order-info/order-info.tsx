import React from 'react';
import orderInfo from './order-info.module.css';
import {TIngredient, TOrder} from '../../utils/types';
import ScrollableBlock from '../scrollable-block/scrollable-block';
import IngredientListItem from '../ingredient-list-item/ingredient-list-item';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import {useLocation, useParams} from 'react-router-dom';
import { selectOrderByNumber } from '../../services/selectors';
import {RootState} from "../../services/store";
import { formatDate } from '../../utils/date-format'

interface ILocationState {
	orderNumber?: string;
}

const OrderInfo: React.FC = () => {

	const location = useLocation();
	const state = location.state as ILocationState;
	const numberFromLocation = state?.orderNumber;
	const { number: numberFromParams } = useParams<{ number: string }>();
	const orderNumber = Number(numberFromLocation || numberFromParams);

	const order = useSelector((state: RootState) =>
		selectOrderByNumber(Number(orderNumber))(state)
	);
	const allIngredients = useSelector((state: RootState) => state.ingredients.ingredients);

	if (!order) {
		return <p>Заказ не найден</p>;
	}

	const ingredientCountMap: { [key: string]: TIngredient & { count: number } } = {};

	order.ingredients.forEach(id => {
		const ingredient = allIngredients.find((ingredient: TIngredient) => ingredient._id === id);
		if (ingredient) {
			if (ingredientCountMap[ingredient._id]) {
				ingredientCountMap[ingredient._id].count += 1;
			} else {
				ingredientCountMap[ingredient._id] = { ...ingredient, count: 1 };
			}
		}
	});

	const displayedIngredients = Object.values(ingredientCountMap);

	const totalPrice = displayedIngredients.reduce((sum, ingredient) => {
		return sum + ingredient.price * ingredient.count;
	}, 0);

	const colorClass = order.status ? orderInfo.successColor : orderInfo.errorColor;

	return (
		<div className={orderInfo.content}>
			<div className={orderInfo.header}>
				<p className='text text_type_digits-default'>#{orderNumber}</p>
			</div>
			<div className={`mt-5 ${orderInfo.info}`}>
				<p className={`text text_type_main-medium ${orderInfo.burgerName}`}>
					{order.name}
				</p>
				<p className={`text text_type_main-small ${orderInfo.burgerName} ${colorClass}`}>
					{order.status ? 'Выполнен' : 'Не выполнен'}
				</p>
			</div>

			<div className={`${orderInfo.ingredients} mt-15`}>
				<div className={`${orderInfo.ingredientsTitle}`}>
					<p className={'text text_type_main-medium'}>Состав:</p>
				</div>
				<div className={`${orderInfo.ingredientsScrollContainer}`}>
					<ScrollableBlock>
						<div className={`${orderInfo.ingredientsContainer} pt-4 pb-4 pr-4 pl-2`}>
							{displayedIngredients && displayedIngredients.map((ingredient: TIngredient, index: number) => (
								<IngredientListItem ingredient={ingredient} onClick={()=>console.log(ingredient.name)}/>
							))}
						</div>
					</ScrollableBlock>
				</div>
			</div>
			<div className={`${orderInfo.footer} mt-12`}>
				<div>
					<p className={'text text_type_main-default text_color_inactive'}>{formatDate(order.createdAt)}</p>
				</div>
				<div className={orderInfo.totalPrice}>
					<p className={'text text_type_digits-default mr-2'}>{totalPrice}</p>
					<CurrencyIcon type='primary'/>
				</div>
			</div>
		</div>
	);
}

export default OrderInfo;