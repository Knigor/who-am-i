import { cleanup, render, screen, waitFor, within } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { createI18n } from 'vue-i18n'
import { createMemoryHistory, createRouter } from 'vue-router'

import PageHeader from '@/components/PageHeader.vue'
import HomeView from '@/pages/HomeView.vue'
import AboutView from '@/pages/AboutView.vue'
import ProjectView from '@/pages/ProjectView.vue'
import CareerView from '@/pages/CareerView.vue'

async function renderHeader(paths = ['/', '/about', '/projects', '/career', '/photos']) {
    const router = createRouter({
        history: createMemoryHistory(),
        routes: [
            { path: '/', component: HomeView },
            { path: '/about', component: AboutView },
            { path: '/projects', component: ProjectView },
            { path: '/career', component: CareerView },
            { path: '/photos', component: { template: '<div />' } },
        ].filter(route => paths.includes(route.path)),
    })
    const i18n = createI18n({ legacy: false, locale: 'ru-RU', fallbackLocale: 'ru-RU' })

    await router.push('/')
    await router.isReady()

    render(PageHeader, { global: { plugins: [router, i18n] } })

    return { user: userEvent.setup(), router }
}

describe('PageHeader', () => {
    const initialLang = document.documentElement.lang
    const initialClass = document.documentElement.className
    const mediaQueries: Array<EventTarget & { media: string; matches: boolean }> = []

    function setDesktop(matches: boolean) {
        for (const query of mediaQueries) {
            if (query.media !== '(min-width: 1024px)') continue
            query.matches = matches
            query.dispatchEvent(Object.assign(new Event('change'), { matches, media: query.media }))
        }
    }

    beforeEach(() => {
        localStorage.clear()
        mediaQueries.length = 0
        vi.stubGlobal('matchMedia', vi.fn((media: string) => {
            const query = Object.assign(new EventTarget(), {
                media,
                matches: false,
                onchange: null,
                addListener: vi.fn(),
                removeListener: vi.fn(),
            })
            mediaQueries.push(query)

            return query
        }))
        vi.stubGlobal('ResizeObserver', class {
            observe() {}
            unobserve() {}
            disconnect() {}
        })
    })

    afterEach(() => {
        cleanup()
        vi.unstubAllGlobals()
        localStorage.clear()
        document.documentElement.lang = initialLang
        document.documentElement.className = initialClass
    })

    test('переключает язык навигации и состояние кнопок выбора языка', async () => {
        const { user } = await renderHeader()
        const navigation = screen.getByRole('navigation', { name: 'Основная навигация' })

        expect(within(navigation).getByRole('button', { name: 'Русский' }).getAttribute('aria-pressed')).toBe('true')

        await user.click(within(navigation).getByRole('button', { name: 'English' }))

        expect(await screen.findByRole('navigation', { name: 'Main navigation' })).toBe(navigation)
        expect(within(navigation).getByRole('link', { name: 'About me' }).getAttribute('href')).toBe('/about')
        expect(within(navigation).getByRole('button', { name: 'English' }).getAttribute('aria-pressed')).toBe('true')
        expect(within(navigation).getByRole('button', { name: 'Русский' }).getAttribute('aria-pressed')).toBe('false')
        expect(document.documentElement.lang).toBe('en-GB')
    })

    test('обновляет текущую ссылку при переходе на проекты', async () => {
        const { user } = await renderHeader()
        const navigation = screen.getByRole('navigation', { name: 'Основная навигация' })
        const home = within(navigation).getByRole('link', { name: 'Главная' })
        const projects = within(navigation).getByRole('link', { name: 'Проекты' })

        expect(home.getAttribute('aria-current')).toBe('page')
        await user.click(projects)

        await waitFor(() => expect(projects.getAttribute('aria-current')).toBe('page'))
        expect(home.hasAttribute('aria-current')).toBe(false)
        expect(within(navigation).getByRole('link', { name: 'Карьера' }).getAttribute('href')).toBe('/career')
    })
    test('переключает тему в обе стороны и сохраняет выбор', async () => {
        const { user } = await renderHeader()
        const navigation = screen.getByRole('navigation', { name: 'Основная навигация' })

        expect(document.documentElement.classList.contains('dark')).toBe(true)
        await user.click(within(navigation).getByRole('button', { name: 'Включить светлую тему' }))

        await waitFor(() => expect(document.documentElement.classList.contains('dark')).toBe(false))
        expect(localStorage.getItem('vueuse-color-scheme')).toBe('light')

        await user.click(within(navigation).getByRole('button', { name: 'Включить тёмную тему' }))

        await waitFor(() => expect(document.documentElement.classList.contains('dark')).toBe(true))
        expect(localStorage.getItem('vueuse-color-scheme')).toBe('dark')
    })

    test('меняет язык и тему внутри открытого меню, затем закрывает его при переходе', async () => {
        const { user, router } = await renderHeader()

        await user.click(screen.getByRole('button', { name: 'Меню' }))
        const menu = await screen.findByRole('menu')
        expect(within(menu).getByRole('menuitemradio', { name: 'Русский' }).getAttribute('aria-checked')).toBe('true')

        await user.click(within(menu).getByRole('menuitemradio', { name: 'English' }))

        expect(await within(menu).findByRole('menuitem', { name: 'Projects' })).toBeTruthy()
        expect(within(menu).getByRole('menuitemradio', { name: 'English' }).getAttribute('aria-checked')).toBe('true')
        expect(within(menu).getByRole('menuitemradio', { name: 'Русский' }).getAttribute('aria-checked')).toBe('false')
        expect(document.documentElement.lang).toBe('en-GB')
        expect(screen.getByRole('button', { name: 'Menu' }).getAttribute('aria-expanded')).toBe('true')

        await user.click(within(menu).getByRole('menuitem', { name: 'Switch to light theme' }))
        await waitFor(() => expect(document.documentElement.classList.contains('dark')).toBe(false))
        expect(screen.getByRole('menu')).toBe(menu)

        await user.click(within(menu).getByRole('menuitem', { name: 'Switch to dark theme' }))
        await waitFor(() => expect(document.documentElement.classList.contains('dark')).toBe(true))
        await user.click(within(menu).getByRole('menuitem', { name: 'Projects' }))

        await waitFor(() => expect(router.currentRoute.value.path).toBe('/projects'))
        await waitFor(() => expect(screen.queryByRole('menu')).toBeNull())
        expect(screen.getByRole('button', { name: 'Menu' }).getAttribute('aria-expanded')).toBe('false')

        await user.click(screen.getByRole('button', { name: 'Menu' }))
        const reopenedMenu = await screen.findByRole('menu')
        expect(within(reopenedMenu).getByRole('menuitem', { name: 'Projects' }).getAttribute('aria-current')).toBe('page')
    })

    test('открывает фотографии из меню и показывает правильные внешние ссылки', async () => {
        const { user, router } = await renderHeader()

        await user.click(screen.getByRole('button', { name: 'Меню' }))
        const menu = await screen.findByRole('menu')

        for (const [name, href] of [
            ['GitHub', 'https://github.com/Knigor'],
            ['LinkedIn', 'https://www.linkedin.com/in/knigor/'],
        ]) {
            const link = within(menu).getByRole('menuitem', { name })
            expect(link.getAttribute('href')).toBe(href)
            expect(link.getAttribute('target')).toBe('_blank')
            expect(link.getAttribute('rel')).toBe('noopener noreferrer')
        }

        await user.click(within(menu).getByRole('menuitem', { name: 'Фото' }))

        await waitFor(() => expect(router.currentRoute.value.path).toBe('/photos'))
        await waitFor(() => expect(screen.queryByRole('menu')).toBeNull())
        const navigation = screen.getByRole('navigation', { name: 'Основная навигация' })
        expect(within(navigation).getByRole('link', { name: 'Фото' }).getAttribute('aria-current')).toBe('page')
    })

    test('закрывает меню по Escape и возвращает фокус на кнопку', async () => {
        const { user } = await renderHeader()
        const trigger = screen.getByRole('button', { name: 'Меню' })

        await user.click(trigger)
        await screen.findByRole('menu')
        await user.keyboard('{Escape}')

        await waitFor(() => expect(screen.queryByRole('menu')).toBeNull())
        expect(trigger.getAttribute('aria-expanded')).toBe('false')
        await waitFor(() => expect(document.activeElement).toBe(trigger))
    })

    test('делает отсутствующие страницы недоступными в навигации и меню', async () => {
        const { user, router } = await renderHeader(['/'])
        const navigation = screen.getByRole('navigation', { name: 'Основная навигация' })

        for (const name of ['Обо мне', 'Проекты', 'Карьера', 'Фото']) {
            expect(within(navigation).getByRole('button', { name }).hasAttribute('disabled')).toBe(true)
        }

        await user.click(screen.getByRole('button', { name: 'Меню' }))
        const menu = await screen.findByRole('menu')
        for (const name of ['Обо мне', 'Проекты', 'Карьера', 'Фото']) {
            expect(within(menu).getByRole('menuitem', { name }).getAttribute('aria-disabled')).toBe('true')
        }

        await user.click(within(menu).getByRole('menuitem', { name: 'Фото' }))
        expect(router.currentRoute.value.path).toBe('/')
        expect(screen.getByRole('menu')).toBe(menu)
    })

    test('закрывает открытое меню при переходе к desktop и не открывает его при возврате', async () => {
        const { user } = await renderHeader()
        const trigger = screen.getByRole('button', { name: 'Меню' })

        await user.click(trigger)
        await screen.findByRole('menu')
        setDesktop(true)

        await waitFor(() => expect(screen.queryByRole('menu')).toBeNull())
        expect(trigger.getAttribute('aria-expanded')).toBe('false')
        await waitFor(() => expect(document.activeElement).not.toBe(trigger))

        setDesktop(false)
        await user.click(trigger)
        expect(await screen.findByRole('menu')).toBeTruthy()
    })

})
