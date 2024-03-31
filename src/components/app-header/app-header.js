import React from 'react'
import { BurgerIcon, ProfileIcon, ListIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import NavButton from '../nav-button/nav-button';
import { useNavigate, Link } from 'react-router-dom';

import appHeader from './app-header.module.css'

const AppHeader = () => {
	return (
		<header className={`${appHeader.container} p-4`}>
			<div className={appHeader.nav}>
				<NavButton text='Конструктор' active={true} customStyle={{marginLeft: 0}}>
					<BurgerIcon type='primary' />
				</NavButton>
				<NavButton text='Лента заказов' active={false}>
					<ListIcon type='secondary' />
				</NavButton>
			</div>
			<div className={appHeader.logoContainer}> {/* Обертка для логотипа */}
				<Logo />
			</div>
			<div className={appHeader.nav}>
				<Link to={'/profile'}>
					<NavButton text='Личный кабинет' active={false}>
						<ProfileIcon type='secondary' />
					</NavButton>
				</Link>
			</div>
		</header>
	);
}

export default AppHeader