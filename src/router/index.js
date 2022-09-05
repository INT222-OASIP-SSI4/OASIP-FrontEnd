import Home from '../views/Event/Home.vue'
import EventCreate from '../views/Event/EventCreate.vue'
import EventDetail from '../views/Event/EventDetail.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import AboutUs from '../views/AboutUs.vue'
import EventEdit from '../views/Event/EventEdit.vue'
import CategoryManagement from '../views/Category/CategoryManagement.vue'
import CategoryEdit from '../views/Category/CategoryEdit.vue'
import UserManagement from '../views/User/UserManagement.vue'
import UserDetail from '../views/User/UserDetail.vue'
import UserCreate from '../views/User/UserCreate.vue'
import UserEdit from '../views/User/UserEdit.vue'
import UserLogin from '../views/User/UserLogin.vue'

const history = createWebHashHistory()
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/create',
    name: 'createEvent',
    component: EventCreate,
  },
  {
    path: '/detail',
    name: 'eventDetail',
    component: EventDetail,
  },
  {
    path: '/aboutus',
    name: 'aboutus',
    component: AboutUs,
  },
  {
    path: '/edit',
    name: 'editEvent',
    component: EventEdit,
  },
  {
    path: '/categories',
    name: 'categories',
    component: CategoryManagement,
  },
  {
    path: '/editcategory',
    name: 'editCategory',

    component: CategoryEdit,
  },
  {
    path: '/users',
    name: 'users',
    component: UserManagement,
  },
  {
    path: '/userDetail',
    name: 'userDetail',
    component: UserDetail,
  },
  {
    path: '/createUser',
    name: 'createUser',
    component: UserCreate,
  },
  {
    path: '/editUser',
    name: 'editUser',
    component: UserEdit,
  },
  {
    path: '/login',
    name: 'login',
    component: UserLogin,
  },
]

const router = createRouter({ history, routes })

export default router
