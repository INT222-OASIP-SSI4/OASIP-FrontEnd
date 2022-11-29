<script setup>
import { onBeforeMount } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import { parseJwt, renewToken } from '../../utils/index.js'

const route = useRoute()
const router = useRouter()
const event = ref({})
const events = ref([])
const token = ref(localStorage.getItem('accessToken'))

let currentDate = ref('')
let localDate = ref('')
let localTime = ref('')
const note = ref('')
const file = ref()
const fileName = ref()
const deleteStatus = ref()

//get eventStartTime by date and time
const getStartTime = computed(() => {
  const date = localDate.value + ' ' + localTime.value
  return new Date(date)
})

//get current Date
const currentDateTime = computed(() => new Date())

//count length of input
const lengthOfWord = ref(0)
const countLength = () => (lengthOfWord.value = note.value.length)

//get all events
const getEvents = async () => {
  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/events`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  })
  if (res.status === 200) {
    let data = await res.json()
    events.value = data
  } else if (res.status === 401) {
    renewToken()
  } else {
    console.log('error, cannot get data')
  }
}

// get event
const getEvent = async () => {
  if (route.query.id) {
    const id = route.query.id
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/events/${id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    )
    if (res.status === 200) {
      const data = await res.json()
      event.value = data
      currentDate.value = new Date(event.value.eventStartTime)
      localDate.value = formatStartDate(currentDate.value)
      localTime.value = formatStartTime(currentDate.value)
      note.value = event.value.eventNotes
      fileName.value = event.value.fileName
    }
  } else if (res.status === 401) {
    renewToken()
  } else goEventDetail
}

//edit event
const editEvent = async (updatedEvent) => {
  // let { id, ...data } = { ...updatedEvent }
  let id = route.query.id;
  let event = JSON.stringify({
    eventStartTime: validateEventStartTime.value,
    eventNotes: checkLengthNote.value,
    fileDelete: deleteStatus.value
    
  })
  const blob = new Blob([event], { type: 'application/json' })
  const formData = new FormData()
  if (
    file.value !== null ||
    file.value !== undefined ||
    file.value !== '<input type="file" id="file">'
  ) {
    formData.append('event', blob)
    if (file.value == isNaN) {
      formData.delete(file.value)
    } else {
      formData.append('file', file.value)
    }
  } else {
    formData.append('event', blob)
  }
  const res = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/api/events/${id}`,
    {
      method: 'PUT',
      headers: {
        // 'content-type': 'application/json',
        Authorization: `Bearer ${token.value}`,
      },
      body: formData,
    }
  )
  if (res.status === 200) {
    router.push({ name: 'eventDetail', query: { id } })
    console.log('edited successfully')
  } else if (res.status === 403 && parseJwt().Roles == 'ROLE_lecturer') {
    alert(`Lecturer can't edit event`)
  } else console.log('error, cannot edited data')
}

//go to detail page
const goEventDetail = () => {
  router.push({ name: 'eventDetail' })
}

//set value for 2 digits
function padTo2Digits(num) {
  return num.toString().padStart(2, '0')
}

//set format date
function formatStartDate(date) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join('-')
}

//set format time
function formatStartTime(time) {
  return [padTo2Digits(time.getHours()), padTo2Digits(time.getMinutes())].join(
    ':'
  )
}

//validate note
const checkLengthNote = computed(() => {
  if (note.value == undefined) {
    note.value = ''
  }
  if (note.value.length > 500) {
    alert('eventNotes must have length between 0-500')
    return note.value
  } else {
    return note.value
  }
})

//get edit Event
const updateEvent = computed(() => {
  event.value.eventStartTime = validateEventStartTime.value
  event.value.eventNotes = checkLengthNote.value
  return { ...event.value }
})

//validate Time future and overlap
const validateEventStartTime = computed(() => {
  if (getStartTime.value < currentDateTime.value) {
    alert('Invalid Date! Date must be future')
  }
  if (checkOverlap.value) {
    alert('Invalid Date! Date is overlap')
  }
  return getStartTime.value
})

const checkOverlap = computed(() => {
  let status = false
  let b_start = getStartTime.value
  let b_duration = event.value.eventDuration
  let b_end = getEndDate(getStartTime.value, b_duration)

  events.value
    .filter(
      (e) =>
        e.eventCategory.id == event.value.eventCategory.id &&
        e.bookingName != event.value.bookingName
    )
    .forEach((e) => {
      let a_start = new Date(e.eventStartTime)
      let a_end = getEndDate(e.eventStartTime, e.eventDuration)
      if (dateRangeOverlaps(a_start, a_end, b_start, b_end)) {
        status = true
      }
    })
  return status
})

