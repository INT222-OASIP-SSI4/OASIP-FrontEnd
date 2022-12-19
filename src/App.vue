<script setup>
import NavBar from "./components/NavBar.vue";
</script>

<template>
  <div class="bg-fixed bg-cover flex-no-wrap sm:flex-wrap md:flex-wrap-reverse lg:flex-no-wrap xl:flex-wrap">
    <NavBar />
    <router-view />
  </div>
</template>

<style>

</style>
