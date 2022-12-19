<script setup>
import { onBeforeMount, onBeforeUpdate, onUpdated, ref } from 'vue'
import { useLoginStore } from '../stores/checkLogin'
import { parseJwt } from '../utils'
import 'flowbite'

const props = defineProps({
  users: {
    type: Array,
    default: [],
  },
})

const accessToken = ref(localStorage.getItem('accessToken'))
const storeLogin = useLoginStore()

const status = ref(false)

const isLogin = () => {
  if (!accessToken.value) {
    status.value = false
  } else {
    status.value = true
  }
}

onBeforeMount(() => {
  isLogin()
})

const userRole = parseJwt(accessToken).Roles
const strRole = () => {
  const role = userRole.substring(5)
  return role
}
console.log(strRole())
</script>

<template>
  <nav class="sticky w-full top-0 left-0 bg-color-900 shadow-lg to-transparent">
    <div class="container flex flex-wrap items-center justify-between mx-auto max-w-screen-xl px-6 md:px-6 py-2.5">
      <router-link :to="{ name: 'home' }" class="flex items-center h-12 mr-3">
        <img src="/images/logo.png" class="h-12 mr-3 sm:h-9" />
      </router-link>
      <button data-collapse-toggle="mobile-menu-2" type="button"
        class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="mobile-menu-2" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"></path>
        </svg>
      </button>
      <div class="flex items-center md:order-2">

        <img src="/images/business-man.png" class="w-8 h-8 rounded-full" />
        <span
          class="flex justify-between items-center py-2 pr-4 pl-3 w-full text-gray-700 md:p-0 md:w-auto dark:text-gray-400 dark:hover:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent font-bold">
          Role: {{ strRole()
          }}</span>
        <ul class="flex flex-col mt-4 md:flex-row md:space-x-10 md:mt-0 md:text-sm md:font-medium">
          <li v-if="!status">
            <router-link :to="{ name: 'login' }">
              <button
                class="flex justify-between items-center py-2 pr-4 pl-3 w-full text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 md:w-auto dark:text-gray-400 dark:hover:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent font-bold">
                <span><b>{{ storeLogin.loginOrLogout }}</b></span>
              </button>
            </router-link>
          </li>
          <li v-else>
            <button @click="storeLogin.logout"
              class="flex justify-between items-center py-2 pr-4 pl-3 w-full text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 md:w-auto dark:text-gray-400 dark:hover:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent font-bold">
              <span><b>{{ storeLogin.loginOrLogout }}</b></span>
            </button>
          </li>
        </ul>
      </div>

      <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
        <ul class="flex flex-col mt-4 md:flex-row md:space-x-10 md:mt-0 md:text-sm md:font-medium">
          <li>
            <router-link :to="{ name: 'home' }">
              <a
                class="flex justify-between items-center py-2 pr-4 pl-3 w-full text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 md:w-auto dark:text-gray-400 dark:hover:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent font-bold">
                <span class="text-end"><b>HOME</b></span>
              </a>
            </router-link>
          </li>
          <button id="UserDropdown" data-dropdown-toggle="User"
            class="flex justify-between items-center py-2 pr-4 pl-3 w-full text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 md:w-auto dark:text-gray-400 dark:hover:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent font-bold">
            USER<svg class="ml-1 w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"></path>
            </svg>
          </button>

          <div id="User" class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
            <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
              <li>
                <router-link :to="{ name: 'users' }">
                  <a class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-500 md:hover:text-blue-600">
                    <span><b>USER LIST</b></span>
                  </a></router-link>
              </li>
              <li>
                <router-link :to="{ name: 'createUser' }">
                  <a class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-500 md:hover:text-blue-600">
                    <span><b>CREATE USER</b></span>
                  </a>
                </router-link>
              </li>
            </ul>
          </div>
          <button id="EventDropdown" data-dropdown-toggle="Event"
            class="flex justify-between items-center py-2 pr-4 pl-3 w-full text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 md:w-auto font-bold">
            EVENT<svg class="ml-1 w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"></path>
            </svg>
          </button>
          <div id="Event" class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
            <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
              <li>
                <router-link :to="{ name: 'home' }">
                  <a class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-500 md:hover:text-blue-600">
                    <span class="text-end"><b>EVENT LIST</b></span>
                  </a>
                </router-link>
              </li>
              <li>
                <router-link :to="{ name: 'createEvent' }">
                  <a class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-500 md:hover:text-blue-600">
                    <span><b>CREATE EVENT</b></span>
                  </a>
                </router-link>
              </li>
              <li>
                <router-link :to="{ name: 'categories' }">
                  <a class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-500 md:hover:text-blue-600">
                    <span><b>CATEGORIES</b></span>
                  </a>
                </router-link>
              </li>
            </ul>
          </div>

          <li>
            <router-link :to="{ name: 'aboutus' }">
              <a
                class="flex justify-between items-center py-2 pr-4 pl-3 w-full text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 md:w-auto dark:text-gray-400 dark:hover:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent font-bold">
                <span><b>ABOUT US</b></span>
              </a>
            </router-link>
          </li>

        </ul>
      </div>
    </div>
  </nav>
</template>

<style>
.st0 {
  display: none;
}

.st1 {
  display: inline;
}

.st2 {
  fill: #0000ff;
}

.st3 {
  fill: #d4145a;
}

.st4 {
  fill: #ffffff;
}

.st5 {
  opacity: 0.2;
}

.st6 {
  fill: #38a3a5;
}

.st7 {
  fill: #57cc99;
}

.st8 {
  fill: #22577a;
}

.st9 {
  display: inline;
  fill: #e0c097;
}

.st10 {
  display: inline;
  fill: #ff7878;
}

.st11 {
  display: inline;
  fill: #d83a56;
}
</style>