// order-details.js
import React, { useEffect, useState, useContext } from 'react';
import orderDetails from './order-details.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsContext } from '../../services/burger-constructor-context';
import { BASE_URL } from '../../utils/consts';

const OrderDetails = () => {
	const { ingredients, topIngredient, bottomIngredient } = useContext(IngredientsContext);

	const [isLoading, setIsLoading] = useState(false);
	const [order, setOrder] = useState({});

	useEffect(() => {
		const fetchOrder = async () => {
			setIsLoading(true);
			const ingredientsIds = ingredients.map((ingredient) => ingredient._id);
			ingredientsIds.push(topIngredient._id);
			ingredientsIds.push(bottomIngredient._id);
			try {
				const response = await fetch(`${BASE_URL}/orders`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						ingredients: ingredientsIds
					}),
				});
				if (!response.ok) {
					throw new Error(`Ошибка ${response.status}`);
				}
				const data = await response.json();

				if (data.success) {
					setOrder(data.order);
				} else {
					throw new Error('Ошибка при получении данных с сервера');
				}
			} catch (error) {
				console.error('Ошибка при получении данных:', error);
			} finally {
				setIsLoading(false);
			}
		};
		if (ingredients && ingredients.length > 0)
		{
			fetchOrder();
		}
	}, [ingredients, topIngredient, bottomIngredient]);

	return (
		<div className= {`${orderDetails.content} pt-20 pb-20`}>
			{isLoading ? (
				<p>Обрабатываем ваш заказ...</p>
			) : (
				<>
					<p className={`${orderDetails.glowingText} text text_type_digits-large`}>
						{order.number}
					</p>
					<p className="text text_type_main-medium pt-8">
						идентификатор заказа
					</p>
					<div className={`${orderDetails.iconContainer} pt-15`}>
						<CheckMarkIcon type="primary" />
					</div>
					<p className="text text_type_main-default pt-15">
						Ваш заказ начали готовить
					</p>
					<p className="text text_type_main-default text_color_inactive pt-2">
						Дождитесь готовности на орбитальной станции
					</p>
				</>
			)}
		</div>
	);
};

export default OrderDetails;