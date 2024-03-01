// modal-overlay.js
import React from 'react';
import orderDetails from './order-details.module.css';
import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const OrderDetails = ({ order }) => {
	return (
		<div className= {`${orderDetails.content} pt-20 pb-20`}>
			<p className={`${orderDetails.glowingText} text text_type_digits-large`}>
				{order.identifier}
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
		</div>
	);
};

OrderDetails.propTypes = {
	order: PropTypes.shape({
		identifier: PropTypes.string.isRequired,
	}).isRequired,
};

export default OrderDetails;