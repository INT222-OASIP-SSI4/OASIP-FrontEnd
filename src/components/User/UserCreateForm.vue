<script setup>
import { computed, ref } from 'vue'

const emits = defineEmits(['createUser'])
const props = defineProps({
  user: {
    type: Array,
    default: [],
  },
})

const name = ref('')
const email = ref('')
const roles = ref(['admin', 'lecturer', 'student'])
const role = ref('')
const password = ref('')
const confirmPassword = ref('')

const lengthOfWordEmail = ref(0)
const lengthOfWordName = ref(0)
const lengthOfWordPassword = ref(0)

//count length of input
const countLengthEmail = () => (lengthOfWordEmail.value = email.value.length)
const countLengthName = () => (lengthOfWordName.value = name.value.length)
const countLengthPassword = () =>
  (lengthOfWordPassword.value = password.value.length)

//get new user
const user = computed(() => ({
  userName: name.value.trim(),
  userEmail: email.value.trim(),
  role: role.value,
  password: password.value,
  confirmPassword: confirmPassword.value,
}))

</script>

<template>
  <div
    class="bg-white rounded-xl shadow-lg w-full flex flex-col justify-center items-center max-w-xl mx-auto p-10 bg-cover">
    <form class="w-full max-w-xl mx-auto" @submit.prevent="$emit('createUser', user)">
      <div class="flex flex-wrap -mx-3">

        <!-- Name   -->
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-name">
            User Name
          </label>
          <input
            class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            id="grid-name" type="text" placeholder="Name - Surname" v-model="name" v-on:keyup="countLengthName"
            required />
          <div>
            <p class="text-sm text-right pl-2" :class="
              lengthOfWordName >= 1 || lengthOfWordName <= 100
                ? 'text-green-600'
                : 'text-red-600'
            ">
              {{ lengthOfWordName }} Characters
            </p>
          </div>
        </div>
      </div>
      <!-- Email   -->
      <div class="flex flex-wrap -mx-3">
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-email">
            User Email
          </label>
          <input
            class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            id="grid-email" type="text" placeholder="Email" v-model="email" v-on:keyup="countLengthEmail" required />
          <br />
          <div>
            <p class="text-sm text-right pl-2" :class="
              lengthOfWordEmail <= 50 ? 'text-green-600' : 'text-red-600'
            ">
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
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-role">
                role
              </label>
              <div class="relative">
                <select
                  class="inline-flex justify-center w-48 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                  v-model="role" id="grid-role" required>
                  <option value="" disabled selected hidden>
                    Please select role
                  </option>
                  <option v-for="(selectrole, index) in roles" :value="selectrole" :key="index">
                    {{ selectrole }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Password   -->
      <div class="flex flex-wrap -mx-3 mt-10">
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
            Password
          </label>
          <input
            class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            id="grid-password" type="password" placeholder="password 8-14 characters" v-model="password"
            v-on:keyup="countLengthPassword" required />
          <br />
          <div>
            <p class="text-sm text-right pl-2" :class="
              lengthOfWordPassword >= 8 && lengthOfWordPassword <= 14
                ? 'text-green-600'
                : 'text-red-600'
            ">
              {{ lengthOfWordPassword }} Characters
            </p>
          </div>
        </div>
      </div>
      <!-- Confirm Password   -->
      <div class="flex flex-wrap -mx-3 mb-3">
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-confirm">
            Confirm Password
          </label>
          <input
            class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            id="grid-confirm" type="password" placeholder="password 8-14 characters" v-model="confirmPassword"
            required />
          <br />
        </div>
      </div>
      <!-- CreateEventButton  -->
      <button
        class="inline-block bg-color-500 hover:bg-green-700 rounded-lg px-3 py-3 text-sm font-semibold text-white mr-2 mb-2 cursor-pointer mt-3"
        type="submit">
        Create User
      </button>
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
