import React from 'react';
import Main from '../components/main/main';
import styles from './global.module.css';

export function HomePage() {
	return (
		<div className={styles.main}>
			<Main />
		</div>
	);
}