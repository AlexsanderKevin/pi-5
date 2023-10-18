import axios from 'axios'

const axiosConfig = axios.create({baseURL: 'https://dummyjson.com/auth/'})

export default axiosConfig