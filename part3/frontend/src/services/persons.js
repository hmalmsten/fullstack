import axios from 'axios'
import setMessage from '../App.js'
const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
  }
  

const del = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then(response => {
    console.log('success!')
  })}


export default { 
  getAll: getAll, 
  create: create, 
  del: del,
  update: update
}