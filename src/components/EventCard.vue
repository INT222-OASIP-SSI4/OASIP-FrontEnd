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
  <div class="p-2 bg-white rounded-xl shadow-xl">
  
    <p class="pt-1 text-gray-700 font-semibold text-xl">
      Name: {{ event.bookingName }}
    </p>

    <div class="text-gray-700 text-base">
      Date: {{ formatDate(new Date(event.eventStartTime)) }}
    </div>

    <p class="text-gray-700 text-base">
      Category: {{ event.eventCategory.eventCategoryName }}
    </p>

    <div class="mb-2 mt-2">
      <span
        class="inline bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700 rounded-xl"
        >Time :
        {{
          new Date(event.eventStartTime).toLocaleTimeString("en-US", options)
        }}</span
      >
    </div>
    <div>
      <span
        class="inline bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700 rounded-xl"
      >
        Duration: {{ event.eventDuration }} minutes</span
      >
    </div>
    <router-link :to="`/detail?id=${event.id}`">
      <button
        class="inline-block bg-green-500 hover:bg-emerald-500 rounded-full p-3 text-sm font-semibold text-white mr-2 mb-2 cursor-pointer mt-8"
      >
        Show Detail
      </button></router-link
    >
    <!-- <button
      class="inline-block bg-red-500 hover:bg-red-400 rounded-full p-3 text-sm font-semibold text-white mr-2 mb-2 cursor-pointer mt-8"
    >
      Cancel Event
    </button> -->
  </div>
</template>

<style></style>
