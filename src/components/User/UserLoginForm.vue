<script setup>
import { ref, computed } from 'vue'

const emits = defineEmits(['login'])

const email = ref('')
const password = ref('')
const lengthOfWordEmail = ref(0)
const lengthOfWordPassword = ref(0)

const countLengthEmail = () => (lengthOfWordEmail.value = email.value.length)
const countLengthPassword = () =>
  (lengthOfWordPassword.value = password.value.length)

const userLogin = computed(() => ({
  userEmail: email.value.trim(),
  password: password.value,
}))
</script>

<template>
  <div
    class="bg-white rounded-xl shadow-lg w-3/5 flex flex-col justify-center items-center max-w-xl mx-auto p-14 mt-10"
  >
    <form
      class="w-full max-w-xl mx-auto px-5"
      @submit.prevent="$emit('login', userLogin)"
    >
      <h1 class="text-3xl mb-4 font-bold">Login</h1>
      <!-- Email   -->
      <div class="flex flex-wrap -mx-3">
        <div class="w-full px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-email"
          >
            User Email
          </label>
          <input
<<<<<<< HEAD
            class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 "
            id="grid-email" type="text" placeholder="Email" v-model="email" v-on:keyup="countLengthEmail" required />
          <br />
          <div>
            <!-- <p class="text-sm text-right pl-2" :class="
              lengthOfWordEmail <= 50 ? 'text-green-600' : 'text-red-600'
            ">
=======
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
>>>>>>> 790993bdb8688d90ec44d4068ed0949009820f3c
              {{ lengthOfWordEmail }} Characters
            </p> -->
          </div>
        </div>
      </div>
      <!-- Password   -->
      <div class="flex flex-wrap -mx-3 mt-2">
        <div class="w-full px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-password"
          >
            Password
          </label>
          <input
            class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            id="grid-password"
            type="password"
            placeholder="password 8-14 characters"
            v-model="password"
            v-on:keyup="countLengthPassword"
            required
          />
          <br />
          <div>
<<<<<<< HEAD
            <!-- <p class="text-sm text-right pl-2" :class="
              lengthOfWordPassword >= 8 && lengthOfWordPassword <= 14
                ? 'text-green-600'
                : 'text-red-600'
            ">
=======
            <p
              class="text-sm text-right pl-2"
              :class="
                lengthOfWordPassword >= 8 && lengthOfWordPassword <= 14
                  ? 'text-green-600'
                  : 'text-red-600'
              "
            >
>>>>>>> 790993bdb8688d90ec44d4068ed0949009820f3c
              {{ lengthOfWordPassword }} Characters
            </p> -->
          </div>
        </div>
      </div>
      <!-- CreateEventButton  -->
      <button
        class="inline-block bg-color-500 hover:bg-green-700 rounded-lg px-5 py-3 text-sm font-semibold text-white mr-2 mb-2 cursor-pointer mt-3"
        type="submit"
      >
        Login
      </button>
    </form>
  </div>
</template>

<style></style>
