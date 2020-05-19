import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/InputList.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/select',
    name: 'Select',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Select.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
