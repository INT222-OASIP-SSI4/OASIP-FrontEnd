<script setup>
import { computed, ref } from 'vue'

const emits = defineEmits(['createEvent'])
const props = defineProps({
  categories: {
    type: Array,
    default: [],
  },
  event: {
    type: Array,
    default: [],
  },
})

const name = ref('')
// const email = ref(parseJwt().sub)
const email = ref('')
const note = ref('')
const categoryId = ref('')
const startDate = ref('')
const startTime = ref('')
const file = ref()

const lengthOfWord = ref(0)
const lengthOfWordEmail = ref(0)
const lengthOfWordName = ref(0)

//get eventStartTime by date and time
const getStartTime = computed(() => {
  const date = startDate.value + ' ' + startTime.value
  return new Date(date)
})

//get current Date
// const currentDateTime = computed(() => new Date())

//count length of input
const countLength = () => (lengthOfWord.value = note.value.length)
const countLengthEmail = () => (lengthOfWordEmail.value = email.value.length)
const countLengthName = () => (lengthOfWordName.value = name.value.length)

//get new event
const event = computed(() => ({
  eventStartTime: getStartTime.value,
  bookingName: name.value,
  bookingEmail: email.value,
  eventNotes: note.value,
  eventCategoryId: categoryId.value,
}))

//validate email https://www.simplilearn.com/tutorials/javascript-tutorial/email-validation-in-javascript
// const validateEmail = computed(() => {
//   var validRegex =
//     /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
//   if (email.value.length <= 100) {
//     if (email.value.match(validRegex)) {
//       return email.value
//     } else {
//       alert('Invalid email address!')
//       return email.value
//     }
//   } else {
//     alert('bookingEmail must have length 1-100')
//     return email.value
//   }
// })

//validate eventStartTime (future and overlap)
// const validateEventStartTime = computed(() => {
//   if (getStartTime.value < currentDateTime.value) {
//     alert('Invalid Date! Date must be future')
//   }
//   if (checkOverlap.value) {
//     alert('Invalid Date! Date is overlap')
//   }
//   return getStartTime.value
// })

//check overlap in event
// const checkOverlap = computed(() => {
//   let status = false
//   let b_start = getStartTime.value
//   let b_duration = props.categories.filter((c) => c.id == categoryId.value)[0]
//     .eventDuration
//   let b_end = getEndDate(getStartTime.value, b_duration)
//   props.event
//     .filter(
//       (e) =>
//         e.eventCategory.id == categoryId.value &&
//         e.bookingName != name.value &&
//         getDate(e.eventStartTime) == getDate(getStartTime.value)
//     )
//     .forEach((e) => {
//       let a_start = new Date(e.eventStartTime)
//       let a_end = getEndDate(e.eventStartTime, e.eventDuration)
//       if (dateRangeOverlaps(a_start, a_end, b_start, b_end)) {
//         status = true
//       }
//     })
//   return status
// })

//function check overlap https://stackoverflow.com/questions/22784883/check-if-more-than-two-date-ranges-overlap
// function dateRangeOverlaps(a_start, a_end, b_start, b_end) {
//   if (a_start <= b_start && b_start < a_end) return true // b starts in a
//   if (a_start < b_end && b_end <= a_end) return true // b ends in a
//   if (b_start <= a_start && a_end <= b_end) return true // a in b
//   if (a_start <= b_start && b_end <= a_end) return true // b in a
//   if (b_start <= a_start && b_end > a_start) return true // a starts in b
//   return false
// }

// validate Note
// const checkLengthNote = computed(() => {
//   if (note.value == undefined) {
//     note.value = ''
//   }
//   if (note.value.length > 500) {
//     alert('eventNotes must have length between 0-500')
//   } else {
//     return note.value
//   }
// })

// validate Name
// const checkLengthName = computed(() => {
//   if (name.value.length > 100 || name.value.length < 1) {
//     alert('bookingName must have length between 1-100')
//   } else {
//     return name.value
//   }
// })

//function getDate
// function getDate(date) {
//   return new Date(date).toLocaleDateString()
// }

// function plus minutes with duration
// function getEndDate(date, duration) {
//   let dateFormat = new Date(date)
//   return new Date(dateFormat.getTime() + duration * 60 * 1000)
// }

let dataTransfer = new DataTransfer()

const clearInput = () => {
  let input = document.getElementById('file')
  input.type = 'text'
  input.type = 'file'
  file.value = ''
  input.setCustomValidity('')
  // dataTransfer.items.clear()
}

