import { cleanup, render, screen, within } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { createI18n } from 'vue-i18n'
import { createMemoryHistory, createRouter } from 'vue-router'

import { RouterView } from 'vue-router'
import PageHeader from '@/components/PageHeader.vue'
import CareerView from '@/pages/CareerView.vue'
import HomeView from '@/pages/HomeView.vue'
import AboutView from '@/pages/AboutView.vue'
import ProjectView from '@/pages/ProjectView.vue'

async function renderPortfolio(path = '/') {
    const router = createRouter({
        history: createMemoryHistory(),
        routes: [
            { path: '/', component: HomeView },
            { path: '/about', component: AboutView },
            { path: '/career', component: CareerView },
            { path: '/projects', component: ProjectView },
        ],
    })
    const i18n = createI18n({ legacy: false, locale: 'ru-RU', fallbackLocale: 'ru-RU' })

    await router.push(path)
    await router.isReady()

    render({
        components: { PageHeader, RouterView },
        template: '<PageHeader /><main><RouterView /></main>',
    }, { global: { plugins: [router, i18n] } })

    return { user: userEvent.setup() }
}

describe('CareerView', () => {
    const initialLang = document.documentElement.lang
    const initialClass = document.documentElement.className

    beforeEach(() => {
        localStorage.clear()
    })

    afterEach(() => {
        cleanup()
        localStorage.clear()
        document.documentElement.lang = initialLang
        document.documentElement.className = initialClass
    })

    test('открывает опыт работы и образование через навигацию', async () => {
        const { user } = await renderPortfolio()
        const navigation = screen.getByRole('navigation', { name: 'Основная навигация' })
        const careerLink = within(navigation).getByRole('link', { name: 'Карьера' })

        await user.click(careerLink)

        expect(await screen.findByRole('heading', { level: 1, name: 'Карьера' })).toBeTruthy()
        expect(careerLink.getAttribute('aria-current')).toBe('page')

        const experience = screen.getByRole('region', { name: 'Опыт работы' })
        const currentJob = within(experience).getByRole('article', { name: 'RetailCRM' })

        expect(within(experience).getAllByRole('article')).toHaveLength(3)
        expect(within(currentJob).getByText('Сейчас')).toBeTruthy()
        expect(within(experience).getByText('Июнь 2025').getAttribute('datetime')).toBe('2025-06')
        expect(within(experience).getByRole('article', { name: 'ОБУ «Информационно-технический центр»' })).toBeTruthy()
        expect(within(experience).getByRole('article', { name: 'ОКУ «Центр государственных выплат и кадровой работы»' })).toBeTruthy()

        const education = screen.getByRole('region', { name: 'Образование' })

        expect(within(education).getByRole('heading', { name: 'Липецкий государственный технический университет' })).toBeTruthy()
        expect(within(education).getByText('2025').getAttribute('datetime')).toBe('2025')
    })

    test('переключает язык опыта работы и образования на открытой странице', async () => {
        const { user } = await renderPortfolio('/career')
        const navigation = screen.getByRole('navigation', { name: 'Основная навигация' })

        await user.click(within(navigation).getByRole('button', { name: 'English' }))

        expect(await screen.findByRole('heading', { level: 1, name: 'Career' })).toBeTruthy()

        const experience = screen.getByRole('region', { name: 'Work experience' })
        const currentJob = within(experience).getByRole('article', { name: 'RetailCRM' })

        expect(within(currentJob).getByText('Current')).toBeTruthy()
        expect(within(experience).getByText('June 2025')).toBeTruthy()
        expect(within(experience).getByRole('article', { name: 'Information Technology Centre' })).toBeTruthy()
        expect(within(experience).getByRole('article', { name: 'Centre for State Payments and Personnel Management' })).toBeTruthy()

        const education = screen.getByRole('region', { name: 'Education' })

        expect(within(education).getByRole('heading', { name: 'Lipetsk State Technical University' })).toBeTruthy()
        expect(within(education).getByText('Computer Science and Computer Engineering')).toBeTruthy()
    })
})
