import cloudinary from "cloudinary/lib/cloudinary"

export const KEYS = {
    API_KEY: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    API_KEY_SECRET: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY_SECRET,
    CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    FOLDER: process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER,
    PRESET: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET,
    URL: process.env.NEXT_PUBLIC_CLOUDINARY_URL
}

cloudinary.config({
    cloud_name: KEYS.CLOUD_NAME,
    api_key: KEYS.API_KEY,
    api_secret: KEYS.API_KEY_SECRET
})

const service = {
    upload: async (file) => {

        let data = null
        let error = null

        const imageUploadData = new FormData()
        imageUploadData.append("file", file)
        imageUploadData.append("folder", KEYS.FOLDER)
        imageUploadData.append("upload_preset", KEYS.PRESET)

        const cloudinaryResponse = await fetch(KEYS.URL, {
            method: 'POST',
            body: imageUploadData
        })

        if (cloudinaryResponse.ok) {
            const imageResponseData = await cloudinaryResponse.json()

            data = {
                url: imageResponseData.secure_url,
                public_id: imageResponseData.public_id
            }
        } else {
            if (process.env.NEXT_PUBLIC_NODE_ENV_FE === "development") {
                console.log(cloudinaryResponse)
            }

            error = 'Something went wrong. Try later.'
        }

        return [data, error]
    },
    delete: (public_id) => {
        return new Promise((resolve, reject) => {
            cloudinary.v2.uploader.destroy(public_id, function (error, result) {
                if (error) return reject(error)
                return resolve(result)
            })
        })
    }
}

export default service
