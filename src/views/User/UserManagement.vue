<script setup>
import { ref, computed } from 'vue'
import UserList from '../../components/User/UserList.vue'
import { onBeforeMount } from '@vue/runtime-core'

const users = ref([])

//get all categories
const getUsers = async () => {
  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users`)
  if (res.status === 200) {
    users.value = await res.json()
    console.log(users.value)
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
        class="text-center font-bold bg-white text-blue-600 rounded-lg px-3 text-4xl shadow-lg"
        >User List !</span
      >
    </div>
    <div>
      <UserList :users="users" />
    </div>
  </div>
</template>

<style></style>
