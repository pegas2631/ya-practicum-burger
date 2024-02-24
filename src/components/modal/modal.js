import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import modal from './modal.module.css';
import ModalOverlay from './modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";

const Modal = ({ title, children, onClose }) => {
	const modalRoot = document.getElementById('modal-root');

	useEffect(() => {
		const handleEsc = (event) => {
			if (event.keyCode === 27) onClose();
		};

		window.addEventListener('keydown', handleEsc);

		return () => {
			window.removeEventListener('keydown', handleEsc);
		};
	}, [onClose]);

	return ReactDOM.createPortal(
		(
			<ModalOverlay onClose={onClose}>
				<div className={`${modal.modal}  pr-10 pl-10 pt-10 pb-15`} onClick={(e) => e.stopPropagation()}>
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

Modal.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.node,
	onClose: PropTypes.func.isRequired,
};

export default Modal;