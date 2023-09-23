import UnstyledButton from "../UnstyledButton"
import cx from "@/components/utils/cx"
import styles from './MenuButton.module.scss'

function MenuButton({ isOpen, toggleState, ...rest }) {
    return (
        <UnstyledButton
            className={styles.button__menu}
            ariaLabel={isOpen ? 'close menu' : 'open menu'}
            onClick={toggleState}
            {...rest}
        >
            <span
                className={cx([
                    styles['button__menu--bar'], isOpen && styles.animate
                ])}
            >
            </span>
        </UnstyledButton>
    )
}

export default MenuButton
