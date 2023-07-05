export const isValidImageFile = (imageFile) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"]
    return allowedTypes.includes(imageFile?.type)
}

export const getImageSrc = (imageFile) => {
    //console.log('getting filepath', imageFile)
    if (!imageFile) return null

    if (typeof imageFile === 'string') {
        return imageFile
    } else {
        const src = imageFile.length > 0 ? imageFile[0] : imageFile
        return src && isValidImageFile(src) ? URL.createObjectURL(src) : null
    }
}
