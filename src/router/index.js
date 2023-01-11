import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/home',
    name: 'home',
    redirect: '/pollList',
    component: () => import('../views/home.vue'),
    children: [
      { path: '/pollList', name: 'pollList', component: () => import('../components/pollList.vue')  },
      { path: '/addPoll', name: 'addPoll', component: () => import("../components/addPoll.vue")  },
    ]
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/signup.vue')
  },
  {
    path: '/',
    name: 'login',
    component: () => import('../views/login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
