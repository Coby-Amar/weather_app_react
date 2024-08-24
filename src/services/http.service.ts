import axios from "axios";

const instace = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

export const HttpService = instace