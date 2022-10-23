import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://duvc27bkkg.execute-api.ap-south-1.amazonaws.com',
    headers: {
        contentType: 'application/json'
    }
})

export default axiosInstance