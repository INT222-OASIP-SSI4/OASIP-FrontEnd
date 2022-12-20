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
    return await api.get(`/api/eventcategories`)
  }
  async getCategoryById(id) {
    return await api.get(`/api/eventcategories/${id}`, configAuth)
  }
  async editCategory(id, body) {
    return await api.put(`/api/eventcategories/${id}`, body, configPostPut)
  }
  // Events Service
  async getEvents() {
    return await api.get(`/api/events`, configAuth)
  }
  async getAllEventsWithoutAuth() {
    return await api.get(`/api/events/validate`)
  }
  async getEventById(id) {
    return await api.get(`/api/events/${id}`, configAuth)
  }
  async deleteEvent(id) {
    return await api.delete(`/api/events/${id}`, configAuth)
  }
  //Users Service
  async getUsers() {
    return await api.get(`/api/users`, configAuth)
  }
  async getUserById(id) {
    return await api.get(`/api/users/${id}`, configAuth)
  }
  async deleteUser(id) {
    return await api.delete(`/api/users/${id}`, configAuth)
  }
}
export default new ApiService()
