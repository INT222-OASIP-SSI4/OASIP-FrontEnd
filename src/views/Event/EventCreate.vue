<script setup>
import EventCreateForm from '../../components/Event/EventCreateForm.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { onBeforeMount } from '@vue/runtime-core'
import { parseJwt } from '../../utils';

const router = useRouter()
const events = ref([])
const categories = ref([])
const token = ref(localStorage.getItem('accessToken'))

//get all events
const getEvents = async () => {
  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/events`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token.value}`,
    }
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
  }else if(res.status === 403){
    alert(`Lecturer can't create event`)
  }
}

//get all categories
const getCategories = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/api/eventcategories`,
    {
      method: 'GET',
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
    <div class="bg-cover bg-fixed">
      <EventCreateForm
        :categories="categories"
        :event="events"
        @createEvent="createEvent"
      />
    </div>
  </div>
</template>

<style></style>
