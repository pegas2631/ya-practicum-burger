import React, { ReactNode } from 'react';
import modalOverlay from './modal-overlay.module.css';

interface IModalOverlayProps {
	children: ReactNode;
	onClose: () => void;
}

const ModalOverlay: React.FC<IModalOverlayProps> = ({ children, onClose }) => {
	return (
		<div className={modalOverlay.overlay} onClick={onClose}>
			{children}
		</div>
	);
};

export default ModalOverlay;