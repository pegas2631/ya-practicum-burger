// app-header.js
import React from 'react'
import {BurgerIcon, ProfileIcon, ListIcon, Logo} from '@ya.praktikum/react-developer-burger-ui-components'
import NavButton from '../nav-button/nav-button';

import appHeader from './app-header.module.css'
import PropTypes from "prop-types";

const AppHeader = () => {
	return (
		<div className={`${appHeader.container} p-4`}>
			<div className={appHeader.nav}>
				<NavButton text='Конструктор' active={true} customStyle={ {marginLeft: 0} } >
					<BurgerIcon type='primary' />
				</NavButton>
				<NavButton text='Лента заказов' active={false}>
					<ListIcon type='secondary' />
				</NavButton>
			</div>
			<div>
				<Logo />
			</div>
			<div className={appHeader.nav}>
				<NavButton text='Личный кабинет' active={false}>
					<ProfileIcon type='secondary' />
				</NavButton>
			</div>
		</div>
	);
}

NavButton.propTypes = {
	text: PropTypes.string.isRequired,
	active: PropTypes.bool,
	customStyle: PropTypes.object,
	children: PropTypes.node.isRequired,
};

export default AppHeader