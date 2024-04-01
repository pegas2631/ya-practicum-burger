import React from 'react';
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import styles from "./global.module.css";


export function IngredientDetailPage() {
	return (
		<div className={styles.main}>
			<div className={styles.centeredFullWindow}>
				<div>
					<h1 className="text text_type_main-large text-center">Детали ингредиента</h1>
					<IngredientDetails />
				</div>
			</div>
		</div>
	);
}