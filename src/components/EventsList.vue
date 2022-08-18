<script setup>
import EventCard from "./EventCard.vue";

const props = defineProps({
  events: {
    type: Array,
    default: [],
  },
});
function formatDate(date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join("/");

}
function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}
const options = {
  hour: "2-digit",
  minute: "2-digit",
};
</script>

<template>
  <div class="overflow-x-auto relative sm:rounded-lg text-left text-black w-full p-5 ">
    <table class="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 p-3 w-full ">
      <thead>
        <th>Name</th>
        <th>Category</th>
        <th>Date</th>
        <th>Time</th>
        <th>Duration</th>
      </thead>
      <tbody>
        <tr v-for="(event, index) in events" :key="index" class="bg-white text-sm border-b px-3 py-3 w-1/3 hover:bg-gray-100 ">
          <th scope="row">{{ event.bookingName }}</th>
          <th>{{ event.eventCategory.eventCategoryName }}</th>
          <th>{{ formatDate(new Date(event.eventStartTime)) }}</th>
          <th>{{
              new Date(event.eventStartTime).toLocaleTimeString("en-US", options)
          }}</th>
          <th class="px-3 py-3">{{ event.eventDuration }}</th>
          <th>
            <router-link :to="`/detail?id=${event.id}`"> <svg width="1em" height="1em" viewBox="0 0 16 16">
                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                  <circle cx="8" cy="2.5" r=".75"></circle>
                  <circle cx="8" cy="8" r=".75"></circle>
                  <circle cx="8" cy="13.5" r=".75"></circle>
                </g>
              </svg>
            </router-link>
          </th>
        </tr>
      </tbody>
    </table>

    <!-- <EventCard /> -->

  </div>

</template>

<style>
</style>
