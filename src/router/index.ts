import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ResultsPage from '../views/ResultsPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/results',
    name: 'results',
    component: ResultsPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router