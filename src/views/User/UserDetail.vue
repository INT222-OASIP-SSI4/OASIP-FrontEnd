<script setup>
import { onBeforeMount } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";

const route = useRoute();
const router = useRouter();
const user = ref({});


// get user by id
const getUser = async () => {
  if (route.query.id) {
    const id = route.query.id;
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/users/${id}`
    );
    if (res.status === 200) {
      const data = await res.json();
      user.value = data;
    }
  } else goUserList;
};

//delete user
const cancelUser = async () => {
  if (confirm(`Do you want to cancel ${user.value.userName}'s event`)) {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/users/${user.value.id}`,
      {
        method: "DELETE",
      }
    );
    if (res.status === 200) {
      alert(`Cancel this user successfully`);
      goHome();
    } else console.log(`Error, can't delete this user`);
  }
};

//back to home page
const goUserList = () => {
  router.push({ name: "users" });
};

onBeforeMount(async () => {
  await getUser();
});

</script>

<template>
  <div
    class="w-6/12 rounded-lg p-100 max-w-4xl mx-auto px-4 sm:px-6 lg:px-4 py-12"
  >
    <figure class="md:flex bg-white rounded-xl p-8 md:p-0 shadow-lg">
      <img
        class="w-96 h-96 max-h-full rounded-lg justify-left bg-gray-400 mx-4 mt-4"
        src="/images/business-man.png"
        alt=""
      />
      <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
        <blockquote>
          <h1
            class="text-center font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-blue-600"
          >
            User Detail !
          </h1>
          <p class="pt-1 text-gray-700 font-semibold text-xl mt-8">
            User's name: {{ user.userName }}
          </p>
          <p class="text-gray-700 text-base">User's Email: {{ user.userEmail }}</p>

          <p class="text-gray-700 text-base">User's role: {{ user.role }}</p>

          <p class="text-gray-700 text-base">Created on: {{ user.createdOn }}</p>

          <p class="text-gray-700 text-base">Updated on: {{ user.updatedOn }}</p>

        </blockquote>
        <figcaption>
          <button
            @click="goUserList"
            class="inline-block bg-green-500 hover:bg-green-700 rounded-full px-3 py-3 text-sm font-semibold text-white mr-2 mb-2 cursor-pointer mt-8"
          >
            Back To All User Page
          </button>

          <router-link :to="`/editUser?id=${user.id}`">
            <button
              class="inline-block bg-yellow-500 hover:bg-yellow-700 rounded-full p-3 text-sm font-semibold text-white mr-2 mb-2 cursor-pointer mt-8"
            >
              Edit User
            </button>
          </router-link>
          <button
            class="inline-block bg-red-500 hover:bg-red-700 rounded-full p-3 text-sm font-semibold text-white mr-2 mb-2 cursor-pointer mt-8"
            @click="cancelUser"
          >
            Cancel User
          </button>
        </figcaption>
      </div>
    </figure>
  </div>
</template>

<style></style>