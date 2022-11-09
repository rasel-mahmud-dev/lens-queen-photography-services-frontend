import React from "react";

import "./style.css";
import {CSSTransition} from "react-transition-group";


const Modal = (props) => {
	
	const {isOpen, contentSpaceY= 10, backdropClass, modalClass, onCloseModal} = props
	
	function handleCloseModal(e) {
		let el = e.target
		if (el.classList.contains('modal-backdrop')) {
			onCloseModal && onCloseModal()
		}
	}
	
	return (
		<CSSTransition unmountOnExit in={isOpen} timeout={1000} classNames="my-modal">
            <div
	            className={`modal-backdrop ${backdropClass} ${isOpen ? '' : 'modal-backdrop__close'}  `}
	            onClick={handleCloseModal}
            >
                <div className={`${modalClass} modal`} style={{maxHeight: `calc(100vh - ${contentSpaceY}px)`}}>
                    {props.children}
             
                </div>
            </div>
            
        </CSSTransition>
	)
}


export default Modal
