import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from "./global.module.css";
import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import request from '../utils/request-helper';

export function ForgotPasswordPage() {
	const navigate = useNavigate();
	const [email, setEmail] = React.useState('');
	const onChangeEmail = e => {
		setEmail(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await request('password-reset', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email }),
		});
		if (response.success) {
			localStorage.setItem('canResetPassword', 'true');
			navigate('/reset-password');
		} else {
			console.error('Ошибка восстановления пароля', response.message);
		}
	};

	return (
		<div className={styles.main}>
			<div className={styles.centeredFullWindow}>
				<form onSubmit={handleSubmit}>
					<h1 className="text text_type_main-medium mb-6 text-center">Восстановление пароля</h1>
					<EmailInput
						onChange={onChangeEmail}
						value={email}
						name={'email'}
						placeholder={'Укажите email'}
						extraClass="mb-6"
					/>
					<div className={`${styles.centered} ${styles.fullWidth} mb-20`}>
						<Button htmlType="submit" type="primary" size="large">
							Восстановить
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