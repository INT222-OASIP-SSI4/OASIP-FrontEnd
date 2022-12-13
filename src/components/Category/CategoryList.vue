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
  <div class="grid grid-cols-3 justify-center">
    <CategoryCard v-for="(category, index) in categories" :key="index" :category="category" />
  </div>
</template>

<style>

</style>