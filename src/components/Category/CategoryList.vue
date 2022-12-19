<script setup>
import CategoryCard from "./CategoryCard.vue";
const props = defineProps({
  categories: {
    type: Array,
    default: [],
  },
});
</script>

<template>
  <div class="relative sm:rounded-lg text-left text-black w-full p-2">
    <table class="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 w-full items-center">
      <thead>
        <th class="px-3 py-3 w-1/3">Name</th>
        <th class="px-3 py-3 w-full">Category</th>
        <th class="px-3 py-3 w-3">Duration</th>

      </thead>
      <tbody>
        <tr v-for="(category, index) in categories" :key="index" :category="category"
          class="bg-white text-sm border-b w-1/3 hover:bg-gray-100">
          <td scope="row" class="px-3 py-3 w-1/3">{{ category.eventCategoryName }}</td>
          <td scope="row" class="px-3 py-3 w-full">{{ category.eventCategoryDescription || "No description" }}</td>
          <td scope="row" class="px-3 py-3 w-3">{{ category.eventDuration }}</td>
          <td class="px-3 py-3 w-1/3">
            <router-link :to="`/editcategory?id=${category.id}`">
              <button
                class="inline-block  rounded-lg p-3 text-sm font-semibold text-gray-700 hover:text-gray-400 cursor-pointer items-center"
                href="#">
                Edit</button></router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>

</style>