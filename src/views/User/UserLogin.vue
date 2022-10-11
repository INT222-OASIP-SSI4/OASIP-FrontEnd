<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UserLoginForm from '../../components/User/UserLoginForm.vue'
import { saveAccessToken, saveRefreshToken } from '../../utils/index.js'

const route = useRoute()
const router = useRouter()
// const users = ref([])
const accessToken = ref()
const refreshToken = ref()

const goHome = () => {
  router.push({ name: 'home' })
}

//login new user
const userLogin = async (userLogin) => {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  if (userLogin.userEmail.length > 50) {
    alert('userEmail must have length 1-50')
  }
  if (userLogin.userEmail.match(validRegex)) {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/users/login`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: userLogin.userEmail,
          password: userLogin.password,
        }),
      }
    )
    if (res.status === 201 || res.status === 200) {
      const data = await res.json()
      accessToken.value = data.jwttoken
      refreshToken.value = data.refreshToken
      saveAccessToken(accessToken.value)
      saveRefreshToken(refreshToken.value)
      alert('Login Successful')
      goHome()
    } else if (res.status === 401) {
      alert('Password NOT Matched')
    } else if (res.status === 404) {
      alert('A user with the specified email DOES NOT exist')
    } else {
      alert('Error, please try again')
    }
  } else {
    alert('Invalid email address!')
  }
}
</script>

<template>
  <UserLoginForm @login="userLogin" />
</template>

<style></style>
