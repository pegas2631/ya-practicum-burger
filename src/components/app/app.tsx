// app.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { fetchIngredients } from '../../services/slices/ingredients-slice';
import { setBun } from "../../services/slices/burger-constructor-slice";


interface Ingredient {
	id: string;
	type: string;
	name: string;
	_id: string;
	price: number;
	image: string;
}

function App() {

	const dispatch = useDispatch();
	// @ts-ignore
	const isLoading = useSelector((state) => state.ingredients.isLoading);

	useEffect(() => {
		// @ts-ignore
		dispatch(fetchIngredients());
	}, [dispatch]);

	return (
		<div className={styles.app}>
			<AppHeader />
			<main className={styles.mainContent}>
				{isLoading ? (
					<p>Загрузка...</p>
				) : (
					<>
						<BurgerIngredients style={{flex: 2}}/>
						<BurgerConstructor style={{flex: 1}}/>
					</>
				)}
			</main>
		</div>
	);
}

export default App;
