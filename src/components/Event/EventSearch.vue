<script setup>
import { ref } from "@vue/reactivity";
defineEmits([
  "setSearchKeyword",
  "setSearchDate",
  "searchByDatePastAndUpcoming",
  "resetFilter"
]);
const keywords = ref("");
const date = ref("");
const dpu = ref("all");

// const checkedDate = ref(false);
</script>

<template>
  <form class="flex justify-center align-middle items-center mt-6 space-x-2">
    
    <input
      type="text"
      id="searchBox"
      v-model="keywords"
      class="inline-flex justify-center w-auto rounded-md border border-gray-300 shadow-sm p-2 bg-white text-sm font-medium text-gray-700"
      placeholder="Input search keywords"
      @input="$emit('setSearchKeyword', keywords)"
    />

    
    <input
      class="inline-flex justify-center w-auto rounded-md border border-gray-300 shadow-sm p-2 bg-white text-sm font-medium text-gray-700"
      id="grid-date"
      type="date"
      v-model="date"
      placeholder="Albuquerque"
      @change="$emit('setSearchDate', date)"
    />
  
    <select
      v-model="dpu"
      class="inline-flex justify-center w-32 rounded-md border border-gray-300 shadow-sm p-2 bg-white text-sm font-medium text-gray-700"
      @change="$emit('searchByDatePastAndUpcoming', dpu)"
    >
      <option value="all">All</option>
      <option value="past">Past</option>
      <option value="upcoming">Upcoming</option>
    </select>
  </form>
</template>