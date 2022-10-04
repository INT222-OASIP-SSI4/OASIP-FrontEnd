import { useRoute, useRouter } from 'vue-router'
import { ref, resolveDirective } from 'vue'

const route = useRoute()
const router = useRouter()
const accessToken = ref(localStorage.getItem('accessToken'))
const refreshToken = ref(localStorage.getItem('refreshToken'))

export const saveAccessToken = (accToken) => {
  return localStorage.setItem('accessToken', `${accToken}`)
}
export const saveRefreshToken = (refToken) => {
  return localStorage.setItem('refreshToken', `${refToken}`)
}

export const saveUserEmail = (email) => {
  return localStorage.setItem('userEmail', `${email}`)
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

export const parseJwt = () => {
  var base64Url = accessToken.value.split('.')[1]
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )
  return JSON.parse(jsonPayload).sub
}

// const parseJwt = (token) => {
//   var base64Url = token.split('.')[1]
//   var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
//   var jsonPayload = decodeURIComponent(
//     window
//       .atob(base64)
//       .split('')
//       .map(function (c) {
//         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
//       })
//       .join('')
//   )
//   return JSON.parse(jsonPayload)
// }
// console.log(parseJwt(token.value))
