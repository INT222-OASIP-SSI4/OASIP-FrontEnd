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
  <div
    class="flex flex-cols mt-5 sm:mx-auto sm:max-w-lg gap-8 mx-10 "
  >
    <CategoryCard
      v-for="(category, index) in categories"
      :key="index"
      :category="category"
    />
  </div>
</template>

<style></style>