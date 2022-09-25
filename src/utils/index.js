import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

export const saveAccessToken = (accToken) => {
    return localStorage.setItem('accessToken', `${accToken}`)
}
export const saveRefreshToken = (refToken) => {
    return localStorage.setItem('refreshToken', `${refToken}`)
}