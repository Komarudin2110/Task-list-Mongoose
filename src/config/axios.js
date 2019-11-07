import axios from 'axios'

export default axios.create({
    // baseURL: 'http://localhost:2077'
    baseURL: 'https://task-mysql.herokuapp.com/'
})