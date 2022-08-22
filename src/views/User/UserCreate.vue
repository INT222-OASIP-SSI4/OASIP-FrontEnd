<script setup>
import UserCreateForm from '../../components/User/UserCreateForm.vue';
import {ref} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { onBeforeMount } from '@vue/runtime-core';

const route = useRoute();
const router = useRouter();
const users = ref([]);

//get all users
const getUsers = async () => {
  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users`);
  if (res.status === 200) {
    let data = await res.json();
    users.value = data;
  } else {
    console.log("error, cannot get data");
  }
};

//create new user
const createUser = async (newUser) => {
  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(newUser),
  })
  if (res.status === 201) {
    let data = await res.json();
    alert('Created user successfully');
    router.push({ name: 'userDetail', query: {id: data.id}});
  }
}


onBeforeMount(async () => {
  await getUsers();
});

</script>

<template>
  <div class="bg-cover bg-fixed">
    <UserCreateForm :user="users" @createUser="createUser" />
  </div>
</template>

<style></style>
