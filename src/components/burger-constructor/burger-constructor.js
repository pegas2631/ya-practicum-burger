// burger-constructor.js
import React, {useState} from 'react'
import PropTypes from 'prop-types';

import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ScrollableBlock from "../scrollable-block/scrollable-block";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

const BurgerConstructor = ({ingredients, style }) => {
	const img = 'https://code.s3.yandex.net/react/code/mineral_rings.png';
	const order = {
		identifier: '034536',
	};

	const [isOrderDetailOpen, setIsOrderDetailOpen] = useState(false);

	const openOrderDetail = (order) => {
		setIsOrderDetailOpen(true);
	};

	const closeIngredient = () => {
		setIsOrderDetailOpen(false);
	};

	return (
		<div style={{...style, display:'flex', flexDirection:'column', alignContent: 'center'}} className={'pt-25 pr-4 pl-4'}>

				<ConstructorElement
					type="top"
					isLocked={true}
					text="Краторная булка N-200i (верх)"
					price={200}
					thumbnail={img}
				/>
				<ScrollableBlock>
					<div className='pt-4 pb-4' style={{display: 'flex', flexDirection:'column', gap: '16px'}}>
						{ingredients.map((ingredient)=>{
							return <ConstructorElement
								text={ingredient.name}
								price={ingredient.price}
								thumbnail={ingredient.image}
							/>
						})}
					</div>
				</ScrollableBlock>
				<ConstructorElement
					type="bottom"
					isLocked={true}
					text="Краторная булка N-200i (низ)"
					price={200}
					thumbnail={img}
				/>

				<div style={{display: 'flex', gap: '40px', justifyContent: 'flex-end'}} className='pt-10 pb-10'>
					<div style={{display: 'flex', gap: '8px', justifyContent: 'center', alignItems:'center'}}>
						<span className='text text_type_digits-medium'>610</span>
						<CurrencyIcon type="primary" />
					</div>
					<Button htmlType="button" type="primary" size="large" onClick={() => openOrderDetail()}>
						Оформить заказ
					</Button>
				</div>
				{isOrderDetailOpen && (
					<Modal title='' onClose={closeIngredient}>
						<OrderDetails order={order} />
					</Modal>
				)}
		</div>
	);
}

BurgerConstructor.propTypes = {
	ingredients: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
		image: PropTypes.string.isRequired,
	})).isRequired,
	style: PropTypes.object,
};

export default BurgerConstructor