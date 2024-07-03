import React, { useEffect } from 'react';
import orderList from './order-list.module.css';
import ScrollableBlock from '../scrollable-block/scrollable-block';
import { TOrder } from '../../utils/types';
import OrderCard from '../order-card/order-card';
import {useDispatch, useSelector} from '../../services/hooks';
import {useLocation, useNavigate} from "react-router-dom";
import Modal from '../modal/modal';
import { setCurrentOrder, clearCurrentOrder, setCurrentOrderIsOpen } from '../../services/slices/current-order-slice';
import OrderInfo from '../order-info/order-info';
import { connect, disconnect } from '../../services/slices/orders-slice';
import {RootState} from "../../services/store";

const OrderList: React.FC = () => {
	const isLoading = useSelector((state: any) => state.ingredients.isLoading);
	const currentOrderIsOpen = useSelector((state: any) => state.currentOrder.isOpen);
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();

	const orders: TOrder[] = useSelector((state: RootState) => state.orders.orders);
	const total: number = useSelector((state: RootState) => state.orders.total);
	const totalToday: number = useSelector((state: RootState) => state.orders.totalToday);

	useEffect(() => {
		dispatch(connect('wss://norma.nomoreparties.space/orders/all'));

		return () => {
			dispatch(disconnect());
		};
	}, [dispatch]);

	const doneOrders = orders.filter(order => order.status === 'done');
	const inProgressOrders = orders.filter(order => order.status === 'in progress');
	const chunkArray = (array: TOrder[], chunkSize: number): TOrder[][] => {
		const chunks = [];
		for (let i = 0; i < array.length; i += chunkSize) {
			chunks.push(array.slice(i, i + chunkSize));
		}
		return chunks;
	};

	const doneOrderChunks = chunkArray(doneOrders, 10);
	const inProgressOrderChunks = chunkArray(inProgressOrders, 10);

	const openOrder = (order: TOrder) => {
		dispatch(setCurrentOrder(order));
		dispatch(setCurrentOrderIsOpen(true));
		navigate(`/feed/${order.number}`, {
			state: {
				background: location,
				orderNumber: order.number,
			},
		});
	};

	return (
		<div className={orderList.container}>
			{isLoading ? (
				<p>Загрузка...</p>
			) : (
				<div className={`${orderList.content} pt-10`}>
					<h2 className={`${orderList.header} text text_type_main-large`}>
						Лента заказов
					</h2>
					<div className={orderList.row}>
						<div className={orderList.orderList}>
							<ScrollableBlock>
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
						<div className={orderList.info}>
							<div className={orderList.ordersStatusesBlock}>
								<div className={orderList.doneContainer}>
									<p className={`text text_type_main-medium`}>
										Готовы:
									</p>
									<div className={orderList.doneListContainer}>
										{doneOrderChunks.map((chunk, chunkIndex) => (
											<div key={chunkIndex}>
												{chunk.map((order, index) => (
													<p key={index} className={`text text_type_digits-default mt-2 ${orderList.completedColor}`}>
														{order.number}
													</p>
												))}
											</div>
										))}
									</div>
								</div>
								<div className={orderList.inProgressContainer}>
									<p className={`text text_type_main-medium`}>
										В работе:
									</p>
									<div className={orderList.inProgressListContainer}>
										{inProgressOrderChunks.map((chunk, chunkIndex) => (
											<div key={chunkIndex}>
												{chunk.map((order, index) => (
													<p key={index} className={`text text_type_digits-default mt-2`}>
														{order.number}
													</p>
												))}
											</div>
										))}
									</div>
								</div>
							</div>
							<div className={orderList.ordersCountBlock}>
								<p className={`text text_type_main-medium`}>
									Выполнено за все время:
								</p>
								<p className={`text text_type_digits-large ${orderList.glowingText}`}>
									{total}
								</p>
							</div>
							<div className={orderList.ordersCountBlock}>
								<p className={`text text_type_main-medium`}>
									Выполнено за сегодня:
								</p>
								<p className={`text text_type_digits-large ${orderList.glowingText}`}>
									{totalToday}
								</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default OrderList;