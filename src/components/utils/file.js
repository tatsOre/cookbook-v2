export const isValidImageFile = (imageFile) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"]
    console.log({ allowed: allowedTypes.includes(imageFile?.type)})
    return allowedTypes.includes(imageFile?.type)
}

export const getImageSrc = (imageFile) => {
    if (!imageFile) return null

    if (typeof imageFile === 'string') {
        return imageFile
    } else {
        const src = imageFile.length > 0 ? imageFile[0] : imageFile
        return src && isValidImageFile(src) ? URL.createObjectURL(src) : null
    }
}
