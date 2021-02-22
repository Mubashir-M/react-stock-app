import axios from 'axios'

const baseUrl = 'http://localhost:3000/api/items'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newStock => {
  const reponse = await axios.post(baseUrl, newStock)
  return reponse.data
}

const remove = async id => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}
const stockService = { getAll , create, remove}

export default stockService