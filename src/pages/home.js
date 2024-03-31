import React from 'react';
import Main from '../components/main/main';
import AppHeader from '../components/app-header/app-header';
import styles from './global.module.css';

export function HomePage() {
	return (
		<div className={styles.main}>
			<AppHeader />
			<Main />
		</div>
	);
}