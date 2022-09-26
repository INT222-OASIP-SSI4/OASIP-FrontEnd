import EventHome from '../views/Event/EventHome.vue'
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
import { ref } from 'vue'

const history = createWebHashHistory()
const routes = [
  {
    path: '/',
    name: 'home',
    component: EventHome,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/create',
    name: 'createEvent',
    component: EventCreate,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/detail',
    name: 'eventDetail',
    component: EventDetail,
    meta: {
      requiresAuth: true,
    },
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
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/categories',
    name: 'categories',
    component: CategoryManagement,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/editcategory',
    name: 'editCategory',

    component: CategoryEdit,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/users',
    name: 'users',
    component: UserManagement,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/userDetail',
    name: 'userDetail',
    component: UserDetail,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/createUser',
    name: 'createUser',
    component: UserCreate,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/editUser',
    name: 'editUser',
    component: UserEdit,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: UserLogin,
  },
]

const router = createRouter({ history, routes })

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!localStorage.getItem('accessToken')) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
