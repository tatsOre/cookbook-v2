import React from "react"
import { IconCloudUpload } from "../Icon"

function FileInputMobile({ onInputChange }) {
  const onChangeHandler = (ev) => onInputChange(ev.target.files[0])

  return (
    <label htmlFor="input-file" className={styles.file__input}>
      <input
        id="input-file"
        type="file"
        accept="image/png, image/jpeg"
        onChange={onChangeHandler}
      />
      <IconCloudUpload size={16} aria-hidden="true" />
      <span>Upload a file</span>
    </label>
  )
}

export default FileInputMobile
