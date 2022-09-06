<script setup>
import EventCreateForm from '../../components/Event/EventCreateForm.vue'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { onBeforeMount } from '@vue/runtime-core'

const route = useRoute()
const router = useRouter()
const events = ref([])
const categories = ref([])
const token = ref(localStorage.getItem('token'))

//get all events
const getEvents = async () => {
  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/events`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  })
  if (res.status === 200) {
    let data = await res.json()
    events.value = data
  } else {
    console.log('error, cannot get data')
  }
}

//create new event
const createEvent = async (newEvent) => {
  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/events`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token.value}`,
    },
    body: JSON.stringify(newEvent),
  })
  if (res.status === 201) {
    let data = await res.json()
    alert('Created event successfully')
    router.push({ name: 'eventDetail', query: { id: data.id } })
  }
}

//get all categories
const getCategories = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/api/eventcategories`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    }
  )
  if (res.status === 200) {
    categories.value = await res.json()
  } else {
    console.log('Error, cannot get categories data')
  }
}

onBeforeMount(async () => {
  await getEvents()
  await getCategories()
})
</script>

<template>
  <div>
    <div class="bg-cover bg-fixed" v-if="token !== null">
      <EventCreateForm
        :categories="categories"
        :event="events"
        @createEvent="createEvent"
      />
    </div>
    <div
      class="bg-white rounded-xl p-7 shadow-lg w-full p-100 justify-center items-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 mb-9 mt-8"
      v-else
    >
      <h1 class="text-center font-extrabold text-3xl mb-5 mt-2">
        Create Event
      </h1>
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
