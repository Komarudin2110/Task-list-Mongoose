import axios from 'axios'

export default axios.create({
    // baseURL: 'http://localhost:2007'
    baseURL: 'https://mongoose-lautanapi.herokuapp.com/'
})