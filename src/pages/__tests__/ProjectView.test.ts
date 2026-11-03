import { cleanup, render, screen, within } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, test } from 'vitest'
import { createI18n } from 'vue-i18n'

import ProjectView from '@/pages/ProjectView.vue'

import { useI18n } from 'vue-i18n'

function renderProjects() {
    const i18n = createI18n({ legacy: false, locale: 'ru-RU', fallbackLocale: 'ru-RU' })

    render({
        components: { ProjectView },
        setup() {
            const { locale } = useI18n()

            return { locale }
        },
        template: '<button @click="locale = \'en-GB\'">English</button><ProjectView />',
    }, { global: { plugins: [i18n] } })

    return userEvent.setup()
}

describe('ProjectView', () => {
    afterEach(() => {
        cleanup()
    })

    test('показывает проверенные ссылки на проекты и отличает призовые места от участия', () => {
        renderProjects()

        const projects = screen.getByRole('list', { name: 'Личные проекты' })
        const links = [
            ['who-am-i', 'https://github.com/Knigor/who-am-i'],
            ['Конструктор коммерческих предложений', 'https://github.com/Knigor/online-proposal-builder-for-medical-is-frontend-service'],
            ['Каталог украшений и отзывы', 'https://github.com/Knigor/jewerly-tone-reviews-is-frontend'],
        ]

        for (const [name, href] of links) {
            const link = within(projects).getByRole('link', { name })

            expect(link.getAttribute('href')).toBe(href)
            expect(link.getAttribute('target')).toBe('_blank')
            expect(link.getAttribute('rel')).toBe('noopener noreferrer')
        }

        const competitions = screen.getByRole('list', { name: 'Результаты и участие в соревнованиях' })

        expect(within(competitions).getAllByRole('listitem')).toHaveLength(5)
        expect(within(competitions).getAllByText('2-е место')).toHaveLength(3)
        expect(within(competitions).getAllByText('Участие')).toHaveLength(2)
        expect(within(competitions).getByText('Команда notFive, представляли Липецкую область.')).toBeTruthy()
    })

    test('переводит проекты, результаты и информацию о команде при смене языка', async () => {
        const user = renderProjects()

        await user.click(screen.getByRole('button', { name: 'English' }))

        expect(await screen.findByRole('heading', { name: 'Projects', level: 1 })).toBeTruthy()

        const projects = screen.getByRole('list', { name: 'Personal projects' })
        const competitions = screen.getByRole('region', { name: 'Hackathons and competitions' })

        expect(within(projects).getByRole('link', { name: 'Commercial proposal builder' }).getAttribute('href')).toBe('https://github.com/Knigor/online-proposal-builder-for-medical-is-frontend-service')
        expect(within(projects).getByRole('link', { name: 'Jewellery catalogue and reviews' })).toBeTruthy()
        expect(within(competitions).getAllByText('2nd place')).toHaveLength(3)
        expect(within(competitions).getAllByText('Participation')).toHaveLength(2)
        expect(within(competitions).getByText('Team notFive, representing the Lipetsk Region.')).toBeTruthy()
        expect(within(competitions).getByRole('heading', { name: '“Code of Education” All-Russian Student Programming Competition' })).toBeTruthy()
    })
})
