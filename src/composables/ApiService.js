import api from './api'
import { ref } from 'vue'

const accessToken = ref(localStorage.getItem('accessToken'))

const configAuth = {
  headers: {
    Authorization: `Bearer ${accessToken.value}`,
  },
}

const configPostPut = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken.value}`,
  },
}

const configCreateEvent = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
}

class ApiService {
  // Categories Service
  async getCategories() {
    return await api.get(`/api/eventcategories`, configAuth)
  }
  async getCategoryById(id) {
    return await api.get(`/api/eventcategories/${id}`, configAuth)
  }
  async editCategory(id, body) {
    return await api.put(`/api/eventcategories/${id}`, body, configPostPut)
  }
  // Events Service
  async getEvents() {
    return await api.get(`/api/events/validate`)
  }
  async getEventById(id) {
    return await api.get(`/api/events/${id}`, configAuth)
  }
  // async createEvent(body) {
  //   return await api.post(`/api/events`, body, configCreateEvent)
  // }
  async deleteEvent(id){
    return await api.delete(`/api/events/${id}`, configAuth)
  }
}
export default new ApiService()
