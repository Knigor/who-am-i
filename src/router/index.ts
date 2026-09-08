import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from '@/pages/HomeView.vue'
import ProjectView from '@/pages/ProjectView.vue'

const routes = [
  {
    path: '/',
    component: HomeView
  },
  {
    path: '/projects',
    component: ProjectView
  }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router