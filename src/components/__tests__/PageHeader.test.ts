import { cleanup, render, screen, waitFor, within } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { createI18n } from 'vue-i18n'
import { createMemoryHistory, createRouter } from 'vue-router'

import PageHeader from '@/components/PageHeader.vue'
import HomeView from '@/pages/HomeView.vue'
import ProjectView from '@/pages/ProjectView.vue'

async function renderHeader() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: HomeView },
      { path: '/projects', component: ProjectView },
    ],
  })
  const i18n = createI18n({ legacy: false, locale: 'ru-RU', fallbackLocale: 'ru-RU' })

  await router.push('/')
  await router.isReady()

  render(PageHeader, { global: { plugins: [router, i18n] } })

  return { user: userEvent.setup() }
}

describe('PageHeader', () => {
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

  test('переключает язык навигации и состояние кнопок выбора языка', async () => {
    const { user } = await renderHeader()
    const navigation = screen.getByRole('navigation', { name: 'Основная навигация' })

    expect(within(navigation).getByRole('button', { name: 'Русский' }).getAttribute('aria-pressed')).toBe('true')

    await user.click(within(navigation).getByRole('button', { name: 'English' }))

    expect(await screen.findByRole('navigation', { name: 'Main navigation' })).toBe(navigation)
    expect(within(navigation).getByRole('link', { name: 'About me' }).getAttribute('href')).toBe('/')
    expect(within(navigation).getByRole('button', { name: 'English' }).getAttribute('aria-pressed')).toBe('true')
    expect(within(navigation).getByRole('button', { name: 'Русский' }).getAttribute('aria-pressed')).toBe('false')
    expect(document.documentElement.lang).toBe('en-GB')
  })

  test('обновляет текущую ссылку при переходе на проекты', async () => {
    const { user } = await renderHeader()
    const navigation = screen.getByRole('navigation', { name: 'Основная навигация' })
    const home = within(navigation).getByRole('link', { name: 'Обо мне' })
    const projects = within(navigation).getByRole('link', { name: 'Проекты' })

    expect(home.getAttribute('aria-current')).toBe('page')
    await user.click(projects)

    await waitFor(() => expect(projects.getAttribute('aria-current')).toBe('page'))
    expect(home.hasAttribute('aria-current')).toBe(false)
    expect(within(navigation).getByRole<HTMLButtonElement>('button', { name: 'Карьера' }).disabled).toBe(true)
  })
})
