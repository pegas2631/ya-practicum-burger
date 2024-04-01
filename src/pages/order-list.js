import React from 'react';
import styles from "./global.module.css";

export function OrderListPage() {
	return (
		<div className={styles.main}>
			<div className={styles.centeredFullWindow}>
				<h1 className="text text_type_main-large text-center">Лента заказов</h1>
			</div>
		</div>
	);
}