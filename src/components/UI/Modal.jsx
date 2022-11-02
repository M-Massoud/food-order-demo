import { createPortal } from 'react-dom';

import styles from './Modal.module.css';

function Backdrop(props) {
  return <div className={styles.backdrop} onClick={props.hideCart} />;
}

function ModalOverlay(props) {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
}

const portalElement = document.getElementById('overlay');

function Modal(props) {
  return (
    <>
      {createPortal(<Backdrop hideCart={props.hideCart} />, portalElement)}
      {createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
}

export default Modal;
