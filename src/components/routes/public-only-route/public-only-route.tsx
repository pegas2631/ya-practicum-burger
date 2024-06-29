import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../../utils/auth';

interface PublicOnlyRouteProps {
	children: ReactNode;
}

const PublicOnlyRoute: React.FC<PublicOnlyRouteProps> = ({ children }) => {
	const isAuth = useAuth();
	return !isAuth ? <>{children}</> : <Navigate to="/" replace />;
};

export default PublicOnlyRoute;