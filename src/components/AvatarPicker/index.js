import React from "react"
import Image from "next/image"
import { avatars } from "./Avatar.helpers"

import styles from './AvatarPicker.module.scss'

function AvatarPicker({ name = "avatar" }) {
    const [selected, setSelected] = React.useState('')

    const onInputChange = (ev) => setSelected(ev.target.value)

    return (
        <fieldset className={styles['avatar__picker--wrapper']}>
            <legend>Select an avatar</legend>

            {avatars.map((image, index) => {
                const id = `img--option--${index}`
                return (
                    <>
                        <input
                            checked={image === selected}
                            id={id}
                            name={name}
                            onChange={onInputChange}
                            type="radio"
                            value={image} />
                        <label htmlFor={id}>
                            <Image height={50} width={50} src={image} alt={id} />
                        </label>
                    </>
                )
            })}
        </fieldset>
    )
}

export default AvatarPicker
