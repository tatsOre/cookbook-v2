import cx from "../utils/cx"
import UnstyledButton from "./UnstyledButton"

import styles from './Button.module.scss'

function IconButton({ icon, className, ...rest }) {
    return (
        <UnstyledButton
            className={cx([styles['icon--button'], className])}
            {...rest}>
            {icon}
        </UnstyledButton>
    )
}

export default IconButton
