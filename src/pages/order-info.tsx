import React from 'react';
import OrderInfo from '../components/order-info/order-info';
import styles from './global.module.css';

export function OrderInfoPage() {
	return (
		<div className={styles.main}>
			<div className={styles.centeredFullWindow}>
				<div>
					<OrderInfo />
				</div>
			</div>
		</div>
	);
}