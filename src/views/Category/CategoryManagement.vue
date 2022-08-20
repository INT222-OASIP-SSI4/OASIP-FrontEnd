<script setup>
import { ref, computed } from "vue";
import CategoryList from "../../components/Category/CategoryList.vue";
import { onBeforeMount } from "@vue/runtime-core";

const categories = ref([]);

//get all categories
const getCategories = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/api/eventcategories`
  );
  if (res.status === 200) {
    categories.value = await res.json();
    console.log(categories.value);
  } else {
    console.log("Error, cannot get categories data");
  }
};

onBeforeMount(async () => {
  await getCategories();
});
</script>

<template>
  <div>
    <div class="mt-20 text-center items-center justify-center">
      <span
        class="text-center font-bold bg-white text-blue-600 rounded-lg px-3 text-4xl shadow-lg"
        >Category List !</span
      >
    </div>
    <div>
      <div
        class="w-11/12 py-6 mx-auto rounded-lg flex overflow-x-scroll scrollbar-thumb-rounded-full"
      >
        <div class="flex flex-cols my-6">
          <CategoryList :categories="categories" />
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
