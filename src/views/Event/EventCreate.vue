<script setup>
import EventCreateForm from '../../components/Event/EventCreateForm.vue'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { onBeforeMount } from '@vue/runtime-core'
import ApiService from '../../composables/ApiService'
import { parseJwt } from '../../utils'

const router = useRouter()
const events = ref([])
const categories = ref([])
// const token = ref(localStorage.getItem('accessToken'))

//get current Date
const currentDateTime = computed(() => new Date())

//get all events
const getEvents = async () => {
  const res = await ApiService.getEvents()

  if (res.status === 200) {
    let data = await res.data
    events.value = data
  } else {
    console.log('error, cannot get data')
  }
}

//create new event
const createEvent = async (newEvent, file) => {
  if (validateEmail(newEvent.bookingEmail)) {
    if (checkLengthNote(newEvent.eventNotes)) {
      if (checkLengthName(newEvent.bookingName)) {
        if (
          validateEventStartTime(
            newEvent.eventStartTime,
            newEvent.eventCategoryId,
            newEvent.bookingName
          )
        ) {
          let event = JSON.stringify({
            eventStartTime: newEvent.eventStartTime,
            bookingName: newEvent.bookingName,
            bookingEmail: newEvent.bookingEmail,
            eventNotes: newEvent.eventNotes,
            eventCategoryId: newEvent.eventCategoryId,
          })
          const blob = new Blob([event], { type: 'application/json' })
          const formData = new FormData()
          // formData.append('eventStartTime', newEvent.eventStartTime)
          // formData.append('bookingName', newEvent.bookingName)
          // formData.append('bookingEmail', newEvent.bookingEmail)
          // if (!newEvent.eventNotes) {
          //   formData.append('eventNotes', newEvent.eventNotes)
          // }
          // formData.append('eventCategoryId', newEvent.eventCategoryId)
          // formData.append('event', blob)
          if (
            file !== null ||
            file !== undefined ||
            file !== '<input type="file" id="file">'
          ) {
            formData.append('event', blob)
            if (file == isNaN) {
              formData.delete(file)
            } else {
              formData.append('file', file)
            }
          } else {
            formData.append('event', blob)
          }
          // if (
          //   file !== null ||
          //   file !== undefined ||
          //   file !== '<input type="file" id="file">'
          // ) {
          //   // formData.append('file', file.files[0])
          //   formData.append('file', file)
          // }
          // formData.delete('file')
          const res = await fetch(
            `${import.meta.env.VITE_SERVER_URL}/api/events`,
            {
              method: 'POST',
              // headers: {
              //   'content-type': 'application/json',
              // },
              body: formData,
            }
          )
          if (res.status === 201) {
            let data = await res.json()
            alert('Created event successfully')
            router.push({ name: 'eventDetail', query: { id: data.id } })
          } else if (res.status === 403) {
            alert(`Lecturer can't create event`)
          }
          // const formData = new FormData()
          // formData.append('file', file[0])
          // const resFile = await fetch(
          //   `${import.meta.env.VITE_SERVER_URL}/api/files`,
          //   {
          //     method: 'POST',
          //     body: formData
          //   }
          // )
          // if (resFile.status === 201 || resFile.status === 200) {
          //   alert('Upload file successfully')
          // }
        }
      }
    }
  }
}

//get all categories
const getCategories = async () => {
  const res = await ApiService.getCategories()
  if (res.status === 200) {
    categories.value = await res.data
  } else {
    console.log('Error, cannot get categories data')
  }
}

//validate email https://www.simplilearn.com/tutorials/javascript-tutorial/email-validation-in-javascript
function validateEmail(email) {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  if (email.length <= 100) {
    if (email.match(validRegex)) {
      return true
    } else {
      alert('Invalid email address!')
    }
  } else {
    alert('bookingEmail must have length 1-100')
  }
}

//validate eventStartTime (future and overlap)
function validateEventStartTime(eventStartTime, categoryId, name) {
  if (eventStartTime < currentDateTime.value) {
    alert('Invalid Date! Date must be future')
    return false
  } else if (checkOverlap(eventStartTime, categoryId, name)) {
    alert('Invalid Date! Date is overlap')
    return false
  } else {
    return true
  }
}

//check overlap in event
function checkOverlap(getStartTime, categoryId, name) {
  let status = false
  let b_start = getStartTime
  let b_duration = categories.value.filter((c) => c.id == categoryId)[0]
    .eventDuration
  let b_end = getEndDate(getStartTime, b_duration)
  events.value
    .filter(
      (e) =>
        e.eventCategory.id == categoryId &&
        e.bookingName != name &&
        getDate(e.eventStartTime) == getDate(getStartTime)
    )
    .forEach((e) => {
      let a_start = new Date(e.eventStartTime)
      let a_end = getEndDate(e.eventStartTime, e.eventDuration)
      if (dateRangeOverlaps(a_start, a_end, b_start, b_end)) {
        status = true
      }
    })
  return status
}

//validate Note
function checkLengthNote(note) {
  if (note == undefined) {
    note = ''
  }
  if (note.length > 500) {
    alert('eventNotes must have length between 0-500')
  } else {
    return true
  }
}

//validate Name
function checkLengthName(name) {
  if (name.length > 100 || name.length < 1) {
    alert('bookingName must have length between 1-100')
  } else {
    return true
  }
}

//function getDate
function getDate(date) {
  return new Date(date).toLocaleDateString()
}

//function plus minutes with duration
function getEndDate(date, duration) {
  let dateFormat = new Date(date)
  return new Date(dateFormat.getTime() + duration * 60 * 1000)
}

function dateRangeOverlaps(a_start, a_end, b_start, b_end) {
  if (a_start <= b_start && b_start < a_end) return true // b starts in a
  if (a_start < b_end && b_end <= a_end) return true // b ends in a
  if (b_start <= a_start && a_end <= b_end) return true // a in b
  if (a_start <= b_start && b_end <= a_end) return true // b in a
  if (b_start <= a_start && b_end > a_start) return true // a starts in b
  return false
}

onBeforeMount(async () => {
  await getEvents()
  await getCategories()
})
</script>

<template>
  <div>
    <div
      class="text-center rounded-lg p-100 justify-center items-center max-w-6xl mx-auto sm:px-6 lg:px-4 py-10 font-bold text-4xl md:text-4xl lg:text-5xl font-heading text-color-500"
    >
      <div
        class="bg-blue-600 text-white rounded-xl py-7 shadow-lg w-full max-w-xl mx-auto px-3 md:mb-0"
      >
        Create Event
      </div>
    </div>
    <EventCreateForm
      :categories="categories"
      :event="events"
      @createEvent="createEvent"
    />
  </div>
</template>

<style></style>
