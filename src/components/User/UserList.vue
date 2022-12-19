<script setup>
import 'tw-elements'
const props = defineProps({
  users: {
    type: Array,
    default: [],
  },
})

</script>

<template>

  <div class="w-full rounded-lg p-100 justify-center items-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-4">
    <div class="bg-white rounded-xl p-7 shadow-lg text-left">
      <table>
        <thead class="text-sm font-bold text-gray-700 uppercase bg-gray-50 w-full">
          <th scope="col" class="px-3 py-3 w-1/3">Name</th>
          <th class="px-3 py-3 w-1/3">Email</th>
          <th class="px-3 py-3 w-1/3">Role</th>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="index" class="bg-white text-sm border-b w-1/3 hover:bg-gray-100">
            <td scope="row" class="px-3 py-3 w-1/3">{{ user.userName }}</td>
            <td class="px-3 py-3 w-1/3">{{ user.userEmail }}</td>
            <td class="px-3 py-3 w-1/3">{{ user.role }}</td>
            <td>
              <div class="flex justify-center">
                <button id="dropdownButton" class="dropdown relative" type="button" data-bs-toggle="dropdown"
                  aria-expanded="false">
                  <svg width="1em" height="1em" viewBox="0 0 16 16">
                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                      <circle cx="8" cy="2.5" r=".75"></circle>
                      <circle cx="8" cy="8" r=".75"></circle>
                      <circle cx="8" cy="13.5" r=".75"></circle>
                    </g>
                  </svg>
                </button>
                <ul
                  class="dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none"
                  aria-labelledby="dropdownButton">
                  <li>
                    <router-link :to="`/userDetail?id=${user.id}`">
                      <button
                        class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100 text-left"
                        href="#">
                        Show Detail
                      </button></router-link>
                  </li>
                  <li>
                    <router-link :to="`/editUser?id=${user.id}`">
                      <button
                        class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100 text-left"
                        href="#">
                        Edit User
                      </button>
                    </router-link>
                  </li>
                </ul>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<style>

</style>
