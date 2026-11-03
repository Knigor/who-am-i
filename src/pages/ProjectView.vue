<template>
    <section class="mx-auto w-full max-w-200 pt-9 pb-10 font-portfolio md:pt-10 md:pb-12" aria-labelledby="projects-title">
        <h1 id="projects-title" class="font-display text-[38px] leading-12 font-medium tracking-[-1.2px] text-brand">
            {{ t('title') }}
        </h1>
        <p class="mt-4 text-base leading-7 text-portfolio-text">
            {{ t('introduction') }}
        </p>

        <ul class="mt-10 divide-y divide-brand/40 border-y border-brand" :aria-label="t('personalProjects')">
            <li v-for="project in projects" :key="project.id">
                <a
                    class="group flex items-start justify-between gap-6 py-6 outline-none transition-colors hover:bg-brand/5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
                    target="_blank"
                    rel="noopener noreferrer"
                    :href="project.href"
                    :aria-labelledby="`${project.id}-title`"
                >
                    <div class="min-w-0">
                        <h2 :id="`${project.id}-title`" class="text-xl leading-8 text-portfolio-heading group-hover:text-brand">
                            {{ t(`projects.${project.id}.name`) }}
                        </h2>
                        <p class="mt-2 text-[15px] leading-7 text-portfolio-text">
                            {{ t(`projects.${project.id}.description`) }}
                        </p>
                        <ul class="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-[13px] leading-6 text-portfolio-muted" :aria-label="t('stack')">
                            <li v-for="(technology, index) in project.stack" :key="technology" class="flex gap-3">
                                <span v-if="index > 0" aria-hidden="true">·</span>
                                {{ technology }}
                            </li>
                        </ul>
                    </div>
                    <ArrowUpRight class="mt-1 size-4 shrink-0 text-portfolio-heading group-hover:text-brand" aria-hidden="true" />
                </a>
            </li>
        </ul>

        <section class="mt-12 md:mt-16" aria-labelledby="hackathons-title">
            <h2 id="hackathons-title" class="font-mono text-[11px] leading-5 tracking-[1.5px] text-brand uppercase">
                {{ t('hackathons') }}
            </h2>
            <p class="mt-4 max-w-160 text-sm leading-6 text-portfolio-text">
                {{ t('community') }}
            </p>

            <ul class="mt-6 divide-y divide-portfolio-line" :aria-label="t('competitionsLabel')">
                <li
                    v-for="competition in competitions"
                    :key="competition.id"
                    class="grid gap-3 py-5 md:grid-cols-[8rem_minmax(0,1fr)] md:gap-8"
                >
                    <p class="font-mono text-[11px] leading-6" :class="competition.prize ? 'text-brand' : 'text-portfolio-muted'">
                        {{ t(competition.prize ? 'secondPlace' : 'participant') }}
                    </p>
                    <div class="min-w-0">
                        <h3 class="text-base leading-6 text-portfolio-heading">
                            {{ t(`competitions.${competition.id}.name`) }}
                        </h3>
                        <p v-if="competition.id === 'russianChampionship'" class="mt-2 text-sm leading-6 text-portfolio-text">
                            {{ t('competitions.russianChampionship.team') }}
                        </p>
                    </div>
                </li>
            </ul>
        </section>
    </section>
</template>

<script setup lang="ts">
import { ArrowUpRight } from '@lucide/vue'

import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const projects = [
    {
        id: 'portfolio',
        href: 'https://github.com/Knigor/who-am-i',
        stack: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'shadcn-vue', 'Vitest'],
    },
    {
        id: 'proposals',
        href: 'https://github.com/Knigor/online-proposal-builder-for-medical-is-frontend-service',
        stack: ['Vue 3', 'Nuxt 3', 'Pinia', 'Tailwind CSS', 'jsPDF'],
    },
    {
        id: 'jewellery',
        href: 'https://github.com/Knigor/jewerly-tone-reviews-is-frontend',
        stack: ['Vue 3', 'Nuxt 3', 'TypeScript', 'Pinia', 'Tailwind CSS'],
    },
]
const competitions = [
    { id: 'regionalHackathon', prize: true },
    { id: 'onboarding', prize: true },
    { id: 'lipetskChampionship', prize: true },
    { id: 'russianChampionship', prize: false },
    { id: 'educationCode', prize: false },
]
</script>

