import Home from '../views/Event/Home.vue';
import EventCreate from '../views/Event/EventCreate.vue';
import EventDetail from '../views/Event/EventDetail.vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import AboutUs from '../views/AboutUs.vue';
import EventEdit from '../views/Event/EventEdit.vue';
import CategoryManagement from '../views/Category/CategoryManagement.vue';
import CategoryEdit from '../views/Category/CategoryEdit.vue';
import ListUser from '../views/ListUser.vue';

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
    component: EventCreate
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
    component: EventEdit
  },
  {
    path: '/categories',
    name: 'categories',
    component: CategoryManagement
  },{
    path: '/editcategory',
    name: 'editCategory',
    component: CategoryEdit
  },{
    path: '/listuser',
    name: 'listUser',
    component: ListUser
  }
];

const router = createRouter({ history, routes });

export default router;