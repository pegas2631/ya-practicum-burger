import React from 'react';
import { useSelector } from '../../services/hooks';
import { TIngredient } from '../../utils/types';
import IngredientPreview from '../ingredient-preview/ingredient-preview';
import ingredientStack from './ingredient-stack.module.css';
import {RootState} from "../../services/store";

interface IIngredientStackProps {
	ingredients: string[];
}

const IngredientStack: React.FC<IIngredientStackProps> = ({ ingredients }) => {
	const allIngredients = useSelector((state: RootState) => state.ingredients.ingredients);
	const displayedIngredients = ingredients.slice(0, 6).map(id => allIngredients.find((ingredient: TIngredient) => ingredient._id === id));
	const remainingCount = ingredients.length - 6;

	return (
		<div className={ingredientStack.stackContainer}>
			{allIngredients.length > 0 && displayedIngredients.map((ingredient, index) => (
				ingredient && (
					<div
						key={`${ingredient._id}-${index}`}
						className={ingredientStack.ingredient}
						style={{ zIndex: 6 - index, left: `${index * 51}px` }}
					>
						<IngredientPreview name={ingredient.name} image={ingredient.image_mobile} />
						{index === 5 && remainingCount > 0 && (
							<div className={ingredientStack.remainingCount}>
								<p className={'text text_type_main-default'}>+{remainingCount}</p>
							</div>
						)}
					</div>
				)
			))}
		</div>
	);
};

export default IngredientStack;