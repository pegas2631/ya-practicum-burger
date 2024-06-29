import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import styles from './global.module.css';
import { Button, EmailInput, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { registerUser } from '../services/slices/user-slice';

export const RegisterPage: React.FC = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [name, setName] = useState<string>('');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		// @ts-ignore
		dispatch(registerUser({ email, password, name }))
			.unwrap()
			.then(() => {
				navigate('/login');
			})
			.catch((error: any) => {
				console.error('Ошибка при регистрации:', error);
			});
	};

	return (
		<div className={styles.main}>
			<div className={styles.centeredFullWindow}>
				<form onSubmit={handleSubmit}>
					<h1 className='text text_type_main-medium mb-6 text-center'>Регистрация</h1>
					<Input
						onChange={onChangeName}
						value={name}
						placeholder={'Имя'}
						name={'name'}
						extraClass='mb-6'
						onPointerEnterCapture={undefined}
						onPointerLeaveCapture={undefined}
					/>
					<EmailInput
						onChange={onChangeEmail}
						value={email}
						name={'email'}
						extraClass='mb-6'
					/>
					<PasswordInput
						onChange={onChangePassword}
						value={password}
						name={'password'}
						extraClass='mb-6'
					/>
					<div className={`${styles.centered} ${styles.fullWidth} mb-20`}>
						<Button htmlType='submit' type='primary' size='large'>
							Зарегистрироваться
						</Button>
					</div>
					<p className='text text_type_main-default text_color_inactive text-center'>
						Уже зарегистрированы?
						<Link to='/login'>
							<Button htmlType='button' type='secondary' size='medium' extraClass={'p-1'}>
								Войти
							</Button>
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
};