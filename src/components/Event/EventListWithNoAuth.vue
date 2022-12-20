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
        <th>Category</th>
        <th>Date</th>
        <th>Time</th>
        <th>Duration</th>
      </thead>
      <tbody>
        <tr v-for="(event, index) in events" :key="index"
          class="bg-white text-sm border-b px-3 py-3 w-1/3 hover:bg-gray-100">
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
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>

</style>
