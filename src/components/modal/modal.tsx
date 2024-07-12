import React, { useEffect, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import modal from './modal.module.css';
import ModalOverlay from './modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface IModalProps {
	title?: string;
	children: ReactNode;
	onClose: () => void;
}

const Modal: React.FC<IModalProps> = ({ title, children, onClose }) => {
	const modalRoot = document.getElementById('modal-root');

	useEffect(() => {
		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === 'Escape') onClose();
		};

		window.addEventListener('keydown', handleEsc);

		return () => {
			window.removeEventListener('keydown', handleEsc);
		};
	}, [onClose]);

	if (!modalRoot) return null;

	return ReactDOM.createPortal(
		(
			<ModalOverlay onClose={onClose}>
				<div className={`${modal.modal} pr-10 pl-10 pt-10 pb-15`} data-testId={'modal'} onClick={(e) => e.stopPropagation()}>
					<div className={modal.header}>
						<h2 className={'text text_type_main-large'}>{title}</h2>
						<div className={modal.closeIcon} onClick={onClose}>
							<CloseIcon type="primary" />
						</div>
					</div>
					<div className={modal.modalContent}>
						{children}
					</div>
				</div>
			</ModalOverlay>
		),
		modalRoot
	);
};

export default Modal;