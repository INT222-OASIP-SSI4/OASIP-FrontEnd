<script setup>
const props = defineProps({
  category: {
    type: Object,
    default: {},
  },
});
</script>

<template>
  <div class="w-full shadow-xl rounded-lg mx-auto bg-white mt-5 sm:max-w-xl p-5 ">
    <p class="text-gray-700 font-semibold text-xl mt-8">
      Name: {{ category.eventCategoryName }}
    </p>
    <p class="text-gray-700 text-base">
      Description: {{ category.eventCategoryDescription || "No description" }}
    </p>
    <p class="text-gray-700 text-base">
      Duration: {{ category.eventDuration }}
    </p>
    <router-link :to="`/editcategory?id=${category.id}`">
      <button
        class="bg-color-600 hover:bg-yellow-700 rounded-lg p-2 text-sm font-semibold text-white cursor-pointer mx-auto mt-5">
        Edit Category
      </button>
    </router-link>
  </div>
</template>

<style>

</style>