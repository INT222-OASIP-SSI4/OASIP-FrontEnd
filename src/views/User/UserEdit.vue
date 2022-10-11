<script setup>
import { onBeforeMount } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import { renewToken } from '../../utils/index.js'

const route = useRoute()
const router = useRouter()
const user = ref({})
const users = ref([])
const allName = ref([])
const token = ref(localStorage.getItem('accessToken'))

const name = ref('')
const email = ref('')
const roles = ref(['admin', 'lecturer', 'student'])
const userId = ref('')
const role = ref('')

const lengthOfWordEmail = ref(0)
const lengthOfWordName = ref(0)

//count length of input
const countLengthEmail = () => (lengthOfWordEmail.value = email.value.length)
const countLengthName = () => (lengthOfWordName.value = name.value.length)

//get all users
const getUsers = async () => {
  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  })
  if (res.status === 200) {
    let data = await res.json()
    users.value = data
    allName.value = users.value.userName
  } else if (res.status === 401) {
    renewToken()
  } else {
    console.log('error, cannot get data')
  }
}

// get user
const getUser = async () => {
  if (route.query.id) {
    const id = route.query.id
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/users/${id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    )
    if (res.status === 200) {
      const data = await res.json()
      user.value = data
      userId.value = user.value.id
      name.value = user.value.userName
      email.value = user.value.userEmail
      role.value = user.value.role
    }
  } else if (res.status === 401) {
    renewToken()
  } else goUserList()
}

//edit user
const editUser = async () => {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  console.log(updateUser.value)
  console.log(name.value)
  console.log(email.value)
  console.log(role.value)
  if (
    updateUser.value.userName == user.value.userName &&
    updateUser.value.userEmail == user.value.userEmail &&
    updateUser.value.role == user.value.role
  ) {
    goUserList()
  } else {
    if (updateUser.value.userName.length > 100) {
      alert('userName must have length 1-100')
    } else {
      if (updateUser.value.userEmail.length > 50) {
        alert('userEmail must have length 1-50')
      } else {
        if (updateUser.value.userEmail.match(validRegex)) {
          if (
            users.value
              .filter((u) => u.id != updateUser.value.id)
              .filter((u) => u.userName == updateUser.value.userName).length
          ) {
            alert('userName is duplicate, Please input again')
          } else {
            if (
              users.value
                .filter((u) => u.id != updateUser.value.id)
                .filter((u) => u.userEmail == updateUser.value.userEmail).length
            ) {
              alert('userEmail is duplicate, Please input again')
            } else {
              let { id, ...data } = { ...updateUser.value }
              const res = await fetch(
                `${import.meta.env.VITE_SERVER_URL}/api/users/${user.value.id}`,
                {
                  method: 'PUT',
                  headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${token.value}`,
                  },
                  body: JSON.stringify({
                    ...data,
                  }),
                }
              )
              if (res.status === 200) {
                router.push({
                  name: 'userDetail',
                  query: { id: user.value.id },
                })
                console.log('edited successfully')
              } else console.log('error, cannot edited data')
            }
          }
        } else {
          alert('Invalid email address!')
        }
      }
    }
  }
}

//go to detail page
const goUserList = () => {
  router.push({ name: 'users' })
}

//get edit Event
const updateUser = computed(() => ({
  id: userId.value,
  userName: name.value.trim(),
  userEmail: email.value.trim(),
  role: role.value,
}))

onBeforeMount(async () => {
  await getUser()
  await getUsers()
})
</script>
<template>
  <div
    class="bg-white rounded-xl shadow-lg w-2/5 p-100 flex flex-col justify-center items-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12 mt-10"
  >
    <form class="w-full max-w-xl space-y-2 mt-2" @submit.prevent="editUser">
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
                v-on:keyup="countLengthName"
                required
              />
              <div>
                <p
                  class="text-sm text-right pl-2"
                  :class="
                    lengthOfWordName <= 100 ? 'text-green-600' : 'text-red-600'
                  "
                >
                  {{ lengthOfWordName }} Characters
                </p>
              </div>
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
                v-on:keyup="countLengthEmail"
                required
              />
              <br />
              <div>
                <p
                  class="text-sm text-right pl-2"
                  :class="
                    lengthOfWordEmail <= 50 ? 'text-green-600' : 'text-red-600'
                  "
                >
                  {{ lengthOfWordEmail }} Characters
                </p>
              </div>
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
                      id="grid-role"
                      required
                    >
                      <option value="" disabled selected hidden>
                        Please select category
                      </option>
                      <option
                        v-for="(selectrole, index) in roles"
                        :value="selectrole"
                        :key="index"
                      >
                        {{ selectrole }}
                      </option>
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

<style>
.redText {
  color: red;
}
.greenText {
  color: greenyellow;
}
</style>
