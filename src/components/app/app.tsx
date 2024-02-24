// app.tsx
import React, { useEffect, useState } from 'react';

import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';
import BurgerConstructor from "../burger-constructor/burger-constructor";


function App() {

	const API_URL = 'https://norma.nomoreparties.space/api';
	const [ingredients, setIngredients] = useState([]);

	useEffect(() => {
		const fetchIngredients = async () => {
			try {
				const response = await fetch(`${API_URL}/ingredients`);
				if (!response.ok) {
					throw new Error(`Ошибка ${response.status}`);
				}
				const data = await response.json();
				setIngredients(data.data);
			} catch (error) {
				console.error('Ошибка при получении данных:', error);
			}
		};

		fetchIngredients();
	}, []);

	return (
		<div className={styles.app}>
			<AppHeader />
			<div className={styles.mainContent}>
				<BurgerIngredients ingredients={ingredients} style={{flex: 2}}/>
				<BurgerConstructor ingredients={ingredients} style={{flex: 1}}/>
			</div>
		</div>
	);
}

export default App;
