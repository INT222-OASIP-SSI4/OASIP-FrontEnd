<script setup>
import { ref, computed } from 'vue'
import UserList from '../../components/User/UserList.vue'
import { onBeforeMount } from '@vue/runtime-core'
import { renewToken } from '../../utils/index.js'
import ApiService from '../../composables/ApiService'

const users = ref([])
const token = ref(localStorage.getItem('accessToken'))

//get all categories
const getUsers = async () => {
  const res = await ApiService.getUsers()

  if (res.status === 200) {
    users.value = await res.data
  } else if (res.status === 401) {
    renewToken()
  } else {
    console.log('Error, cannot get users data')
  }
}

onBeforeMount(async () => {
  await getUsers()
})
</script>

<template>
  <div
    class="w-full text-center rounded-lg p-100 justify-center items-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-10 font-bold text-4xl md:text-4xl lg:text-5xl font-heading text-color-500"
  >
    <div
      class="bg-blue-600 text-white rounded-xl py-7 shadow-lg w-full px-3 md:mb-0"
    >
      User List
    </div>
  </div>
  <div v-if="users.length != 0">
    <UserList :users="users" />
  </div>
  <div
    class="flex flex-col items-center justify-center mt-10 bg-white p-12 mx-10 rounded-lg"
    v-else
  >
    <h1 class="font-bold">" You don't have permission to see a user. "</h1>
    <router-link :to="{ name: 'createUser' }">
      <br />
      <button
        class="rounded-lg g-transparent hover:bg-blue-600 text-blue-600 font-semibold hover:text-white py-2 px-5 border border-blue-600 hover:border-transparent div class=opacity-50 hover:opacity-100"
      >
        Create User
      </button>
    </router-link>
  </div>
</template>

<style></style>
