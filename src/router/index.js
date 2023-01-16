import { createRouter, createWebHashHistory} from 'vue-router'

const routes = [
  {
    path: '/home',
    name: 'home',
    redirect: '/pollList',
    component: () => import('../views/home.vue'),
    children: [
      { path: '/pollList', name: 'pollList', component: () => import('../components/pollList.vue') },
      { path: '/addPoll', name: 'addPoll', component: () => import("../components/addPoll.vue") },
      { path: '/showPoll', name: 'showPoll', component: () => import("../components/showPoll.vue") },
    ],
    beforeEnter: (to, from, next) => {
      if(!localStorage.getItem('user')) {
          next('/');
      } else {
          next();
      }
  }
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/signup.vue')
  },
  {
    path: '/',
    name: 'login',
    component: () => import('../views/login.vue'),
    beforeEnter: (to, from, next) => {
      if(localStorage.getItem('user')) {
          next('/home');
      } else {
          next();
      }
  }
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
