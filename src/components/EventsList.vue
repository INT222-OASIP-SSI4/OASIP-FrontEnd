<script setup>
import EventCard from "./EventCard.vue";
const props = defineProps({
  events: {
    type: Array,
    default: [],
  },
});
</script>

<template>
  <div class="overflow-x-auto relative sm:rounded-lg text-left text-black w-full p-5 space-y-2">
    <thead class="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr class="bg-white border-gray-700 dark:bg-gray-800 dark:border-gray-700">
        <th scope="col" class="px-6 py-3 w-1/12">Name</th>
        <th scope="col" class="px-6 py-3 w-1/12">Category</th>
        <th scope="col" class="px-6 py-3 w-1/12">Date</th>
        <th scope="col" class="px-6 py-3 w-1/12">Time</th>
        <th scope="col" class="px-6 py-3 w-1/12">Duration</th>
      </tr>
    </thead>
    <EventCard v-for="(event, index) in events" :key="index" :event="event" />

  </div>

</template>

<style>
</style>
