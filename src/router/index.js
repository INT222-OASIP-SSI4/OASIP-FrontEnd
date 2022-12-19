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
// import { ref } from 'vue'
// import { parseJwt, getRoleByToken } from '../utils/index.js'

// const accessToken = ref(localStorage.getItem('accessToken'))

const history = createWebHashHistory()
const routes = [
  {
    path: '/',
    name: 'home',
    component: EventHome,
    meta: {
      requiresAuth: true,
      // authorize: [],
    },
  },
  {
    path: '/create',
    name: 'createEvent',
    component: EventCreate,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/detail',
    name: 'eventDetail',
    component: EventDetail,
    meta: {
      requiresAuth: true,
      // authorize: [],
    },
  },
  {
    path: '/aboutus',
    name: 'aboutus',
    component: AboutUs,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/edit',
    name: 'editEvent',
    component: EventEdit,
    meta: {
      requiresAuth: true,
      // authorize: [],
    },
  },
  {
    path: '/categories',
    name: 'categories',
    component: CategoryManagement,
    meta: {
      requiresAuth: true,
      // authorize: [],
    },
  },
  {
    path: '/editcategory',
    name: 'editCategory',
    component: CategoryEdit,
    meta: {
      requiresAuth: true,
      // authorize: [],
    },
  },
  {
    path: '/users',
    name: 'users',
    component: UserManagement,
    meta: {
      requiresAuth: true,
      // authorize: ['Role_admin'],
    },
  },
  {
    path: '/userDetail',
    name: 'userDetail',
    component: UserDetail,
    meta: {
      requiresAuth: true,
      // authorize: ['Role_admin'],
    },
  },
  {
    path: '/createUser',
    name: 'createUser',
    component: UserCreate,
    meta: {
      requiresAuth: true,
      // authorize: ['Role_admin'],
    },
  },
  {
    path: '/editUser',
    name: 'editUser',
    component: UserEdit,
    meta: {
      requiresAuth: true,
      // authorize: ['Role_admin'],
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
  // const { authorize } = to.meta

  // if (to.matched.some((record) => record.meta.requiresAuth)) {
  //   if (!localStorage.getItem('accessToken')) {
  //     next({ name: 'login' })
  //   }
  //   else if (localStorage.getItem('accessToken') !== null) {
  //     if (to.meta.authorize.includes(getRoleByToken(accessToken.value)) && from.path !== '/login') {
  //       next()
  //     }
  //     else {
  //       next({name: 'home'})
  //     }
  //   }
  //   else {
  //     next()
  //   }
  // } else {
  //   next()
  // }

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
