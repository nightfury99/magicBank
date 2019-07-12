import axios from 'axios'

const service = axios.create({
  baseURL: process.env.FILE_API,
  timeout: 5000
})

export default service
