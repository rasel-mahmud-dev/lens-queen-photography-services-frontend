import React from "react";

import "./style.css";
import { CSSTransition } from "react-transition-group";

const Modal = (props) => {
	const { isOpen, contentSpaceY = 10, backdropClass="", modalClass="", onCloseModal } = props;

	function handleCloseModal() {
		onCloseModal && onCloseModal();
	}

	return (
		<>
			<div className={`modal-backdrop ${backdropClass} ${!!isOpen ? "open-backdrop" : ""} `} onClick={handleCloseModal}></div>
			
			<CSSTransition unmountOnExit in={!!isOpen} timeout={1000} classNames="my-modal">
				<div
					className={`my-modal ${modalClass}`}
				     onClick={handleCloseModal}
				     style={{ maxHeight: `calc(100vh - ${contentSpaceY}px)` }}>
					{props.children}
				</div>
			</CSSTransition>
		</>
	);
};

export default Modal;
