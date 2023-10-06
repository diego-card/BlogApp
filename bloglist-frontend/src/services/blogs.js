import axios from 'axios'
// const apiUrl = 'http://localhost:3003'
const apiUrl = 'https://blogapp-qr9y.onrender.com'
const baseUrl = '/api/blogs'
const trueUrl = apiUrl + baseUrl

let token = null

const likeHeaders = {
  'Content-Type': 'application/json', // Indicate that you are sending JSON data
}

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(trueUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(trueUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  try {
    const response = await axios.put(`${trueUrl}/${id}`, newObject, { likeHeaders })
    return response.data
  } catch (err) {
    console.log(err)
  }
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  try {
    const response = await axios.delete(`${trueUrl}/${id}`, config)
    return response.data
  } catch (err) {
    console.log(err)
  }
}

export default { getAll, create, update, setToken, deleteBlog }