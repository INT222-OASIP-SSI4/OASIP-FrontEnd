<script setup>
import { computed, ref } from 'vue';

const emits = defineEmits(['createUser']);
const props = defineProps({
  user: {
    type: Array,
    default: [],
  },
});

const name = ref('');
const email = ref('');
const role = ref('');

const lengthOfWordEmail = ref(0);
const lengthOfWordName = ref(0);


//count length of input
const countLengthEmail = () => lengthOfWordEmail.value = email.value.length;
const countLengthName = () => lengthOfWordName.value = name.value.length;

//get new user
const user = computed(() => ({
  userName: checkLengthName.value,
  userEmail: validateEmail.value,
  role: role.value
}));

//validate email https://www.simplilearn.com/tutorials/javascript-tutorial/email-validation-in-javascript
const validateEmail = computed(() => {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (email.value.length <= 100) {
    if (email.value.match(validRegex)) {
      return email.value;
    } else {
      alert('Invalid email address!');
      return email.value;
    }
  } else {
    alert('bookingEmail must have length 1-100');
    return email.value;
  }
});

//validate Name
const checkLengthName = computed(() => {
  if (name.value.length > 100 || name.value.length < 1) {
    alert('bookingName must have length between 1-100');
  } else {
    return name.value;
  }
});

</script>

<template>
  <div
    class="bg-white rounded-xl shadow-lg w-2/9 flex flex-col justify-center items-center max-w-xl mx-auto p-5 mt-10"
  >
    <form
      class="w-full max-w-xl mx-auto px-5"
      @submit.prevent="$emit('createUser', user)"
    >
      <div class="flex flex-wrap -mx-3 mb-1">
        <!-- Name   -->
        <div class="w-full px-3 mb-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-name"
          >
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
      </div>
      <!-- Email   -->
      <div class="flex flex-wrap -mx-3 mb-3">
        <div class="w-full px-3 mb-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-email"
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
                lengthOfWordEmail <= 100 ? 'text-green-600' : 'text-red-600'
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
                  id="grid-category"
                  required
                >
                  <option value="" disabled selected hidden>
                    Please select category
                  </option>
                  <option>student</option>
                  <option>lecturer</option>
                  <option>admin</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- CreateEventButton  -->
      <button
        class="inline-block bg-green-500 hover:bg-green-700 rounded-full px-3 py-3 text-sm font-semibold text-white mr-2 mb-2 cursor-pointer mt-2"
        type="submit"
      >
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
