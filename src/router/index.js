import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/agent/:id',
    name: 'Agent',
    component: () => import('../views/Agent.vue')
  },
  {
    path: '/call/:id',
    name: 'Call',
    component: () => import('../views/Call.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
