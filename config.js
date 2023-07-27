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
    REGISTER: `${BASE_URL}/auth/register`,
    LOGIN: `${BASE_URL}/auth/login`
}

export const CLOUDINARY = {
    FOLDER: process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER,
    PRESET: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET,
    URL: process.env.NEXT_PUBLIC_CLOUDINARY_URL
}
