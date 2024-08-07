import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from '../../services/hooks';
import { moveIngredient, removeIngredient } from '../../services/slices/burger-constructor-slice';
import burgerConstructor from '../burger-constructor/burger-constructor.module.css';
import { decreaseIngredientCount } from '../../services/slices/ingredients-slice';
import { TIngredient } from '../../utils/types';

interface IDraggableIngredientProps {
	ingredient: TIngredient;
	index: number;
}

const DraggableIngredient: React.FC<IDraggableIngredientProps> = ({ ingredient, index }) => {
	const dispatch = useDispatch();
	const ref = useRef<HTMLDivElement>(null);

	const [, drop] = useDrop({
		accept: 'item',
		drop(item: { index: number }) {
			const dragIndex = item.index;
			const hoverIndex = index;

			if (dragIndex === hoverIndex) {
				return;
			}

			dispatch(moveIngredient({ dragIndex, hoverIndex }));
		},
	});

	const [{ isDragging }, drag] = useDrag({
		type: 'item',
		item: () => ({ ingredient: ingredient._id, index }),
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	drag(drop(ref));

	return (
		<div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }} className={burgerConstructor.elementContainer}>
			<DragIcon type="primary" />
			<ConstructorElement
				text={ingredient.name}
				price={ingredient.price}
				thumbnail={ingredient.image}
				handleClose={() => {
					dispatch(removeIngredient(ingredient));
					dispatch(decreaseIngredientCount(ingredient));
				}}
			/>
		</div>
	);
};

export default DraggableIngredient;