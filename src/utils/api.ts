import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_STRAPI_API_URL,
})

api.defaults.headers.common["Authorization"] = `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`

api.defaults.headers.common["Content-Type"] = "application/json"

export default api
