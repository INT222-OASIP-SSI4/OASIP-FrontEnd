<script setup>
const props = defineProps({
  category: {
    type: Object,
    default: {},
  },
});
</script>

<template>
  <div
    class="shadow-2xl mb-5 rounded-lg mx-10 px-6 py-12 space-y-2 bg-white min-w-full mt-5 sm:mx-auto sm:max-w-lg"
  >
    <p class="pt-1 text-gray-700 font-semibold text-xl mt-8">
      Name: {{ category.eventCategoryName }}
    </p>
    <p class="text-gray-700 text-base">
      Description: {{ category.eventCategoryDescription || "No description" }}
    </p>
    <p class="text-gray-700 text-base">
      Duration: {{ category.eventDuration }}
    </p>
    <div>
      <router-link :to="`/editcategory?id=${category.id}`">
        <button
          class="inline-block bg-yellow-500 hover:bg-yellow-700 rounded-full p-2 text-sm font-semibold text-white mr-2 mb-2 cursor-pointer mt-8"
        >
          Edit Category
        </button>
      </router-link>
    </div>
  </div>
</template>

<style></style>