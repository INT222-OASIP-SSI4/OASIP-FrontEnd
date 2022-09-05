<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { onBeforeMount } from '@vue/runtime-core'
import UserLoginForm from '../../components/User/UserLoginForm.vue'
import { saveToLocal } from '../../utils/index.js'

const route = useRoute()
const router = useRouter()
const users = ref([])
const token = ref()

//get all users
const getUsers = async () => {
  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users`)
  if (res.status === 200) {
    let data = await res.json()
    users.value = data
  } else {
    console.log('error, cannot get data')
  }
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
      token.value = await res.json()
      saveToLocal(token.value)
      alert('Password Matched')
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

onBeforeMount(async () => {
  await getUsers()
})
</script>

<template>
  <UserLoginForm :loginUser="users" @login="userLogin" />
</template>

<style></style>
