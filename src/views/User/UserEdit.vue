<script setup>
import { onBeforeMount } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
import { ref, computed } from 'vue'

const route = useRoute()
const router = useRouter()
const user = ref({})
const users = ref([])

const name = ref('')
const email = ref('')
const role = ref('')

//get all users
const getUsers = async () => {
  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users`)
  if (res.status === 200) {
    let data = await res.json()
    users.value = data
  } else {
    console.log('error, cannot get data')
  }
}

// get user
const getUser = async () => {
  if (route.query.id) {
    const id = route.query.id
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/users/${id}`
    )
    if (res.status === 200) {
      const data = await res.json()
      user.value = data
      name.value = user.value.userName
      email.value = user.value.userEmail
      role.value = role.value.role
    }
  } else goUserDetail
}

//edit user
const editUser = async (updateUser) => {
  let { id, ...data } = { ...updateUser }
  const res = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/api/users/${user.value.id}`,
    {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
      }),
    }
  )
  if (res.status === 200) {
    router.push({ name: 'userDetail', query: { id: user.value.id } })
    console.log('edited successfully')
  } else console.log('error, cannot edited data')
}

//go to detail page
const goUserDetail = () => {
  router.push({ name: 'userDetail' })
}

//get edit Event
const updateUser = computed(() => {
  user.value.userName = name.value
  user.value.userEmail = email.value
  user.value.role = role.value
  return { ...user.value }
})

onBeforeMount(async () => {
  await getUser()
  await getUsers()
})
</script>
<template>
  <div
    class="bg-white rounded-xl shadow-lg w-2/5 p-100 flex flex-col justify-center items-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12 mt-10"
  >
    <form
      class="w-full max-w-xl space-y-2 mt-2"
      @submit.prevent="editUser(updateUser)"
    >
      <div>
        <div class="px-2">
          <div class="flex -mx-2">
            <div class="w-3/3 px-2 mr-7">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-date"
              >
                <br />
                User Name
              </label>
              <input
                class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                id="grid-name"
                type="text"
                placeholder="Name - Surname"
                v-model="name"
                required
              />
            </div>
            <div class="w-1/3 px-2">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-4"
                for="grid-time"
              >
                User Email
              </label>
              <input
                class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                id="grid-email"
                type="text"
                placeholder="Email"
                v-model="email"
                required
              />
            </div>
          </div>
          <!-- role   -->
          <div class="px-2 mb-3">
            <div class="flex -mx-2">
              <div class="w-1/3">
                <div class="h-12">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-category"
                  >
                    role
                  </label>
                  <div class="relative">
                    <select
                      class="inline-flex justify-center w-48 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                      v-model="role"
                      id="grid-category"
                      required
                    >
                      <option value="" disabled selected hidden>
                        Please select category
                      </option>
                      <option>student</option>
                      <option>lecturer</option>
                      <option>admin</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center">
          <router-link :to="`/userDetail?id=${user.id}`">
            <button
              class="inline-block bg-red-500 hover:bg-red-700 rounded-full px-3 py-3 text-sm font-semibold text-white mr-2 mb-2 cursor-pointer mt-8"
            >
              Cancel Edit
            </button>
          </router-link>
          <button
            class="inline-block bg-green-500 hover:bg-green-700 rounded-full px-3 py-3 text-sm font-semibold text-white mr-2 mb-2 cursor-pointer mt-8"
            type="submit"
          >
            Update User
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<style></style>
