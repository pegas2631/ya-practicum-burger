// burger-constructor.js
import React, {useState} from 'react'
import PropTypes from 'prop-types';

import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ScrollableBlock from "../scrollable-block/scrollable-block";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import burgerConstructor from "./burger-constructor.module.css"
import ingredientType from "../../utils/types";
import { IngredientsContext } from '../../services/burger-constructor-context';

const BurgerConstructor = ({ingredients, style}) => {

	const [isOrderDetailOpen, setIsOrderDetailOpen] = useState(false);
	const [totalPrice, setTotalPrice] = useState(0);

	const openOrderDetail = () => {
		setIsOrderDetailOpen(true);
	};

	const closeOrderDetail = () => {
		setIsOrderDetailOpen(false);
	};
	const topIngredient = ingredients.find((ingredient) => ingredient.type === 'bun');
	const bottomIngredient = topIngredient;
	ingredients = ingredients.filter((ingredient) => ingredient.type !== 'bun');

	React.useEffect(
		() => {
			let total = 0;
			ingredients.forEach(item => (total += item.price));
			if (topIngredient && bottomIngredient)
			{
				total += topIngredient.price + bottomIngredient.price;
			}
			setTotalPrice(total);
		},
		[ingredients, topIngredient, bottomIngredient]
	);

	if (!topIngredient || !bottomIngredient || !ingredients || ingredients.length === 0) {
		return (<p>Что-то пошло не так... :((</p>);
	}


	return (
		<div className={`${burgerConstructor.container} pt-25 pr-4 pl-4`} style={{...style}}>
			<IngredientsContext.Provider value={{totalPrice, ingredients, topIngredient, bottomIngredient}}>
				<div className={`${burgerConstructor.bunContainer} pr-4 pl-7`}>
					<ConstructorElement
						type="top"
						isLocked={true}
						text={`${topIngredient.name}\n(верх)`}
						price={topIngredient.price}
						thumbnail={topIngredient.image}
					/>
				</div>
				<ScrollableBlock>
					<div className={`${burgerConstructor.ingredientsContainer} pt-4 pb-4 pr-4 pl-2`}>
						{ingredients.map((ingredient)=>{
							return (
								<div key={ingredient._id} className={burgerConstructor.elementContainer}>
									<DragIcon type='primary' />
									<ConstructorElement
										text={ingredient.name}
										price={ingredient.price}
										thumbnail={ingredient.image}
									/>
								</div>
							);
						})}
					</div>
				</ScrollableBlock>
				<div className={`${burgerConstructor.bunContainer} pr-4 pl-7`}>
					<ConstructorElement
						type="bottom"
						isLocked={true}
						text={`${bottomIngredient.name}\n(низ)`}
						price={bottomIngredient.price}
						thumbnail={bottomIngredient.image}
					/>
				</div>

				<section className={`${burgerConstructor.priceSection} pt-10 pb-10`}>
					<div className={burgerConstructor.priceContainer}>
						<span className='text text_type_digits-medium'>{totalPrice}</span>
						<CurrencyIcon type="primary" />
					</div>
					<Button htmlType="button" type="primary" size="large" onClick={() => openOrderDetail()}>
						Оформить заказ
					</Button>
				</section>
				{isOrderDetailOpen && (
					<Modal title='' onClose={closeOrderDetail}>
						<OrderDetails />
					</Modal>
				)}
			</IngredientsContext.Provider>
		</div>
	);
}

BurgerConstructor.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientType).isRequired,
	style: PropTypes.object,
};

export default BurgerConstructor