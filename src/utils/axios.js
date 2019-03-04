import axios from 'axios'

const { REACT_APP_API_DEV, REACT_APP_API_PROD } = process.env
const isDevMode = process.env.NODE_ENV === 'development'
const API_URL = isDevMode ? REACT_APP_API_DEV : REACT_APP_API_PROD

export default axios.create({
  baseURL: API_URL,
  timeout: 30000
})
