import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://3.7.215.226:8080',
    headers: {
        contentType: 'application/json'
    }
})

export default axiosInstance