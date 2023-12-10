export const isValidImageFile = (imageFile) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"]
    return allowedTypes.includes(imageFile?.type)
}

export const getImageSrc = (imageFile) => {
    if (!imageFile) return null

    if (typeof imageFile.url === 'string') {
        return imageFile.url
    } 
    
    return isValidImageFile(imageFile) ? URL.createObjectURL(imageFile) : null
}
