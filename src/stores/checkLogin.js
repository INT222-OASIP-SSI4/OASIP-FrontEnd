import { defineStore } from 'pinia'
import { UserAgentApplication } from 'msal'

const accessToken = localStorage.getItem('accessToken')

const msalConfig = {
  auth: {
    clientId: '05299507-9635-4ea1-a9d8-85dcc66c485e',
    authority:
      'https://login.microsoftonline.com/6f4432dc-20d2-441d-b1db-ac3380ba633d',
    redirectURI: 'https://intproj21.sit.kmutt.ac.th/ssi4/#/',
  },
  cache: {
    cacheLocation: 'localStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: true,
    popUp: true, // Set this to "true" if you are having issues on IE11 or Edge
  },
}

var myMSALObj = new UserAgentApplication(msalConfig)

var msLogoff = () => {
  myMSALObj.logout()
}
export const useLoginStore = defineStore({
  id: 'login',
  state: () => ({
    isLogout: 'LOGIN',
    isLogin: 'LOGOUT',
  }),
  actions: {
    logout() {
      if (confirm(`Do you want to log out?`)) {
        if (localStorage.getItem('MsStatus')) {
          msLogoff()
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          localStorage.clear()
          window.location.reload()
        } else {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          localStorage.clear()
          window.location.reload()
        }
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
