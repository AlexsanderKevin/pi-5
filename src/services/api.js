import axios from 'axios'

const api = axios.create({
    baseURL: 'http://api-pi5fatec.ddns.net:3001/',
    responseType: 'json',
    withCredentials: true
})

export default api