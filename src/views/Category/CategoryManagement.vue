<script setup>
import { ref, computed } from 'vue'
import CategoryList from '../../components/Category/CategoryList.vue'
import { onBeforeMount } from '@vue/runtime-core'
import { renewToken } from '../../utils/index.js'
import ApiService from '../../composables/ApiService';

const categories = ref([])
const token = ref(localStorage.getItem('accessToken'))

//get all categories
const getCategories = async () => {
  const res = await ApiService.getCategories()

  if (res.status === 200) {
    categories.value = await res.data
  } else if (res.status === 401) {
    renewToken()
  } else {
    console.log('Error, cannot get categories data')
  }
}

onBeforeMount(async () => {
  await getCategories()
})
</script>

<template>
  <div>
    <div
      class="w-full text-center rounded-lg p-100 justify-center items-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-10 font-bold text-4xl md:text-4xl lg:text-5xl font-heading text-blue-600">
      <div class="bg-blue-600 text-white rounded-xl p-7 shadow-lg w-full px-3 md:mb-0">
        Category List
      </div>
    </div>
    <div>
      <CategoryList :categories="categories" />
    </div>

  </div>
</template>

<style>

</style>
