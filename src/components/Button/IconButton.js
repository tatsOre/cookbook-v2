import cx from "../utils/cx"
import UnstyledButton from "./UnstyledButton"

import styles from './Button.module.scss'

function IconButton({ icon, className, small, ...rest }) {
    const classes = cx([styles['icon--button'], small && styles['icon--small'], className])
    return (
        <UnstyledButton
            className={classes}
            {...rest}>
            {icon}
        </UnstyledButton>
    )
}

export default IconButton
