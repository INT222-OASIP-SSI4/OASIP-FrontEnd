<script setup>
import { onBeforeMount, onBeforeUpdate, onUpdated, ref } from 'vue';
import { useLoginStore } from '../stores/checkLogin'

const accessToken = ref(localStorage.getItem('accessToken'))
const storeLogin = useLoginStore()

const status = ref(false)

const isLogin = () => {
  if(!accessToken.value){
    status.value = false
  }else{
    status.value = true
  }
}

onBeforeMount(()=>{
  isLogin()
})

</script>

<template>
  <nav
    class="bg-color-100 drop-shadow-lg border-gray-200 px-2 sm:px-4 py-2.5 opacity-80 sticky w-full top-0 left-0 border-b"
  >
    <div class="container flex flex-wrap justify-between items-center mx-auto">
      <div class="flex items-center">
        <router-link :to="{ name: 'home' }">
          <img src="/images/logo.png" class="mr-4 h-9 sm:h-12" />
        </router-link>
        <router-link :to="{ name: 'home' }">
          <span
            class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
            >Clinic4U</span
          >
        </router-link>
      </div>
      <div class="flex md:order-2">
        <button
          data-collapse-toggle="mobile-menu"
          type="button"
          class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="mobile-menu"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <!-- dropdown menu -->
      <div class="hidden w-full md:block md:w-auto" id="mobile-menu">
        <ul
          class="flex flex-col mt-4 md:flex-row md:space-x-10 md:mt-0 md:text-sm md:font-medium"
        >
          <li>
            <router-link :to="{ name: 'home' }">
              <a
                class="block py-2 pr-4 pl-3 text-black border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-orange-500 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                aria-current="page"
              >
                <span class="text-end"><b>HOME</b></span>
              </a>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'categories' }">
              <a
                class="block py-2 pr-4 pl-3 text-black border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-orange-600 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                <span><b>CATEGORIES</b></span>
              </a>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'createEvent' }">
              <a
                class="block py-2 pr-4 pl-3 text-black border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-orange-600 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                <span><b>CREATE EVENT</b></span>
              </a>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'users' }">
              <a
                class="block py-2 pr-4 pl-3 text-black border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-orange-600 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                <span><b>USER</b></span>
              </a>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'createUser' }">
              <a
                class="block py-2 pr-4 pl-3 text-black border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-orange-600 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                <span><b>CREATE USER</b></span>
              </a>
            </router-link>
          </li>

          <li>
            <router-link :to="{ name: 'aboutus' }">
              <a
                class="block py-2 pr-4 pl-3 text-black border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-orange-600 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                <span><b>ABOUT US</b></span>
              </a>
            </router-link>
          </li>

          <!-- <li v-if="!accessToken">
            <router-link :to="{ name: 'login' }">
              <a
                class="block py-2 pr-4 pl-3 text-black border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-orange-600 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                <span><b>LOGIN</b></span>
              </a>
            </router-link>
          </li>

          <li v-else>
            <button
              @click="deleteToken"
              class="block py-2 pr-4 pl-3 text-black border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-orange-600 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            >
              <span><b>LOGOUT</b></span>
            </button>
          </li> -->

          <li v-if="!status">
            <router-link :to="{ name: 'login' }">
              <button
                class="block py-2 pr-4 pl-3 text-black border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-orange-600 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                <span
                  ><b>{{ storeLogin.loginOrLogout }}</b></span
                >
              </button>
            </router-link>
          </li>
          <li v-else>
            <button
              @click="storeLogin.logout"
              class="block py-2 pr-4 pl-3 text-black border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-orange-600 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            >
              <span><b>{{storeLogin.loginOrLogout}}</b></span>
            </button>
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
