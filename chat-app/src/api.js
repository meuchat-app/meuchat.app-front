import axios from 'axios';

const api = axios.create({
    baseURL: 'http://exemplo.com'
})

export default api;