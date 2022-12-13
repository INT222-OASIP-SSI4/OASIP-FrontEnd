<script setup>
import { ref, computed } from 'vue'
import CategoryList from '../../components/Category/CategoryList.vue'
import { onBeforeMount } from '@vue/runtime-core'
import { renewToken } from '../../utils/index.js'

const categories = ref([])
const token = ref(localStorage.getItem('accessToken'))

//get all categories
const getCategories = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/api/eventcategories`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    }
  )
  if (res.status === 200) {
    categories.value = await res.json()
    console.log(categories.value)
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
      <div class="bg-white rounded-xl p-7 shadow-lg w-full px-3 md:mb-0">
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
