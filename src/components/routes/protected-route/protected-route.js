import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../../utils/auth';

const ProtectedRoute = ({ children }) => {
	const isAuth = useAuth();
	const location = useLocation();

	if (!isAuth) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return children;
};

export default ProtectedRoute;