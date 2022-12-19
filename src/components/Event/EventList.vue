<script setup>
import 'tw-elements'

const props = defineProps({
  events: {
    type: Array,
    default: [],
  },
})
function formatDate(date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join('/')
}
function padTo2Digits(num) {
  return num.toString().padStart(2, '0')
}
const options = {
  hour: '2-digit',
  minute: '2-digit',
}
</script>

<template>
  <div class="relative sm:rounded-lg text-left text-black w-full p-2">
    <table class="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 w-full">
      <thead>
        <th>Name</th>
        <th>Category</th>
        <th>Date</th>
        <th>Time</th>
        <th>Duration</th>
      </thead>
      <tbody>
        <tr v-for="(event, index) in events" :key="index"
          class="bg-white text-sm border-b px-3 py-3 w-1/3 hover:bg-gray-100">
          <td scope="row">{{ event.bookingName }}</td>
          <td>{{ event.eventCategory.eventCategoryName }}</td>
          <td>{{ formatDate(new Date(event.eventStartTime)) }}</td>
          <td>
            {{
                new Date(event.eventStartTime).toLocaleTimeString(
                  'en-US',
                  options
                )
            }}
          </td>
          <td class="px-3 py-3">{{ event.eventDuration }}</td>
          <td>
            <div class="flex justify-center">
              <button id="dropdownButton" class="dropdown relative" type="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                <svg width="1em" height="1em" viewBox="0 0 16 16">
                  <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                    <circle cx="8" cy="2.5" r=".75"></circle>
                    <circle cx="8" cy="8" r=".75"></circle>
                    <circle cx="8" cy="13.5" r=".75"></circle>
                  </g>
                </svg>
              </button>
              <ul
                class="dropdown-menu min-w-max absolute bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none"
                aria-labelledby="dropdownButton">
                <li>
                  <router-link :to="`/detail?id=${event.id}`">
                    <button
                      class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100 text-left"
                      href="#">
                      Show Detail
                    </button></router-link>
                </li>
                <li>
                  <router-link :to="`/edit?id=${event.id}`">
                    <button
                      class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100 text-left"
                      href="#">Edit Event</button>
                  </router-link>
                </li>
              </ul>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>

</style>
