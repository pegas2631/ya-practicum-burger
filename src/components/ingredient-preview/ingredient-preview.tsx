import React from 'react'
import ingredientPreview from './ingredient-preview.module.css';

interface IIngredientPreviewProps {
	name?: string;
	image: string;
}

const IngredientPreview: React.FC<IIngredientPreviewProps> = ({ name, image }) => {
	return (
		<div className={ingredientPreview.container}>
			<img className={ingredientPreview.ingredientImage} alt={name || 'ingredient-image'} src={image} />
		</div>
	);
}

export default IngredientPreview