import React from 'react';
import styles from './global.module.css';
import OrderList from '../components/order-list/order-list';

export function OrderFeedPage() {
	return (
		<div className={styles.main}>
			<OrderList />
		</div>
	);
}