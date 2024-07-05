import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from '../services/hooks';
import { Link, useNavigate } from 'react-router-dom';
import styles from './global.module.css';
import profile from './profile.module.css';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { fetchUserData, logoutUser, updateUserData } from '../services/slices/user-slice';
import {AppDispatch, RootState} from '../services/store';

export const ProfilePage: React.FC = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [name, setName] = useState<string>('');
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state: RootState) => state.user.user);

	useEffect(() => {
		dispatch(fetchUserData());
	}, [dispatch]);

	useEffect(() => {
		if (user) {
			setEmail(user.email);
			setName(user.name);
		}
	}, [user]);

	const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleSave = async (e: FormEvent) => {
		e.preventDefault();
		if (user && (email !== user.email || name !== user.name || password)) {
			dispatch(updateUserData({ email, password, name }));
		}
	};

	const handleCancel = (e: FormEvent) => {
		e.preventDefault();
		if (user) {
			setEmail(user.email);
			setName(user.name);
			setPassword('');
		}
	};

	const handleLogout = () => {
		dispatch(logoutUser());
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		navigate('/login');
	};

	return (
		<div className={styles.main}>
			<div className={`${profile.mainContent} pt-30`}>
				<div className={`${profile.menu} ${styles.oneThird}`}>
					<div className={profile.menuItem}>
						<p className='text text_type_main-large'>Профиль</p>
					</div>

					<Link to={'/order-history'}>
						<div className={profile.menuItem}>
							<p className='text text_type_main-large text_color_inactive'>История заказов</p>
						</div>
					</Link>

					<div className={profile.menuItem} onClick={handleLogout}>
						<p className='text text_type_main-large text_color_inactive'>Выход</p>
					</div>

					<div className='pt-20'>
						<p className='text text_type_main-default text_color_inactive'>
							В этом разделе вы можете изменить свои персональные данные
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
							onPointerEnterCapture={undefined}
							onPointerLeaveCapture={undefined}
						/>
						<EmailInput
							onChange={onChangeEmail}
							value={email}
							name={'email'}
							extraClass='mb-6'
							// @ts-ignore
							icon={'EditIcon'}
						/>
						<PasswordInput
							onChange={onChangePassword}
							value={password}
							name={'password'}
							extraClass='mb-6'
							icon={'EditIcon'}
						/>
						<div className={`${styles.rightSide} ${styles.fullWidth}`}>
							<Button htmlType='button' type='secondary' size='medium' onClick={handleCancel}>
								Отменить
							</Button>
							<Button htmlType='submit' type='primary' size='large'>
								Сохранить
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};