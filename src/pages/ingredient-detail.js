import React, { useEffect } from 'react';
import {useParams, useLocation, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients } from '../services/slices/ingredients-slice';
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import AppHeader from "../components/app-header/app-header";
import Modal from "../components/modal/modal";
import styles from "./global.module.css";


export function IngredientDetailPage() {
	const { id } = useParams();
	const location = useLocation();
	const dispatch = useDispatch();
	const isLoading = useSelector((state) => state.ingredients.isLoading);
	const ingredient = useSelector((state) =>
		state.ingredients.ingredients.find((ingredient) => ingredient._id === id)
	);
	const navigate = useNavigate();

	const handleClose = () => {
		navigate(-1);
	};

	useEffect(() => {
		dispatch(fetchIngredients());
	}, [dispatch]);

	if (isLoading) {
		return <div>Загрузка...</div>;
	}

	if (!ingredient) {
		return <div>Ингредиент не найден</div>;
	}

	if (location.state?.modal) {
		return (
			<Modal title="Детали ингредиента" onClose={handleClose}>
				<IngredientDetails ingredient={ingredient} />
			</Modal>
		);
	}

	return (
		<div className={styles.main}>
			<AppHeader />
			<div className={styles.centeredFullWindow}>
				<div>
					<h1 className="text text_type_main-large text-center">Детали ингредиента</h1>
					<IngredientDetails ingredient={ingredient} />
				</div>
			</div>
		</div>
	);
}