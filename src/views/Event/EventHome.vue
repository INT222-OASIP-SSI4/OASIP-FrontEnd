<script setup>
import EventList from '../../components/Event/EventList.vue'
import { onBeforeMount, ref, computed, onUpdated } from 'vue'
import EventSearch from '../../components/Event/EventSearch.vue'
import Category from '../../components/Category/Category.vue'
import { renewToken } from '../../utils'
import ApiService from '../../composables/ApiService'

const events = ref([])
const eventsWithoutAuth = ref([])
const token = ref(localStorage.getItem('accessToken'))

//get all events
const getEvents = async () => {
  const res = await ApiService.getEvents()

  if (res.status === 200) {
    let data = await res.data
    events.value = data
  } else if (res.status === 401) {
    renewToken()
  } else {
    console.log('error, cannot get data')
  }
}

const getAllEvents = async () => {
  const res = await ApiService.getAllEventsWithoutAuth()

  if (res.status === 200) {
    let data = await res.data
    eventsWithoutAuth.value = data
  } else if (res.status === 401) {
    renewToken()
  } else {
    console.log('error, cannot get data')
  }
}

const categories = ref([])

//get all categories
const getCategories = async () => {
  const res = await ApiService.getCategories()

  if (res.status === 200) {
    categories.value = await res.data
  } else {
    console.log('Error, cannot get categories data')
  }
}

const selectedCategoryIndex = ref(-1)
const keyword = ref('')
const date = ref('')
const dateStatus = ref('')
const currentDate = computed(() => new Date().toISOString())
const status = ref()
//all filter
const filterEvent = computed(() => {
    let result = events.value
    const selectDate = new Date(date.value).toLocaleDateString()
    status.value = 'No Scheduled Event'
    if (selectedCategoryIndex.value !== -1) {
      result.sort(sortAscDate('eventStartTime', 'desc'))
      result = result.filter(
        (e) =>
          e.eventCategory.eventCategoryName ===
          categories.value.map((c) => {
            return c.eventCategoryName
          })[selectedCategoryIndex.value]
      )
    }
    if (keyword.value) {
      result = result.filter(
        (e) =>
          e.bookingName.toLowerCase().includes(keyword.value.toLowerCase()) ||
          e.eventCategory.eventCategoryName
            .toLowerCase()
            .includes(keyword.value.toLowerCase())
      )
    }
    if (dateStatus.value) {
      if (dateStatus.value == 'upcoming') {
        status.value = 'No On-Going or Upcoming Events'
        result.sort(sortAscDate('eventStartTime'))
        result = result.filter(
          (e) =>
            e.eventStartTime >= currentDate.value ||
            (currentDate.value <=
              getEndDate(e.eventStartTime, e.eventDuration) &&
              currentDate.value >= e.eventStartTime)
        )
      } else if (dateStatus.value == 'past') {
        status.value = 'No Past Events'
        result = result.filter(
          (e) =>
            e.eventStartTime < currentDate.value &&
            currentDate.value > getEndDate(e.eventStartTime, e.eventDuration)
        )
      } else if (dateStatus.value == 'all') {
        result.sort(sortAscDate('eventStartTime', 'desc'))
        result = result
      }
    }
    if (selectDate != 'Invalid Date') {
      result.sort(sortAscDate('eventStartTime'))
      result = result.filter(
        (e) =>
          new Date(e.eventStartTime)
            .toLocaleDateString()
            .includes(selectDate) || selectDate == 'Invalid Date'
      )
    }
    return result
})

