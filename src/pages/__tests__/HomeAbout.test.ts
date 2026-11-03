import { cleanup, render, screen, waitFor, within } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { createI18n } from 'vue-i18n'
import { createMemoryHistory, createRouter } from 'vue-router'

import App from '@/App.vue'
import HomeView from '@/pages/HomeView.vue'
import AboutView from '@/pages/AboutView.vue'

async function renderPortfolio(path = '/') {
    const router = createRouter({
        history: createMemoryHistory(),
        routes: [
            { path: '/', component: HomeView },
            { path: '/about', component: AboutView },
            { path: '/career', component: { template: '<h1>Карьера</h1>' } },
            { path: '/projects', component: { template: '<h1>Проекты</h1>' } },
            { path: '/photos', component: { template: '<h1>Фото</h1>' } },
        ],
    })
    const i18n = createI18n({ legacy: false, locale: 'ru-RU', fallbackLocale: 'ru-RU' })

    await router.push(path)
    await router.isReady()
    render(App, { global: { plugins: [router, i18n] } })

    return { user: userEvent.setup(), router }
}

describe('Главная и обо мне', () => {
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

    test('открывает подробную страницу из главной и обновляет активную навигацию', async () => {
        const { user } = await renderPortfolio()
        const main = screen.getByRole('main')
        const navigation = screen.getByRole('navigation', { name: 'Основная навигация' })

        expect(within(main).getByRole('heading', { level: 1, name: /Игорь.*Кретов/ })).toBeTruthy()
        expect(within(main).getByText(/Разрабатываю интерфейсы на/).textContent).toContain('Vue и TypeScript')
        expect(within(main).getByRole('region', { name: 'Основные направления' })).toBeTruthy()

        await user.click(within(main).getByRole('link', { name: 'Подробнее обо мне' }))

        expect(await within(main).findByRole('heading', { level: 1, name: 'Обо мне.' })).toBeTruthy()
        expect(within(navigation).getByRole('link', { name: 'Обо мне' }).getAttribute('aria-current')).toBe('page')
        expect(within(navigation).getByRole('link', { name: 'Главная' }).hasAttribute('aria-current')).toBe(false)
        expect(within(main).getByRole('region', { name: 'Хакатоны и личные проекты' })).toBeTruthy()

        await user.click(within(navigation).getByRole('link', { name: 'Главная' }))

        expect(await within(main).findByRole('region', { name: 'Основные направления' })).toBeTruthy()
    })

    test('переводит открытую страницу, оглавление и контакты и сохраняет якорный переход', async () => {
        const { user, router } = await renderPortfolio('/about')
        const navigation = screen.getByRole('navigation', { name: 'Основная навигация' })

        await user.click(within(navigation).getByRole('button', { name: 'English' }))

        expect(await screen.findByRole('heading', { level: 1, name: 'About me.' })).toBeTruthy()
        expect(screen.getByRole('region', { name: 'How I work' })).toBeTruthy()
        expect(screen.getByRole('region', { name: 'Hackathons and personal projects' })).toBeTruthy()
        expect(screen.getByRole('contentinfo').textContent).toContain('Get in touch')

        const contents = screen.getByRole('navigation', { name: 'On this page' })
        const link = within(contents).getByRole('link', { name: 'How I work' })

        expect(link.getAttribute('href')).toBe('/about#approach')
        await user.click(link)
        await waitFor(() => expect(router.currentRoute.value.hash).toBe('#approach'))
        expect(document.getElementById('approach')?.getAttribute('aria-labelledby')).toBe('approach-title')

        const footer = screen.getByRole('contentinfo')
        expect(within(footer).getByRole('link', { name: /LinkedIn/ }).getAttribute('href')).toBe('https://www.linkedin.com/in/knigor/')
        expect(within(footer).getByRole('link', { name: /GitHub/ }).getAttribute('href')).toBe('https://github.com/Knigor')
    })

    test('переводит краткое представление и направления на главной', async () => {
        const { user } = await renderPortfolio()
        const navigation = screen.getByRole('navigation', { name: 'Основная навигация' })

        await user.click(within(navigation).getByRole('button', { name: 'English' }))

        expect(await screen.findByRole('heading', { level: 1, name: /Igor.*Kretov/ })).toBeTruthy()
        expect(screen.getByRole('region', { name: 'Main areas of work' })).toBeTruthy()
        expect(screen.getByText(/I build interfaces with/).textContent).toContain('Vue and TypeScript')
        expect(screen.getByRole('link', { name: 'More about me' }).getAttribute('href')).toBe('/about')
    })
})
