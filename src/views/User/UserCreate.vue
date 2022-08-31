<script setup>
import UserCreateForm from '../../components/User/UserCreateForm.vue'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { onBeforeMount } from '@vue/runtime-core'

const route = useRoute()
const router = useRouter()
const users = ref([])

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

//create new user
const createUser = async (newUser) => {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  if (newUser.userName.length > 100) {
    alert('userName must have length 1-100')
  } else {
    if (newUser.userEmail.length > 50) {
      alert('userEmail must have length 1-50')
    } else {
      if (newUser.userEmail.match(validRegex)) {
        if (users.value.filter((u) => u.userName == newUser.userName).length) {
          alert('userName is duplicate, Please input again')
        } else {
          if (
            users.value.filter((u) => u.userEmail == newUser.userEmail).length
          ) {
            {
              alert('userEmail is duplicate, Please input again')
            }
          } else {
            if (newUser.password.length < 8 || newUser.password.length > 14) {
              alert('password must have length between 8-14')
            } else {
              if (newUser.password != newUser.confirmPassword) {
                alert(
                  'password is not match with confirm password, please try again'
                )
              } else {
                const res = await fetch(
                  `${import.meta.env.VITE_SERVER_URL}/api/users`,
                  {
                    method: 'POST',
                    headers: {
                      'content-type': 'application/json',
                    },
                    body: JSON.stringify({
                      userName: newUser.userName,
                      userEmail: newUser.userEmail,
                      password: newUser.password,
                      role: newUser.role,
                    }),
                  }
                )
                if (res.status === 201 || res.status === 200) {
                  let data = await res.json()
                  alert('Created user successfully')
                  router.push({ name: 'userDetail', query: { id: data.id } })
                }
              }
            }
          }
        }
      } else {
        alert('Invalid email address!')
      }
    }
  }
}

onBeforeMount(async () => {
  await getUsers()
})
</script>

<template>
  <div class="bg-cover bg-fixed">
    <UserCreateForm :user="users" @createUser="createUser" />
  </div>
</template>

<style></style>
