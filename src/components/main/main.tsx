import React from 'react';
import { useSelector } from 'react-redux';
import styles from './main.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

const Main: React.FC = () => {
	const isLoading = useSelector((state: any) => state.ingredients.isLoading);

	return (
		<main className={styles.mainContent}>
			{isLoading ? (
				<p>Загрузка...</p>
			) : (
				<>
					<BurgerIngredients style={{ flex: 2 }} />
					<BurgerConstructor style={{ flex: 1 }} />
				</>
			)}
		</main>
	);
};

export default Main;