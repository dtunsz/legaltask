import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    props: true
  },
  {
    path: '/agent/:id',
    name: 'Agent',
    component: () => import('../views/Agent.vue'),
    props: true
  },
  {
    path: '/call/:id',
    name: 'Call',
    component: () => import('../views/Call.vue'),
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
