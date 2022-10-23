import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://warm-plateau-12609.herokuapp.com',
    headers: {
        contentType: 'application/json'
    }
})

export default axiosInstance