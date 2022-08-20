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
  <div class="rounded-xl grid gap-x-8 gap-y-4 grid-cols-3 w-full bg-white p-10">
    <EventCard v-for="(event, index) in events" :key="index" :event="event" />
  </div>
</template>

<style></style>
