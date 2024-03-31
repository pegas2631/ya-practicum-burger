import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from "./global.module.css";
import AppHeader from "../components/app-header/app-header";
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { loginUser } from '../services/slices/user-slice';

export function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onChangeEmail = e => {
		setEmail(e.target.value);
	};

	const onChangePassword = e => {
		setPassword(e.target.value);
	};

	const handleLogin = () => {
		dispatch(loginUser({ email, password }))
		.unwrap()
		.then(() => {
			navigate('/');
		})
		.catch((error) => {
			console.error('Ошибка при входе:', error);
		});
	};

	return (
		<div className={styles.main}>
			<AppHeader />
			<div className={styles.centeredFullWindow}>
				<div>
					<h1 className="text text_type_main-medium mb-6 text-center">Вход</h1>
					<EmailInput
						onChange={onChangeEmail}
						value={email}
						name={'email'}
						isIcon={false}
						extraClass="mb-6"
					/>
					<PasswordInput
						onChange={onChangePassword}
						value={password}
						name={'password'}
						extraClass="mb-6"
					/>
					<div className={`${styles.centered} ${styles.fullWidth} mb-20`}>
						<Button onClick={handleLogin} htmlType="button" type="primary" size="large">
							Войти
						</Button>
					</div>
					<p className="text text_type_main-default text_color_inactive text-center">
						Вы новый пользователь?
						<Link to='/register'>
							<Button htmlType="button" type="secondary" size="medium" extraClass={'p-1'}>
								Зарегистрироваться
							</Button>
						</Link>
					</p>

					<p className="text text_type_main-default text_color_inactive text-center mb-4">
						Забыли пароль?
						<Link to='/forgot-password'>
							<Button htmlType="button" type="secondary" size="medium" extraClass={'p-1'}>
								Восстановить пароль
							</Button>
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}