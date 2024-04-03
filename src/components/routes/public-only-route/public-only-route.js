import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuth from '../../../utils/auth';

const PublicOnlyRoute = ({ children }) => {
	const isAuth = useAuth();
	return !isAuth ? children : <Navigate to="/" replace />;
};

PublicOnlyRoute.propTypes = {
	children: PropTypes.node.isRequired,
};

export default PublicOnlyRoute