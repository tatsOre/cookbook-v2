const dev = process.env.NEXT_PUBLIC_NODE_ENV_FE === "development"
export const BASE_URL = dev
    ? "http://localhost:3002/api/v2"
    : process.env.NEXT_PUBLIC_PROD_ADDR + '/api/v2'

export default {
    LOGIN: `${BASE_URL}/auth/login`,
    LOGOUT: `${BASE_URL}/auth/logout`,
    SIGNUP: `${BASE_URL}/auth/register`,
    RECIPE_ASSETS: `${BASE_URL}/assets`,
    RECIPES_ENDPOINT: `${BASE_URL}/recipes`
}

export const CLOUDINARY_URL =
    "https://api.cloudinary.com/v1_1/dshl3pgv4/upload"
