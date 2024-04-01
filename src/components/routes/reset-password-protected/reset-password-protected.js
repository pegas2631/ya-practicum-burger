import {Navigate} from "react-router-dom";
import React from "react";
import PropTypes from 'prop-types';

const ResetPasswordProtected = ({ children }) => {
	const canResetPassword = localStorage.getItem('canResetPassword');
	return canResetPassword ? children : <Navigate to="/forgot-password" replace />;
};

ResetPasswordProtected.propTypes = {
	children: PropTypes.node.isRequired,
};

export default ResetPasswordProtected;