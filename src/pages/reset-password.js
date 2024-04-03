import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from "./global.module.css";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import request from '../utils/request-helper';

export function ResetPasswordPage() {

	const [password, setPassword] = React.useState('');
	const [code, setCode] = React.useState('');
	const navigate = useNavigate();

	const onChangePassword = e => {
		setPassword(e.target.value)
	}

	const onChangeCode = e => {
		setCode(e.target.value)
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await request('password-reset/reset', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ password, token: code }),
		});
		if (response.success) navigate('/login');
	};

	return (
		<div className={styles.main}>
			<div className={styles.centeredFullWindow}>
				<form onSubmit={handleSubmit}>
					<h1 className="text text_type_main-medium mb-6 text-center">Восстановление пароля</h1>
					<PasswordInput
						onChange={onChangePassword}
						value={password}
						placeholder={'Введите новый пароль'}
						name={'password'}
						extraClass="mb-6"
					/>
					<Input
						onChange={onChangeCode}
						value={code}
						placeholder={'Введите код из письма'}
						name={'code'}
						extraClass="mb-6"
					/>
					<div className={`${styles.centered} ${styles.fullWidth} mb-20`}>
						<Button htmlType="submit" type="primary" size="large">
							Сохранить
						</Button>
					</div>
					<p className="text text_type_main-default text_color_inactive text-center">
						Вспомнили пароль?
						<Link to='/login'>
							<Button htmlType="button" type="secondary" size="medium" extraClass={'p-1'}>
								Войти
							</Button>
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
}