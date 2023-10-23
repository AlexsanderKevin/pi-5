import axios from 'axios'

const api = axios.create({
    baseURL: 'http://45.190.111.28:3001/',
    responseType: 'json',
    withCredentials: true
})

export default api