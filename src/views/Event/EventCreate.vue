<script setup>
import EventCreateForm from '../../components/Event/EventCreateForm.vue';
import {ref} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { onBeforeMount } from '@vue/runtime-core';

const route = useRoute();
const router = useRouter();
const events = ref([]);
const categories = ref([]);
const token = ref(localStorage.getItem('token'))

//get all events
const getEvents = async () => {
  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/events`, {
    method: 'GET',
    headers: {
      "Authorization": token.value,
    },
  });
  if (res.status === 200) {
    let data = await res.json();
    events.value = data;
  } else {
    console.log("error, cannot get data");
  }
};

//create new event
const createEvent = async (newEvent) => {
  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/events`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      "Authorization": token.value
    },
    body: JSON.stringify(newEvent),
  })
  if (res.status === 201) {
    let data = await res.json();
    alert('Created event successfully');
    router.push({ name: 'eventDetail', query: {id: data.id}});
  }
}

//get all categories
const getCategories = async () => {
  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/eventcategories`, {
    method: 'GET',
    headers: {
      "Authorization": token.value,
    },
  });
  if (res.status === 200) {
    categories.value = await res.json();
  } else {
    console.log('Error, cannot get categories data');
  }
};

onBeforeMount(async () => {
  await getEvents();
  await getCategories();
});

</script>

<template>
  <div class="bg-cover bg-fixed">
    <EventCreateForm :categories="categories" :event="events" @createEvent="createEvent" />
  </div>
</template>

<style></style>
