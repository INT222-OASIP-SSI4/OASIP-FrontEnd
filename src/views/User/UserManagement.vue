<script setup>
import { ref, computed } from 'vue'
import UserList from '../../components/User/UserList.vue'
import { onBeforeMount } from '@vue/runtime-core'

const users = ref([])
const token = ref(localStorage.getItem('token'))
console.log(`Bearer ${token.value}`)

//get all categories
const getUsers = async () => {
  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  })
  if (res.status === 200) {
    users.value = await res.json()
  } else {
    console.log('Error, cannot get users data')
  }
}

onBeforeMount(async () => {
  await getUsers()
})
</script>

<template>
  <div>
    <div class="mt-20 text-center items-center justify-center">
      <span
        class="text-center font-bold bg-white text-blue-600 rounded-lg px-7 py-1 text-4xl shadow-lg"
        >User List !</span
      >
    </div>
    <div v-if="token !== null">
      <div v-if="users.length != 0">
        <UserList :users="users" />
      </div>
      <div
        class="flex flex-col items-center justify-center mt-10 bg-white p-12 mx-10 rounded-lg"
        v-else
      >
        <h1 class="font-bold">" No User "</h1>
        <router-link :to="{ name: 'createUser' }">
          <br />
          <button
            class="rounded-full g-transparent hover:bg-green-400 text-green-500 font-semibold hover:text-white py-2 px-5 border border-green-500 hover:border-transparent div class=opacity-50 hover:opacity-100"
          >
            Create User
          </button>
        </router-link>
      </div>
    </div>
    <div
      class="bg-white rounded-xl p-7 shadow-lg w-full p-100 justify-center items-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 mb-9 mt-10"
      v-else
    >
      <h1 class="text-center font-bold text-lg">Please Login First</h1>
      <div class="flex flex-col items-center justify-center mt-2">
        <router-link :to="{ name: 'createUser' }">
          <button
            class="rounded-full g-transparent hover:bg-green-400 text-green-500 font-semibold hover:text-white py-2 px-5 border border-green-500 hover:border-transparent div class=opacity-50 hover:opacity-100 my-3"
          >
            Create User
          </button>
        </router-link>
        <p>or</p>
        <router-link :to="{ name: 'login' }">
          <button
            class="rounded-full g-transparent hover:bg-green-400 text-green-500 font-semibold hover:text-white py-2 px-5 border border-green-500 hover:border-transparent div class=opacity-50 hover:opacity-100 my-3"
          >
            Login
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style></style>
