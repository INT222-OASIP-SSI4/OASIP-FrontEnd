import { defineStore } from 'pinia'

const accessToken = localStorage.getItem('accessToken')

export const useLoginStore = defineStore({
  id: 'login',
  state: () => ({
    isLogout: 'LOGIN',
    isLogin: 'LOGOUT',
  }),
  actions: {
    logout() {
      if (confirm(`Do you want to log out?`)) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        window.location.reload()
      }
    },
  },
  getters: {
    loginOrLogout: (state) => {
      if (!accessToken) {
        return 'LOGIN'
      } else {
        return 'LOGOUT'
      }
    },
  },
})