const onFileChanged = ($event) => {
  console.log($event.target.files[0])
  // const target = $event.target
  dataTransfer.items.clear()
  if ($event.target.files[0].size > 10485760) {
    let fileInput = document.getElementById('file')
    clearInput()
    fileInput.setCustomValidity('The file size cannot be larger than 10 MB.')
    fileInput.reportValidity()

    if (file.value === undefined || file.value === null) {
      clearInput()
    } else {
      dataTransfer.items.clear()
      dataTransfer.items.add(file.value)
      fileInput.files = dataTransfer.files
    }
  } else if (file.value === undefined || file.value === null) {
    // clearInput()
    file.value = null
    fileInput.setCustomValidity('')
  } else if (file.value === HTMLInputElement) {
    // clearInput()
    file.value = null
  } else {
    file.value = $event.target.files[0]
    fileInput.setCustomValidity('')
  }
  // if (target && target.files && target.files[0].size <= 10485760) {
  //   file.value = Array.from(target.files)
  // }
}
</script>

<template>

  <div
    class="bg-white rounded-xl shadow-lg w-full flex flex-col justify-center items-center max-w-xl mx-auto p-10 bg-cover">

    <form class="w-full max-w-xl mx-auto" @submit.prevent="$emit('createEvent', event, file)">
      <div class="flex flex-wrap -mx-3 mb-1">
        <!-- Name   -->
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-name">
            Booking Name
          </label>
          <input
            class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            id="grid-name" type="text" placeholder="Name - Surname" v-model="name" v-on:keyup="countLengthName"
            required />
          <div>
            <p class="text-sm text-right pl-2" :class="
              lengthOfWordName <= 100 ? 'text-green-600' : 'text-red-600'
            ">
              {{ lengthOfWordName }} Characters
            </p>
          </div>
        </div>
      </div>
      <!-- Email   -->
      <div class="flex flex-wrap -mx-3 mb-2">
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-email">
            Booking Email
          </label>
          <input
            class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            id="grid-email" type="text" placeholder="Email" v-model="email" v-on:keyup="countLengthEmail" required />
          <br />
          <div>
            <p class="text-sm text-right pl-2" :class="
              lengthOfWordEmail <= 100 ? 'text-green-600' : 'text-red-600'
            ">
              {{ lengthOfWordEmail }} Characters
            </p>
          </div>
        </div>
      </div>
      <!-- Category,duration   -->
      <div class="px-2 mb-3">
        <div class="flex -mx-2">
          <div class="w-1/3">
            <div class="h-12">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-category">
                Clinic Category
              </label>
              <div class="relative">
                <select
                  class="inline-flex justify-center w-48 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 pr-8"
                  v-model="categoryId" id="grid-category" required>
                  <option value="" disabled selected hidden>
                    Please select category
                  </option>
                  <option v-for="(c, index) in categories" :value="c.id" :key="index">
                    {{ c.eventCategoryName }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="w-1/3 px-10 ml-12">
            <div class="h-12">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-duration">
                Duration
              </label>
              <input type="text"
                class="inline-flex justify-center w-32 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700"
                disabled :value="
                  categories.filter((e) => e.id == categoryId)[0]?.eventDuration
                " id="grid-duration" />
            </div>
          </div>
        </div>
      </div>
      <!-- date,time -->
      <div class="px-2 mb-3">
        <div class="flex -mx-2">
          <div class="w-1/3">
            <div>
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-date">
                <br />
                date
              </label>
              <input
                class="inline-flex justify-center w-48 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                id="grid-date" type="date" v-model="startDate" required pattern="\d{4}-\d{2}-\d{2}" />
            </div>
          </div>
          <div class="w-1/3 px-10 ml-12">
            <div>
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-time">
                <br />
                Time
              </label>
              <input
                class="inline-flex justify-center w-32 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                id="grid-time" type="time" v-model="startTime" required />
            </div>
          </div>
        </div>
      </div>
      <!-- Note   -->
      <div class="flex flex-wrap -mx-3">
        <div class="w-full px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-notes">
            Notes </label><textarea rows="4" cols="50" name="comment" form="usrform"
            class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            placeholder="Notes (optional)" id="grid-notes" v-model="note" v-on:keyup="countLength"></textarea>
          <div>
            <p class="text-sm text-right pl-2" :class="lengthOfWord <= 500 ? 'text-green-600' : 'text-red-600'">
              {{ lengthOfWord }} Characters
            </p>
          </div>
        </div>
      </div>

      <div class="flex flex-wrap -mx-3 mb-5">
        <div class="w-full px-3 mb-6 md:mb-0">
          <label for="file">Upload File</label><br />
          <input type="file" id="file" @change="onFileChanged" ref="file" />
          <button
            class="inline-block bg-color-700 hover:bg-red-700 rounded-lg px-3 py-3 text-sm font-semibold text-white mr-2 mb-2 cursor-pointer"
            @click="clearInput" type="button">cancel</button>
        </div>
      </div>

      <!-- CreateEventButton  -->
      <button
        class="inline-block bg-green-500 hover:bg-green-700 rounded-lg px-3 py-3 text-sm font-semibold text-white mr-2 cursor-pointer"
        type="submit">
        Create Event
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
