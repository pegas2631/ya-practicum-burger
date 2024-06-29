import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './global.module.css';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { loginUser } from '../services/slices/user-slice';
import { AppDispatch } from '../services/store';

interface LocationState {
	from: {
		pathname: string;
	};
}

export const LoginPage: React.FC = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const location = useLocation();
	const { from } = (location.state as LocationState) || { from: { pathname: '/' } };

	const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleLogin = (e: FormEvent) => {
		e.preventDefault();

		dispatch(loginUser({ email, password }))
		.unwrap()
		.then(() => {
			navigate(from);
		})
		.catch((error: any) => {
			console.error('Ошибка при входе:', error);
		});
	};

	return (
		<div className={styles.main}>
			<div className={styles.centeredFullWindow}>
				<form onSubmit={handleLogin}>
					<h1 className='text text_type_main-medium mb-6 text-center'>Вход</h1>
					<EmailInput
						onChange={onChangeEmail}
						value={email}
						name={'email'}
						isIcon={false}
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
							Войти
						</Button>
					</div>
					<p className='text text_type_main-default text_color_inactive text-center'>
						Вы новый пользователь?
						<Link to='/register'>
							<Button htmlType='button' type='secondary' size='medium' extraClass={'p-1'}>
								Зарегистрироваться
							</Button>
						</Link>
					</p>

					<p className='text text_type_main-default text_color_inactive text-center mb-4'>
						Забыли пароль?
						<Link to='/forgot-password'>
							<Button htmlType='button' type='secondary' size='medium' extraClass={'p-1'}>
								Восстановить пароль
							</Button>
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
};