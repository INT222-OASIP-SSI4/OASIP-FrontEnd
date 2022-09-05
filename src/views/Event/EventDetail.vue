<script setup>
import { onBeforeMount } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'

const route = useRoute()
const router = useRouter()
const event = ref({})
const token = ref(localStorage.getItem('token'))

let currentDate = ref('')
let localDate = ref('')
let localTime = ref('')

// get event by id
const getEvent = async () => {
  if (route.query.id) {
    const id = route.query.id
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/events/${id}`,
      {
        method: 'GET',
        headers: {
          "Authorization": token.value,
        },
      }
    )
    if (res.status === 200) {
      const data = await res.json()
      event.value = data
      currentDate.value = new Date(event.value.eventStartTime)
      localDate.value = formatDate(currentDate.value)
      localTime.value = currentDate.value.toLocaleTimeString('en-US', options)
    }
  } else goHome
}

//delete event
const cancelEvent = async () => {
  if (confirm(`Do you want to cancel ${event.value.bookingName}'s event`)) {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/events/${event.value.id}`,
      {
        method: 'DELETE',
        headers: {
          "Authorization": token.value,
        },
      }
    )
    if (res.status === 200) {
      alert(`Cancel this event successfully`)
      goHome()
    } else console.log(`Error, can't delete this event`)
  }
}

//back to home page
const goHome = () => {
  router.push({ name: 'home' })
}

//change time
const options = {
  hour: '2-digit',
  minute: '2-digit',
}

//format Date function
function padTo2Digits(num) {
  return num.toString().padStart(2, '0')
}

function formatDate(date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join('/')
}

onBeforeMount(async () => {
  await getEvent()
})
</script>

<template>
  <div
    class="w-full rounded-lg p-100 max-w-4xl mx-auto px-4 sm:px-6 lg:px-4 py-12"
  >
    <figure class="md:flex bg-white rounded-xl p-8 md:p-0 shadow-lg">
      <img
        class="w-96 h-96 max-h-full rounded-lg justify-left bg-gray-400 m-7"
        src="/images/business-man.png"
        alt=""
      />
      <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
        <blockquote>
          <h1
            class="text-center font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-blue-600"
          >
            Booking Detail !
          </h1>
          <p class="pt-1 text-gray-700 font-semibold text-xl mt-8">
            Name: {{ event.bookingName }}
          </p>
          <p class="text-gray-700 text-base">Email: {{ event.bookingEmail }}</p>

          <div class="text-gray-700 text-base">Date: {{ localDate }}</div>

          <p class="text-gray-700 text-base">
            Category: {{ event.eventCategory?.eventCategoryName }}
          </p>
          <p class="text-gray-700 text-base">Time : {{ localTime }}</p>

          <p class="text-gray-700 text-base">
            Duration: {{ event.eventDuration }} minutes
          </p>
          <p class="text-gray-700 text-base">
            Notes: {{ event.eventNotes || 'No Note' }}
          </p>
        </blockquote>
        <figcaption>
          <button
            @click="goHome"
            class="inline-block bg-green-500 hover:bg-green-700 rounded-full px-3 py-3 text-sm font-semibold text-white mr-2 mb-2 cursor-pointer mt-8"
          >
            Back To Home
          </button>

          <router-link :to="`/edit?id=${event.id}`">
            <button
              class="inline-block bg-yellow-500 hover:bg-yellow-700 rounded-full p-3 text-sm font-semibold text-white mr-2 mb-2 cursor-pointer mt-8"
            >
              Edit Event
            </button>
          </router-link>
          <button
            class="inline-block bg-red-500 hover:bg-red-700 rounded-full p-3 text-sm font-semibold text-white mr-2 mb-2 cursor-pointer mt-8"
            @click="cancelEvent"
          >
            Cancel Event
          </button>
        </figcaption>
      </div>
    </figure>
  </div>
</template>

<style></style>
