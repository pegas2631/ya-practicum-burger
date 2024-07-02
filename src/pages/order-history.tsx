import React from 'react';
import styles from './global.module.css';
import orderHistory from './order-history.module.css';
import profile from "./profile.module.css";
import {Link, useNavigate} from "react-router-dom";
import {logoutUser} from "../services/slices/user-slice";

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../services/store';
import OrderHistory from "../components/order-history/order-history";

export function OrderHistoryPage() {

	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logoutUser());
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		navigate('/login');
	};

	return (
		<div className={styles.main}>
			<div className={`${profile.mainContent} pt-30`}>
				<div className={`${profile.menu} ${styles.oneThird}`}>
					<Link to={'/profile'}>
						<div className={profile.menuItem}>
							<p className='text text_type_main-large text_color_inactive'>Профиль</p>
						</div>
					</Link>

					<div className={profile.menuItem}>
						<p className='text text_type_main-large'>История заказов</p>
					</div>

					<div className={profile.menuItem} onClick={handleLogout}>
						<p className='text text_type_main-large text_color_inactive'>Выход</p>
					</div>

					<div className='pt-20'>
						<p className='text text_type_main-default text_color_inactive'>
							В этом разделе вы можете просмотреть свою историю заказов
						</p>
					</div>
				</div>
				<div className={`${profile.menu} ${styles.oneThird}`}>
					<OrderHistory />
				</div>
			</div>
		</div>
	);
}