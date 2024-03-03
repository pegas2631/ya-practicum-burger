// app.tsx
import React, { useEffect, useState } from 'react';

import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';
import BurgerConstructor from "../burger-constructor/burger-constructor";

interface Ingredient {
	id: string;
	type: string;
	name: string;
	_id: string;
	price: number;
	image: string;
}

function App() {

	const API_URL = 'https://norma.nomoreparties.space/api';
	const [ingredients, setIngredients] = useState<Ingredient[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		const fetchIngredients = async () => {
			setIsLoading(true);
			try {
				const response = await fetch(`${API_URL}/ingredients`);
				if (!response.ok) {
					throw new Error(`Ошибка ${response.status}`);
				}
				const data = await response.json();
				console.log(data);
				setIngredients(data.data);
			} catch (error) {
				console.error('Ошибка при получении данных:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchIngredients();
	}, []);

	return (
		<div className={styles.app}>
			<AppHeader />
			<main className={styles.mainContent}>
				{isLoading ? (
					<p>Загрузка...</p>
				) : (
					<>
						<BurgerIngredients ingredients={ingredients} style={{flex: 2}}/>
						<BurgerConstructor ingredients={ingredients} style={{flex: 1}}/>
					</>
				)}
			</main>
		</div>
	);
}

export default App;
