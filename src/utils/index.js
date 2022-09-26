import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'

const route = useRoute()
const router = useRouter()
const refreshToken = ref(localStorage.getItem('refreshToken'))

export const saveAccessToken = (accToken) => {
  return localStorage.setItem('accessToken', `${accToken}`)
}
export const saveRefreshToken = (refToken) => {
  return localStorage.setItem('refreshToken', `${refToken}`)
}

export const renewToken = async () => {
  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/refresh`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${refreshToken.value}`,
    },
  })
  if (res.status === 200) {
    let data = await res.json()
    saveAccessToken(data.jwttoken)
  }
}
