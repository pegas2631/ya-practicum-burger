import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../../utils/auth';

interface IProtectedRouteProps {
	children: ReactNode;
}

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({ children }) => {
	const isAuth = useAuth();
	const location = useLocation();

	if (!isAuth) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return <>{children}</>;
};

export default ProtectedRoute;