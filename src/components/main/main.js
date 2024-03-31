import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './main.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { fetchIngredients } from '../../services/slices/ingredients-slice';

function Main() {

	const dispatch = useDispatch();
	const isLoading = useSelector((state) => state.ingredients.isLoading);

	useEffect(() => {
		dispatch(fetchIngredients());
	}, [dispatch]);

	return (
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
	);
}

export default Main;
