<script setup>
const props = defineProps({
  event: {
    type: Object,
    default: {},
  },
});

//set time to 2 digits
const options = {
  hour: "2-digit",
  minute: "2-digit",
};

//set value to 2 digits
function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

//set format date
function formatDate(date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join("/");
}
</script>

<template>

  <table class="overflow-x-auto relative shadow-md sm:rounded-lg text-left text-black select-none">

    <thead>
      <tr
        class="bg-white text-sm border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th scope="row" class="px-6 py-3 w-1/12">{{ event.bookingName }}</th>
        <th scope="row" class="px-3 py-3 w-1/3">{{ event.eventCategory.eventCategoryName }}</th>
        <th scope="row" class="px-3 py-3 w-1/3">{{ formatDate(new Date(event.eventStartTime)) }}</th>
        <th scope="row" class="px-3 py-3 w-1/3">{{
            new Date(event.eventStartTime).toLocaleTimeString("en-US", options)
        }}</th>
        <th scope="col" class="px-3 py-3 w-1/3">{{ event.eventDuration }}</th>
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
    </thead>
  </table>
  <div>
    <!-- <p class="text-gray-700 text-base">
      Name: {{ event.bookingName }}
    </p>

    <div class="text-gray-700 text-base">
      Date: {{ formatDate(new Date(event.eventStartTime)) }}
    </div>

    <p class="text-gray-700 text-base">
      Category: {{ event.eventCategory.eventCategoryName }}
    </p>

    
      <p class="text-gray-700 text-base">Time :
        {{
            new Date(event.eventStartTime).toLocaleTimeString("en-US", options)
        }}</p>


      <p class="text-gray-700 text-base">
        Duration: {{ event.eventDuration }} minutes</p> -->

    <!-- <router-link :to="`/detail?id=${event.id}`">
      <button
        class="inline-block bg-green-500 hover:bg-emerald-500 rounded-full p-3 text-sm font-semibold text-white mr-2 mb-2 cursor-pointer mt-8">
        Show Detail
      </button>
    </router-link> -->
    <!-- <button
      class="inline-block bg-red-500 hover:bg-red-400 rounded-full p-3 text-sm font-semibold text-white mr-2 mb-2 cursor-pointer mt-8"
    >
      Cancel Event
    </button> -->
  </div>

</template>

<style>
</style>
