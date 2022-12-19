import api from './api'
import { ref } from 'vue'

const accessToken = ref(localStorage.getItem('accessToken'))

const configGet = {
  headers: {
    Authorization: `Bearer ${accessToken.value}`,
  },
}

const configAuth = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken.value}`,
  },
}

const configCreateEvent = {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
}

class ApiService {
  // Categories Service
  async getCategories() {
    return await api.get(`/api/eventcategories`, configGet)
  }
  async getCategoryById(id) {
    return await api.get(`/api/eventcategories/${id}`, configGet)
  }
  async editCategory(id, body) {
    return await api.put(`/api/eventcategories/${id}`, body, configAuth)
  }
  // Events
  async getEvents() {
    return await api.get(
      `/api/events/validate`
    )
  }
  async createEvent(body){
    return await api.post(`/api/events`, body, configCreateEvent)
  }
}
export default new ApiService()
