const dev = process.env.NEXT_PUBLIC_NODE_ENV_FE === "development"
export const BASE_URL = dev
    ? "http://localhost:3002/api/v2"
    : process.env.NEXT_PUBLIC_PROD_ADDR + '/api/v2'

export default {
    LOGIN: `${BASE_URL}/auth/login`,
    LOGOUT: `${BASE_URL}/auth/logout`,
    SIGNUP: `${BASE_URL}/auth/register`,
    RECIPE_ASSETS: `${BASE_URL}/assets`,
    RECIPES_ENDPOINT: `${BASE_URL}/recipes`,
    LOGIN: `${BASE_URL}/auth/login`,
    RECIPES: {
        ENDPOINT: `${BASE_URL}/recipes`,
        WITH_PARAM: (id) => `${BASE_URL}/recipes/${id}`,
        PUBLISH: `${BASE_URL}/recipes/publish/`

    },
    USER: {
        LOOKUP_EMAIL: `${BASE_URL}/users/lookup-email`,
        GET_CURRENT: `${BASE_URL}/users/me`,
        RECIPES: `${BASE_URL}/users/me/recipes`,
        GET_FAVORITES: `${BASE_URL}/users/me/favorites`,
        UPDATE_FAVORITES: `${BASE_URL}/users/me/favorites/`
    }
}

export const CLOUDINARY = {
    API_KEY: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    API_KEY_SECRET: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY_SECRET,
    CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    FOLDER: process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER,
    PRESET: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET,
    URL: process.env.NEXT_PUBLIC_CLOUDINARY_URL
}
