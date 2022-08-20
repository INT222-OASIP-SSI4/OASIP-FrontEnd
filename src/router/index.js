import Home from '../views/Home.vue';
import CreateEvent from '../views/CreateEvent.vue';
import EventDetail from '../views/EventDetail.vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import AboutUs from '../views/AboutUs.vue';
import EditEvent from '../views/EditEvent.vue';
import EventCategories from '../views/EventCategories.vue';
import EditCategory from '../views/EditCategory.vue'
import ListUser from '../views/ListUser.vue'

const history = createWebHashHistory();
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/create',
    name: 'createEvent',
    component: CreateEvent
  },
  {
    path: '/detail',
    name: 'eventDetail',
    component: EventDetail
  },
  {
    path: '/aboutus',
    name: 'aboutus',
    component: AboutUs
  },
  {
    path: '/edit',
    name: 'editEvent',
    component: EditEvent
  },
  {
    path: '/categories',
    name: 'categories',
    component: EventCategories
  },{
    path: '/editcategory',
    name: 'editCategory',
    component: EditCategory
  },{
    path: '/listuser',
    name: 'listUser',
    component: ListUser
  }
];

const router = createRouter({ history, routes });

export default router;