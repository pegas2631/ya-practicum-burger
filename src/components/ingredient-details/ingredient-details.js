// modal-overlay.js
import React from 'react';
import ingredientDetails from './ingredients-details.module.css';
import PropTypes from "prop-types";
import ingredientType from "../../utils/types";

const IngredientDetails = ({ ingredient }) => {
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

IngredientDetails.propTypes = {
	ingredient: PropTypes.shape(ingredientType).isRequired,
};


export default IngredientDetails;