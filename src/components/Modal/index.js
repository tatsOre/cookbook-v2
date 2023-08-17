import Backdrop from "../Backdrop"
import InPortal from "../InPortal"

import styles from './Modal.module.scss'

function Modal(props) {
    // todo: focus trap, focus on cancel, backdrop, prevent body scroll
    const { heading, children, onCancel, onConfirm, show } = props
    return (
        <InPortal id="portal-container">
            <Backdrop>
                <div className={styles.modal__wrapper}>
                    <header>
                        <h2>{heading}</h2>
                        {children}
                    </header>

                    <button onClick={onCancel}>Cancel</button>
                    <button onClick={onConfirm}>Confirm</button>
                </div>
            </Backdrop>
        </InPortal>
    )
}

export default Modal
