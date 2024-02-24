// modal-overlay.js
import React from 'react';
import modalOverlay from './modal-overlay.module.css';
import PropTypes from "prop-types";

const ModalOverlay = ({ children, onClose }) => {
	return (
		<div className={modalOverlay.overlay} onClick={onClose}>
			{children}
		</div>
	);
};

ModalOverlay.propTypes = {
	children: PropTypes.node,
	onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;