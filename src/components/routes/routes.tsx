import ProtectedRoute from './protected-route/protected-route';
import PublicOnlyRoute from './public-only-route/public-only-route';
import ResetPasswordProtected from './reset-password-protected/reset-password-protected';

import React from 'react';
import { Routes, Route, useLocation, useNavigate, Location } from 'react-router-dom';
import {
	OrderHistoryPage,
	OrderFeedPage,
	ForgotPasswordPage,
	HomePage,
	IngredientDetailPage,
	LoginPage,
	NotFound404Page,
	ProfilePage,
	RegisterPage,
	ResetPasswordPage,
	OrderInfoPage,
} from '../../pages';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderInfo from '../order-info/order-info';

interface LocationState {
	background?: Location;
}

const AppRoutes: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const state = location.state as LocationState;
	const background = state && state.background;

	const handleModalClose = () => {
		navigate(background?.pathname || '/', { replace: true });
	};

	return (
		<>
			<Routes location={background || location}>
				<Route path='/login' element={
					<PublicOnlyRoute>
						<LoginPage />
					</PublicOnlyRoute>}
				/>
				<Route path='/register' element={
					<PublicOnlyRoute>
						<RegisterPage />
					</PublicOnlyRoute>}
				/>
				<Route path='/forgot-password' element={
					<PublicOnlyRoute>
						<ForgotPasswordPage />
					</PublicOnlyRoute>}
				/>
				<Route path='/reset-password' element={
					<ResetPasswordProtected>
						<ResetPasswordPage />
					</ResetPasswordProtected>}
				/>
				<Route path='/profile' element={
					<ProtectedRoute>
						<ProfilePage />
					</ProtectedRoute>}
				/>
				<Route path='/profile/orders' element={
					<ProtectedRoute>
						<OrderHistoryPage />
					</ProtectedRoute>}
				/>
				<Route path='/profile/orders/:number' element={
					<ProtectedRoute>
						<OrderInfoPage />
					</ProtectedRoute>}
				/>

				<Route path='/' element={<HomePage />} />
				<Route path='/ingredients/:id' element={<IngredientDetailPage />} />

				<Route path='/feed' element={<OrderFeedPage />} />
				<Route path='/feed/:number' element={<OrderInfoPage />} />

				<Route path='/order-history' element={<OrderHistoryPage />} />
				<Route path='*' element={<NotFound404Page />} />
			</Routes>

			{background && (
				<Routes>
					<Route
						path='/ingredients/:ingredientId'
						element={
							<Modal title='Детали ингредиента' onClose={handleModalClose}>
								<IngredientDetails />
							</Modal>
						}
					/>

					<Route
						path='/feed/:number'
						element={
							<Modal onClose={handleModalClose}>
								<OrderInfo />
							</Modal>
						}
					/>

					<Route
						path='/profile/orders/:number'
						element={
							<ProtectedRoute>
								<Modal title='Детали заказа' onClose={handleModalClose}>
									<OrderInfoPage />
								</Modal>
							</ProtectedRoute>
						}
					/>
				</Routes>
			)}
		</>
	);
};

export default AppRoutes;