const filterEventWithOutAuth = computed(() => {
    let result = eventsWithoutAuth.value
    const selectDate = new Date(date.value).toLocaleDateString()
    status.value = 'No Scheduled Event'
    if (selectedCategoryIndex.value !== -1) {
      result.sort(sortAscDate('eventStartTime', 'desc'))
      result = result.filter(
        (e) =>
          e.eventCategory.eventCategoryName ===
          categories.value.map((c) => {
            return c.eventCategoryName
          })[selectedCategoryIndex.value]
      )
    }
    if (keyword.value) {
      result = result.filter(
        (e) =>
          e.bookingName.toLowerCase().includes(keyword.value.toLowerCase()) ||
          e.eventCategory.eventCategoryName
            .toLowerCase()
            .includes(keyword.value.toLowerCase())
      )
    }
    if (dateStatus.value) {
      if (dateStatus.value == 'upcoming') {
        status.value = 'No On-Going or Upcoming Events'
        result.sort(sortAscDate('eventStartTime'))
        result = result.filter(
          (e) =>
            e.eventStartTime >= currentDate.value ||
            (currentDate.value <=
              getEndDate(e.eventStartTime, e.eventDuration) &&
              currentDate.value >= e.eventStartTime)
        )
      } else if (dateStatus.value == 'past') {
        status.value = 'No Past Events'
        result = result.filter(
          (e) =>
            e.eventStartTime < currentDate.value &&
            currentDate.value > getEndDate(e.eventStartTime, e.eventDuration)
        )
      } else if (dateStatus.value == 'all') {
        result.sort(sortAscDate('eventStartTime', 'desc'))
        result = result
      }
    }
    if (selectDate != 'Invalid Date') {
      result.sort(sortAscDate('eventStartTime'))
      result = result.filter(
        (e) =>
          new Date(e.eventStartTime)
            .toLocaleDateString()
            .includes(selectDate) || selectDate == 'Invalid Date'
      )
    }
    return result
})

//function for sort Date to ascending by https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/#:~:text=To%20sort%20an%20array%20of%20objects%2C%20use%20the%20sort(),or%20any%20other%20custom%20property.
function sortAscDate(key, order = 'asc') {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0
    }

    const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key]
    const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key]

    let comparison = 0
    if (varA > varB) {
      comparison = 1
    } else if (varA < varB) {
      comparison = -1
    }
    return order === 'desc' ? comparison * -1 : comparison
  }
}

//getEndDate
function getEndDate(date, duration) {
  let dateFormat = new Date(date)
  return new Date(dateFormat.getTime() + duration * 60 * 1000).toISOString()
}

//set status of date to upcoming or past
const setDateStatus = (dpu) => {
  dateStatus.value = dpu
}

//set category's index for filter category
const setCategoryIndex = (index) => {
  selectedCategoryIndex.value = index
}

//set keyword for search by name, email
const setSearchKeyword = (keywords) => {
  keyword.value = keywords
}

//set date for filter by selected date
const setSearchDate = (dates) => {
  date.value = dates
}

onBeforeMount(async () => {
  if(token.value){
  await getEvents()
  }
  await getAllEvents()
  await getCategories()
})
</script>
<template>
  <div
    class="w-full rounded-lg p-100 justify-center items-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-10"
  >
    <div class="bg-blue-600 rounded-xl p-7 shadow-lg">
      <div class="px-3 md:mb-0">
        <div class="text-center flex flex-col space-y-4">
          <h1
            class="font-bold text-4xl md:text-4xl lg:text-5xl font-heading text-white"
          >
            Booking Clinic
            <p class="text-2xl">For Reservation</p>
          </h1>
        </div>
      </div>
    </div>
  </div>

  <div
    class="w-full p-100 justify-center items-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 mb-9"
  >
    <div
      class="w-auto rounded-tl-lg rounded-tr-lg justify-center items-center bg-white py-6 shadow-lg flex flex-col space-y-2 rounded-br-lg rounded-bl-lg"
    >
      <h2 class="font-bold text-xl text-black mb-2 mt-2">FilterEvents</h2>
      <EventSearch
        @setSearchKeyword="setSearchKeyword"
        @setSearchDate="setSearchDate"
        @searchByDatePastAndUpcoming="setDateStatus"
      />
      <div class="divide-y-2 divide-solid divide-slate-300">
        <Category
          :categories="categories"
          @setCategoryIndex="setCategoryIndex"
          :activeIndex="selectedCategoryIndex"
        />
        <h2 class="font-bold text-xl text-black text-center px-4 py-2">
          Events Schedule
        </h2>
      </div>
      <EventList
        :events="filterEvent"
        v-if="filterEvent.length != 0"
      />
      <div class="flex flex-col items-center justify-center mt-2" v-else>
        <h1 class="font-bold">" {{ status }} "</h1>
        <router-link :to="{ name: 'createEvent' }">
          <br />
          <button
            class="rounded-lg g-transparent hover:bg-blue-600 text-blue-600 font-semibold hover:text-white py-2 px-5 border border-blue-600 hover:border-transparent div class=opacity-50 hover:opacity-100"
          >
            Create Event
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style></style>
