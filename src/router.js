import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(`@/views/HomeView.vue`)
  },
  {
    path: '/analysis',
    name: 'energy analysis',
    component: () => import(
      `@/views/EnergyAnalysis.vue`
    )   
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import(
      `@/views/DashboardView.vue`
    )
  },
  {
    path: '/contact',
    name: 'About',
    component: () => import(`@/views/AboutView.vue`)
  },
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