//function check overlap
function dateRangeOverlaps(a_start, a_end, b_start, b_end) {
  if (a_start <= b_start && b_start < a_end) return true // b starts in a
  if (a_start < b_end && b_end <= a_end) return true // b ends in a
  if (b_start <= a_start && a_end <= b_end) return true // a in b
  if (a_start <= b_start && b_end <= a_end) return true // b in a
  if (b_start <= a_start && b_end > a_start) return true // a starts in b
  return false
}

//function plus minutes with duration
function getEndDate(date, duration) {
  let dateFormat = new Date(date)
  return new Date(dateFormat.getTime() + duration * 60 * 1000)
}

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
    fileInput.setCustomValidity('The file size cannot be larger than 10 MB.')
    fileInput.reportValidity()
    if (file.value === undefined || file.value === null) {
      clearInput()
    } else {
      dataTransfer.items.clear()
      dataTransfer.items.add(file.value)
      fileInput.files = dataTransfer.files
    }
  } else {
    file.value = $event.target.files[0]
    fileInput.setCustomValidity('')
  }
  deleteStatus.value = false;
}

function deleteFile() {
  deleteStatus.value = true
  alert("The file has been deleted.")
}

onBeforeMount(async () => {
  await getEvent()
  await getEvents()
})
</script>
<template>
  <div
    class="bg-white rounded-xl shadow-lg w-2/5 p-100 flex flex-col justify-center items-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12 mt-10"
  >
    <p class="pt-1 text-gray-700 font-semibold text-xl">
      Name: {{ event.bookingName }}
    </p>
    <p class="text-gray-700 text-base">Email: {{ event.bookingEmail }}</p>
    <p class="text-gray-700 text-base">
      Category: {{ event.eventCategory?.eventCategoryName }}
    </p>
    <p class="text-gray-700 text-base">Duration: {{ event.eventDuration }}</p>

    <form
      class="w-full max-w-xl space-y-2 mt-2"
      @submit.prevent="editEvent(updateEvent)"
    >
      <div>
        <div class="px-2">
          <div class="flex -mx-2">
            <div class="w-3/3 px-2 mr-7">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-date"
              >
                <br />
                date
              </label>
              <!-- <span
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >Reserved Date: {{ currentDate }}</span
              > -->
              <input
                class="inline-flex justify-center w-40 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                id="grid-date"
                type="date"
                v-model="localDate"
              />
            </div>
            <div class="w-1/3 px-2">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-4"
                for="grid-time"
              >
                Time
              </label>
              <!-- <span
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >Reserved Time: {{ currentTime }}</span
              > -->
              <input
                class="inline-flex justify-center w-40 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                id="grid-time"
                type="time"
                v-model="localTime"
              />
            </div>
          </div>
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2"
            for="grid-notes"
          >
            Notes
          </label>
          <textarea
            rows="4"
            cols="50"
            name="comment"
            class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            placeholder="Notes"
            id="grid-notes"
            v-model="note"
            v-on:keyup="countLength"
          ></textarea>
          <div>
            <p
              class="text-sm text-right pl-2"
              :class="lengthOfWord <= 500 ? 'text-green-600' : 'text-red-600'"
            >
              {{ lengthOfWord }} Characters
            </p>
          </div>
          <div v-if="fileName!=null">
            <p class="text-gray-700 text-base">File : {{ fileName }}</p>
          </div>
          <div v-else>
            <p class="text-gray-700 text-base">No File</p>
          </div>
          <br>
          <div class="flex flex-wrap -mx-3 mb-5">
            <div class="w-full px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2" for="file">Select New File</label><br />
              <input type="file" id="file" @change="onFileChanged" ref="file" />
              <button @click="clearInput" type="button">cancel</button>
            </div>
          </div>
          <br>
          <span><button class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2" @click="deleteFile" type="button">delete file</button></span>
        </div>
        <div class="text-center">
          <router-link :to="`/detail?id=${event.id}`">
            <button
              class="inline-block bg-red-500 hover:bg-red-700 rounded-full px-3 py-3 text-sm font-semibold text-white mr-2 mb-2 cursor-pointer mt-8"
            >
              Cancel Edit
            </button>
          </router-link>
          <button
            class="inline-block bg-green-500 hover:bg-green-700 rounded-full px-3 py-3 text-sm font-semibold text-white mr-2 mb-2 cursor-pointer mt-8"
            type="submit"
          >
            Update Event
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<style></style>
