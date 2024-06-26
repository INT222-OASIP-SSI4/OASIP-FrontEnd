<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { onBeforeMount } from '@vue/runtime-core'
import { renewToken } from '../../utils/index.js'
import ApiService from '../../composables/ApiService'

const route = useRoute()
const router = useRouter()
const category = ref({})
const categories = ref([])
const token = ref(localStorage.getItem('accessToken'))

const categoryName = ref('')
const categoryDescription = ref('')
const eventDuration = ref('')

//length of input
const lengthOfCategoryName = ref(0)
const lengthOfCategoryDesc = ref(0)
const countLengthName = () =>
  (lengthOfCategoryName.value = categoryName.value.trim().length)
const countLengthDesc = () =>
  (lengthOfCategoryDesc.value = categoryDescription.value.length)

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

//get eventCategory by id
const getCategoryById = async () => {
  if (route.query.id) {
    const id = route.query.id
    const res = await ApiService.getCategoryById(id)

    if (res.status === 200) {
      const data = await res.data
      category.value = data
      categoryName.value = category.value.eventCategoryName
      categoryDescription.value = category.value.eventCategoryDescription
      eventDuration.value = category.value.eventDuration
    } else if (res.status === 401) {
      renewToken()
    }
  }
}

//edit eventCategory
const editCategory = async (updatedCategory) => {
  let { id, ...data } = { ...updatedCategory }
  const res = await ApiService.editCategory(
    category.value.id,
    JSON.stringify({ ...data })
  )
  if (res.status === 200) {
    router.push({ name: 'categories', query: { id: category.value.id } })
    console.log('edited successfully')
  } else console.log('error, cannot edited data')
}

//validate Description
const validateDescription = computed(() => {
  if (categoryDescription.value == undefined) {
    categoryDescription.value = ''
  }
  if (categoryDescription.value.length > 500) {
    alert('categoryDescription must have length between 0-500')
    return categoryDescription.value
  } else {
    return categoryDescription.value
  }
})

//validate eventCategoryName
const validateCategoryName = computed(() => {
  if (onlySpaces(categoryName.value)) {
    alert('categoryName is required')
  }
  if (categoryName.value.trim().length < 100) {
    categories.value
      .filter((c) => c.id != category.value.id)
      .forEach((c) => {
        if (c.eventCategoryName == categoryName.value.trim()) {
          alert('categoryName is not unique')
        }
      })
  } else {
    alert('categortyName is must have 1-100')
  }
  return categoryName.value.trim()
})

//validate eventDuration in category
const validateDuration = computed(() => {
  if (eventDuration.value > 480 || eventDuration.value == 0) {
    alert('Description is must have 1-480')
    return eventDuration.value
  } else {
    return eventDuration.value
  }
})

//get update categories
const updateCategory = computed(() => {
  category.value.eventCategoryName = validateCategoryName.value
  category.value.eventCategoryDescription = validateDescription.value
  category.value.eventDuration = validateDuration.value
  return { ...category.value }
})

//back to category page
const goCategory = () => {
  router.push({ name: 'categories' })
}

//check whitespace
function onlySpaces(str) {
  return /^\s*$/.test(str)
}

onBeforeMount(async () => {
  await getCategoryById()
  await getCategories()
})
</script>

<template>
  <div
    class="bg-white rounded-xl shadow-lg w-1/3 flex flex-col justify-center items-center mx-auto px-4 sm:px-6 lg:px-4 py-12 mt-10"
  >
    <form
      class="w-full max-w-xl space-y-2 mt-2"
      @submit.prevent="editCategory(updateCategory)"
    >
      <div>
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="name"
        >
          Category Name:
        </label>

        <input
          class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          id="name"
          v-model="categoryName"
          v-on:keyup="countLengthName"
          placeholder="Name"
          required
        />
        <div>
          <p
            class="text-sm text-right pl-2"
            :class="
              lengthOfCategoryName <= 100 ? 'text-green-600' : 'text-red-600'
            "
          >
            {{ lengthOfCategoryName }} Characters
          </p>
        </div>
      </div>
      <div>
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="description"
          >Description:
        </label>
        <textarea
          rows="4"
          cols="50"
          class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          placeholder="Description"
          id="description"
          v-model="categoryDescription"
          v-on:keyup="countLengthDesc"
        ></textarea>
        <div>
          <p
            class="text-sm text-right pl-2"
            :class="
              lengthOfCategoryDesc <= 500 ? 'text-green-600' : 'text-red-600'
            "
          >
            {{ lengthOfCategoryDesc }} Characters
          </p>
        </div>
      </div>
      <div>
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="duration"
          >Duration:
        </label>

        <input
          class="inline-flex justify-center w-20 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          :class="
            eventDuration > 480 || eventDuration == 0
              ? 'text-red-700'
              : 'text-gray-700'
          "
          id="duration"
          v-model="eventDuration"
          placeholder="Category duration"
          required
        />
      </div>
      <div>
        <button
          class="inline-block bg-color-500 hover:bg-green-700 rounded-lg px-3 py-3 text-sm font-semibold text-white mr-2 mb-2 cursor-pointer mt-8"
          type="submit"
        >
          Update Category
        </button>

        <button
          class="inline-block bg-color-700 hover:bg-red-700 rounded-lg px-3 py-3 text-sm font-semibold text-white mr-2 mb-2 cursor-pointer mt-8"
          @click="goCategory"
        >
          Cancel Update
        </button>
      </div>
    </form>
  </div>
</template>

<style></style>