<i18n locale="ru-RU">
{
    "title": "Проекты",
    "introduction": "Личные проекты и опыт командной разработки на хакатонах.",
    "personalProjects": "Личные проекты",
    "stack": "Технологии",
    "hackathons": "Хакатоны и соревнования",
    "community": "Участвую в региональных и всероссийских хакатонах и соревнованиях по программированию. В хакатонных командах занимаюсь фронтенд-разработкой.",
    "competitionsLabel": "Результаты и участие в соревнованиях",
    "secondPlace": "2-е место",
    "participant": "Участие",
    "projects": {
        "portfolio": {
            "name": "who-am-i",
            "description": "Этот сайт: обо мне, моём опыте и проектах. Светлая и тёмная темы, русский и английский языки, адаптивная вёрстка."
        },
        "proposals": {
            "name": "Конструктор коммерческих предложений",
            "description": "Фронтенд конструктора предложений для медицинской информационной системы: подбор продуктов и лицензий, расчёт стоимости со скидками и экспорт в PDF."
        },
        "jewellery": {
            "name": "Каталог украшений и отзывы",
            "description": "Интерфейс каталога ювелирных изделий: карточки товаров, корзина, оценки и отзывы покупателей, управление заказами и отзывами."
        }
    },
    "competitions": {
        "regionalHackathon": {
            "name": "4-й региональный IT-хакатон — 2024"
        },
        "onboarding": {
            "name": "Хакатон «Использование ИИ для адаптации первокурсников»"
        },
        "lipetskChampionship": {
            "name": "Чемпионат Липецкой области по спортивному программированию"
        },
        "russianChampionship": {
            "name": "Чемпионат России по продуктовому программированию",
            "team": "Команда notFive, представляли Липецкую область."
        },
        "educationCode": {
            "name": "Всероссийский студенческий конкурс по программированию «Код образования»"
        }
    }
}
</i18n>

<i18n locale="en-GB">
{
    "title": "Projects",
    "introduction": "Personal projects and experience building with hackathon teams.",
    "personalProjects": "Personal projects",
    "stack": "Technologies",
    "hackathons": "Hackathons and competitions",
    "community": "I participate in regional and national hackathons and programming competitions, working as a frontend developer in hackathon teams.",
    "competitionsLabel": "Competition results and participation",
    "secondPlace": "2nd place",
    "participant": "Participation",
    "projects": {
        "portfolio": {
            "name": "who-am-i",
            "description": "This website: my background, experience and projects. Light and dark themes, Russian and English, and responsive layouts."
        },
        "proposals": {
            "name": "Commercial proposal builder",
            "description": "A frontend for building proposals for a medical information system: product and licence selection, pricing with discounts, and PDF export."
        },
        "jewellery": {
            "name": "Jewellery catalogue and reviews",
            "description": "A jewellery catalogue interface with product pages, a shopping cart, customer ratings and reviews, and order and review management."
        }
    },
    "competitions": {
        "regionalHackathon": {
            "name": "4th Regional IT Hackathon — 2024"
        },
        "onboarding": {
            "name": "Hackathon: “Using AI for Freshman Onboarding”"
        },
        "lipetskChampionship": {
            "name": "Lipetsk Region Competitive Programming Championship"
        },
        "russianChampionship": {
            "name": "Russian Product Programming Championship",
            "team": "Team notFive, representing the Lipetsk Region."
        },
        "educationCode": {
            "name": "“Code of Education” All-Russian Student Programming Competition"
        }
    }
}
</i18n>
