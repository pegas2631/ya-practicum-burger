import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from "./global.module.css";
import profile from "./profile.module.css";
import AppHeader from "../components/app-header/app-header";
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { fetchUserData, logoutUser, updateUserData } from '../services/slices/user-slice';

export function ProfilePage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.user.user);

	useEffect(() => {
		dispatch(fetchUserData());
	}, [dispatch]);

	useEffect(() => {
		if (user) {
			setEmail(user.email);
			setName(user.name);
		}
	}, [user]);

	const onChangeName = e => {
		setName(e.target.value);
	};

	const onChangeEmail = e => {
		setEmail(e.target.value);
	};

	const onChangePassword = e => {
		setPassword(e.target.value);
	};

	const handleSave = async (e) => {
		e.preventDefault();
		if (email !== user.email || name !== user.name || password) {
			dispatch(updateUserData({ email, password, name }));
		}
	};

	const handleLogout = () => {
		dispatch(logoutUser());
		localStorage.removeItem('accessToken'); // Убедитесь, что токены удаляются при выходе
		localStorage.removeItem('refreshToken');
		navigate('/login');
	};

	return (
		<div className={styles.main}>
			<AppHeader />
			<div className={`${profile.mainContent} pt-30`}>
				<div className={`${profile.menu} ${styles.oneThird}`}>
					<div className={profile.menuItem}>
						<p className="text text_type_main-large">Профиль</p>
					</div>

					<div className={profile.menuItem}>
						<p className="text text_type_main-large text_color_inactive">История заказов</p>
					</div>

					<div className={profile.menuItem} onClick={handleLogout}>
						<p className="text text_type_main-large text_color_inactive">Выход</p>
					</div>

					<div className='pt-20'>
						<p className="text text_type_main-default text_color_inactive">
							В этом разделе вы можете
							изменить свои персональные данные
						</p>
					</div>
				</div>
				<div className={styles.oneThird}>
					<form onSubmit={handleSave}>
						<Input
							onChange={onChangeName}
							value={name}
							placeholder={'Имя'}
							name={'name'}
							extraClass='mb-6'
							icon={'EditIcon'}
						/>
						<EmailInput
							onChange={onChangeEmail}
							value={email}
							name={'email'}
							extraClass='mb-6'
							icon={'EditIcon'}
						/>
						<PasswordInput
							onChange={onChangePassword}
							value={password}
							name={'password'}
							extraClass='mb-6'
							icon={'EditIcon'}
						/>
						<div className={`${styles.centered} ${styles.fullWidth}`}>
							<Button htmlType="submit" type="primary" size="large">
								Сохранить
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}