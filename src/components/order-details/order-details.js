// order-details.js
import React from 'react';
import orderDetails from './order-details.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from "react-redux";

const OrderDetails = () => {
	const isOrderLoading = useSelector((state) => state.order.isLoading);
	const order  = useSelector((state) => state.order.order);

	return (
		<div className= {`${orderDetails.content} pt-20 pb-20`}>
			{isOrderLoading ? (
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