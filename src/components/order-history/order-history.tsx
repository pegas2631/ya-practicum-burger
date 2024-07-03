import React, { useEffect } from 'react';
import orderHistory from './order-history.module.css';
import ScrollableBlock from '../scrollable-block/scrollable-block'
import IngredientListItem from "../ingredient-list-item/ingredient-list-item";

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import { connect, disconnect } from '../../services/slices/user-orders-slice';
import { TOrder } from '../../utils/types';
import OrderCard from '../order-card/order-card';
import {setCurrentOrder, setCurrentOrderIsOpen} from '../../services/slices/current-order-slice';
import {useLocation, useNavigate} from 'react-router-dom';


const OrderHistory: React.FC = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();

	const orders: TOrder[] = useSelector((state: RootState) => state.userOrders.orders);
	const isConnected: boolean = useSelector((state: RootState) => state.userOrders.isConnected);
	const error: string | null = useSelector((state: RootState) => state.userOrders.error);

	useEffect(() => {
		dispatch(connect('wss://norma.nomoreparties.space/orders'));

		return () => {
			dispatch(disconnect());
		};
	}, [dispatch]);

	const openOrder = (order: TOrder) => {
		dispatch(setCurrentOrder(order));
		dispatch(setCurrentOrderIsOpen(true));
		navigate(`/profile/orders/${order.number}`, {
			state: {
				background: location,
				orderNumber: order.number,
			},
		});
	};

	if (!isConnected) {
		return <p>Connecting...</p>;
	}

	return (
		<div className={orderHistory.content}>
			<ScrollableBlock height={750}>
				{orders && orders.map((order: TOrder, index: number) => (
					<OrderCard
						order={order}
						onClick={() => {
							openOrder(order);
						}}
						key={index}
					/>
				))}
			</ScrollableBlock>
		</div>
	);
}

export default OrderHistory;