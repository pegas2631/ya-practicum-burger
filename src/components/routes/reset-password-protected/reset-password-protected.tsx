import { Navigate } from 'react-router-dom';
import React, { ReactNode } from 'react';

interface IResetPasswordProtectedProps {
	children: ReactNode;
}

const ResetPasswordProtected: React.FC<IResetPasswordProtectedProps> = ({ children }) => {
	const canResetPassword = localStorage.getItem('canResetPassword');
	return canResetPassword ? <>{children}</> : <Navigate to="/forgot-password" replace />;
};

export default ResetPasswordProtected;