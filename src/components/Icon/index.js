import cx from '../utils/cx'

import {
    IconCheck,
    IconCross,
    IconBoard,
    IconChevron,
    IconAddPlus
} from './icons'

export const IconShapes = {
    'add-plus': IconAddPlus,
    check: IconCheck,
    cross: IconCross,
    board: IconBoard,
    chevron: IconChevron
}

function Icon(props) {
    const { className, name, ...rest } = props
    const SvgComponent = IconShapes[name]
    return SvgComponent ? <SvgComponent /> : null
}

export default Icon
