<script setup>
const emits = defineEmits(['setCategoryIndex']);
const props = defineProps({
  categories: {
    type: Array,
    default: [],
  },
  activeIndex: {
    type: Number,
    default: -1,
  },
});
</script>

<template>
  <div class="flex flex-auto flex-wrap justify-center align-middle items-center mt-4">
    <button
      type="button"
      class="hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-1 focus:ring-blue-100 font-medium rounded-full text-sm px-6 py-2 text-center mr-2 mb-2 capitalize"
      @click="$emit('setCategoryIndex', -1)"
      :class="{ 'bg-blue-500 text-white': activeIndex === -1 }"
    >
      All
    </button>
    <div v-for="(category, index) in categories" :key="index">
      <button
        type="button"
        class="hover:bg-blue-600  hover:text-white focus:outline-none focus:ring-1 focus:ring-blue-100 font-medium rounded-full text-sm px-6 py-2 text-center mr-2 mb-2 capitalize"
        @click="$emit('setCategoryIndex', index)"
        :class="{ 'bg-blue-500 text-white': activeIndex === index }"
      >
        {{ category.eventCategoryName }}
      </button>
    </div>
  </div>
</template>
