import React from 'react';
import ingredientDetails from './ingredients-details.module.css';
//import ingredientType from "../../utils/types";
import {useLocation, useParams} from "react-router-dom";
import { useSelector } from 'react-redux';

const IngredientDetails = () => {

	const location = useLocation();
	const idFromLocation = location.state?.ingredientId;
	const { id: idFromParams } = useParams();

	const id = idFromLocation || idFromParams;

	const isLoading = useSelector((state) => state.ingredients.isLoading);

	const ingredient = useSelector((state) =>
		state.ingredients.ingredients.find((ingredient) => ingredient._id === id)
	);

	if (isLoading) {
		return <div>Загрузка...</div>;
	}

	if (!ingredient) {
		return <div>Ингредиент не найден</div>;
	}

	return (
		<div className={`${ingredientDetails.content} pt-10 pb-15`}>
			<img alt={ingredient.name} src={ingredient.image_large}/>
			<h2 className='text text_type_main-medium pt-4'>{ingredient.name}</h2>
			<div className={`${ingredientDetails.nutritionalContainer} pt-8`}>
				<div className={`${ingredientDetails.nutritionalCell}`}>
					<h3 className='text text_type_main-small text_color_inactive'>Каллории, ккал</h3>
					<p className='text text_type_digits-default text_color_inactive'>{ingredient.calories}</p>
				</div>
				<div className={`${ingredientDetails.nutritionalCell}`}>
					<h3 className='text text_type_main-small text_color_inactive'>Белки, г</h3>
					<p className='text text_type_digits-default text_color_inactive'>{ingredient.proteins}</p>
				</div>
				<div className={`${ingredientDetails.nutritionalCell}`}>
					<h3 className='text text_type_main-small text_color_inactive'>Жиры, г</h3>
					<p className='text text_type_digits-default text_color_inactive'>{ingredient.fat}</p>
				</div>
				<div className={`${ingredientDetails.nutritionalCell}`}>
					<h3 className='text text_type_main-small text_color_inactive'>Улеводы, г</h3>
					<p className='text text_type_digits-default text_color_inactive'>{ingredient.carbohydrates}</p>
				</div>
			</div>
		</div>
	);
};

// IngredientDetails.propTypes = {
// 	ingredient: ingredientType.isRequired,
// };


export default IngredientDetails;