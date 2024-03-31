import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ForgotPasswordPage, HomePage, IngredientDetailPage, LoginPage, NotFound404Page, ProfilePage, RegisterPage, ResetPasswordPage } from '../../pages';
import { useDispatch } from "react-redux";
import { fetchIngredients } from "../../services/slices/ingredients-slice";

const useAuth = () => {
	const user = localStorage.getItem('accessToken');
	return !!user;
};

// @ts-ignore
const ProtectedRoute = ({ children }) => {
	const isAuth = useAuth();
	return isAuth ? children : <Navigate to="/login" replace />;
};

// @ts-ignore
const PublicOnlyRoute = ({ children }) => {
	const isAuth = useAuth();
	return !isAuth ? children : <Navigate to="/" replace />;
};

// @ts-ignore
const ResetPasswordProtected = ({ children }) => {
	const canResetPassword = localStorage.getItem('canResetPassword');
	return canResetPassword ? children : <Navigate to="/forgot-password" replace />;
};

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		// @ts-ignore
		dispatch(fetchIngredients());
	}, [dispatch]);

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/login' element={
					<PublicOnlyRoute>
						<LoginPage />
					</PublicOnlyRoute>
				} />
				<Route path='/register' element={
					<PublicOnlyRoute>
						<RegisterPage />
					</PublicOnlyRoute>
				} />
				<Route path='/forgot-password' element={
					<PublicOnlyRoute>
						<ForgotPasswordPage />
					</PublicOnlyRoute>
				} />
				<Route path='/reset-password' element={
					<ResetPasswordProtected>
						<ResetPasswordPage />
					</ResetPasswordProtected>
				} />
				<Route path='/profile' element={
					<ProtectedRoute>
						<ProfilePage />
					</ProtectedRoute>
				} />
				<Route path='/ingredients/:id' element={<IngredientDetailPage />} />
				<Route path='*' element={<NotFound404Page />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;