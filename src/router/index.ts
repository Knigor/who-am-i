import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '@/pages/HomeView.vue'
import AboutView from '@/pages/AboutView.vue'
import ProjectView from '@/pages/ProjectView.vue'
import CareerView from '@/pages/CareerView.vue'
import PhotoView from '@/pages/PhotoView.vue'

const routes = [
    {
        path: '/',
        component: HomeView
    },
    {
        path: '/about',
        component: AboutView
    },
    {
        path: '/projects',
        component: ProjectView
    },
    {
        path: '/career',
        component: CareerView
    },
    {
        path: '/photos',
        component: PhotoView
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) return savedPosition
        if (to.hash) return { el: to.hash, top: 24 }
        if (to.path !== from.path) return { top: 0 }
    },
})

export default router
