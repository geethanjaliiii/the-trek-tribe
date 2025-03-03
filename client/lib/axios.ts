import axios from "axios";

import {store} from './store'
import { logout } from "@/features/auth/authSlice";
const apiUrl = process.env.NEXT_PUBLIC_API_URL

const axiosInstance = axios.create({
    baseURL: apiUrl,
    headers: {'Content-Type':'application/json'},
    withCredentials: true,
})

//response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    async(error) => {
        const originalRequest =error.config;

        if(error.response?.status ===401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
               await axios.post(`${apiUrl}/auth/refresh-token`,
                {},
                {withCredentials: true}

               ) ;
               return axiosInstance(originalRequest)
            } catch (refreshError) {
                store.dispatch(logout())
                window.location.href='/login?reason=session_expired';
                return Promise.reject(refreshError)
            }

            
        } 
        if(error.response?.status === 429) {
            console.warn("Too many requests - please try again later")
        }
        return Promise.reject(error)
    }
)

export default axiosInstance