import axios from 'axios'
const apiUrl = 'http://localhost:3003'
const baseUrl = '/api/users'
const trueUrl = apiUrl + baseUrl

const getAll = () => {
    const request = axios.get(trueUrl)
    return request.then(response => response.data)
        .catch((error) => {
            if (error.response) {
                // The request was made, but the server responded with an error status code
                console.error('Server Error:', error.response.data)
            } else if (error.request) {
                // The request was made, but no response was received
                console.error('No Response from Server')
            } else {
                // Something happened in setting up the request that triggered an error
                console.error('Request Error:', error.message)
            }
        })
}

const create = async newObject => {
    const response = await axios.post(trueUrl, newObject)
    return response.data
}

export default { getAll, create }