<template>
    <div class="relative isolate mx-auto w-full max-w-248 font-profile text-portfolio-heading">
        <DecorativeOrbit variant="home" class="top-60 right-0 md:top-24 xl:-right-30" />

        <section class="py-10 pb-11 md:grid md:grid-cols-[minmax(0,1fr)_14.5rem] md:items-center md:gap-16 md:pt-19 md:pb-22" aria-labelledby="home-title">
            <div class="min-w-0">
                <p class="mb-5 flex items-center gap-3 font-mono text-[10px] leading-5 tracking-[0.12em] text-brand uppercase before:h-px before:w-7 before:shrink-0 before:bg-brand md:mb-6 md:text-[11px]">
                    {{ t('role') }}
                </p>

                <h1 id="home-title" class="text-[clamp(42px,11vw,64px)] leading-[1.08] font-semibold tracking-[-0.055em] md:text-7xl">
                    {{ t('firstName') }} {{ t('lastName') }}
                </h1>

                <i18n-t keypath="introduction" tag="p" class="mt-6 max-w-125 text-[15px] leading-[1.85] text-portfolio-text md:mt-7 md:text-base md:leading-[1.9]">
                    <template #stack>
                        <strong class="font-medium text-portfolio-heading">Vue {{ t('and') }} TypeScript</strong>
                    </template>
                </i18n-t>

                <div class="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4 font-interface">
                    <Button as-child variant="outline" class="h-11 gap-6 rounded-none border-brand bg-background px-4 text-xs font-normal shadow-none hover:bg-brand/10 dark:border-brand dark:bg-background dark:hover:bg-brand/10">
                        <RouterLink to="/about">
                            {{ t('aboutLink') }}

                            <ArrowUpRight class="size-4" aria-hidden="true" />
                        </RouterLink>
                    </Button>

                    <RouterLink to="/projects" class="profile-link">
                        {{ t('projectsLink') }}

                        <ArrowUpRight class="size-4" aria-hidden="true" />
                    </RouterLink>
                </div>

                <ul class="mt-7 flex flex-wrap gap-x-3 gap-y-2 font-mono text-[11px] text-portfolio-muted" :aria-label="t('stack')">
                    <li v-for="(technology, index) in stack" :key="technology" class="flex gap-3">
                        <span v-if="index" class="text-brand" aria-hidden="true">/</span>

                        {{ technology }}
                    </li>
                </ul>
            </div>

            <PortraitPlaceholder class="mt-10 w-full max-w-68 md:mt-0" />
        </section>

        <section class="border-t border-portfolio-line pt-7 pb-9 md:pt-9 md:pb-15" aria-labelledby="directions-title">
            <div class="mb-7 flex items-center justify-between gap-6 md:mb-9">
                <h2 id="directions-title" class="text-[25px] leading-[1.3] font-medium tracking-[-0.04em]">
                    {{ t('directionsTitle') }}
                </h2>

                <span class="hidden font-mono text-[11px] tracking-[0.12em] text-portfolio-muted uppercase md:block">{{ t('directionsLabel') }}</span>
            </div>

            <div class="grid gap-7 md:grid-cols-3 md:gap-8">
                <article v-for="(direction, index) in directions" :key="direction" class="grid grid-cols-[1.75rem_1fr] gap-x-4 md:block">
                    <span class="row-span-3 mt-1 font-mono text-[11px] text-brand md:mt-0 md:mb-5 md:block">0{{ index + 1 }}</span>

                    <h3 class="mb-2 text-base leading-6 font-medium tracking-[-0.02em] md:mb-3">
                        {{ t(`${direction}.title`) }}
                    </h3>

                    <p class="col-start-2 text-[13px] leading-[1.85] text-portfolio-text">
                        {{ t(`${direction}.description`) }}
                    </p>

                    <p class="col-start-2 mt-3 font-mono text-[10px] leading-[1.8] text-portfolio-muted md:mt-5">
                        {{ t(`${direction}.technologies`) }}
                    </p>
                </article>
            </div>
        </section>

        <div class="flex flex-col items-start justify-between gap-3 border-t border-portfolio-line py-6 md:flex-row md:items-center md:gap-6">
            <p class="text-[13px] leading-6 text-portfolio-text">
                <span class="mr-3 font-mono text-[11px] tracking-[0.12em] text-brand uppercase">{{ t('now') }}</span>
                {{ t('currentRole') }} <strong class="font-medium text-portfolio-heading">RetailCRM</strong>
            </p>

            <RouterLink to="/career" class="profile-link shrink-0">
                {{ t('careerLink') }}

                <ArrowUpRight class="size-4" aria-hidden="true" />
            </RouterLink>
        </div>

        <section class="grid gap-6 border-t border-portfolio-line py-8 md:grid-cols-[1fr_1.5fr] md:gap-10 md:pt-11 md:pb-14" aria-labelledby="personal-title">
            <h2 id="personal-title" class="text-[25px] leading-[1.4] font-medium tracking-[-0.04em]">
                {{ t('personalTitle') }}<br>{{ t('personalTitleEnd') }}
            </h2>

            <div>
                <p class="mb-5 text-sm leading-[1.7] text-portfolio-text">
                    {{ t('personalDescription') }}
                </p>

                <RouterLink to="/about" class="profile-link">
                    {{ t('readAbout') }}

                    <ArrowUpRight class="size-4" aria-hidden="true" />
                </RouterLink>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ArrowUpRight } from '@lucide/vue'
import { RouterLink } from 'vue-router'
import { Button } from '@/components/ui/button'
import DecorativeOrbit from '@/components/DecorativeOrbit.vue'
import PortraitPlaceholder from '@/components/PortraitPlaceholder.vue'

import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const stack = ['Vue 3', 'TypeScript', 'Nuxt', 'Vitest']
const directions = ['interfaces', 'components', 'testing'] as const
</script>

<i18n locale="ru-RU">
{
    "role": "Фронтенд-разработчик",
    "firstName": "Игорь",
    "lastName": "Кретов",
    "and": "и",
    "introduction": "Разрабатываю интерфейсы на {stack}. Работаю над продуктом, общими компонентами и кодом, который удобно развивать.",
    "aboutLink": "Подробнее обо мне",
    "projectsLink": "Мои проекты",
    "stack": "Технологии",
    "directionsTitle": "Основные направления",
    "directionsLabel": "То, над чем работаю",
    "interfaces": {
        "title": "Продуктовые интерфейсы",
        "description": "Разрабатываю новые функции, связываю интерфейс с API и адаптирую его под разные экраны.",
        "technologies": "Vue · Nuxt · TypeScript"
    },
    "components": {
        "title": "Общие UI-компоненты",
        "description": "Развиваю библиотеку компонентов и встраиваемые интерфейсы. Работаю с локализацией и состояниями UI.",
        "technologies": "Компоненты · vue-i18n · Module Federation"
    },
    "testing": {
        "title": "Развитие и тестирование",
        "description": "Участвую в переходе с Vue 2 на Vue 3, рефакторю код и покрываю пользовательские сценарии тестами.",
        "technologies": "Vitest · Testing Library · Playwright"
    },
    "now": "Сейчас",
    "currentRole": "Фронтенд-разработчик в",
    "careerLink": "Карьера",
    "personalTitle": "Немного больше",
    "personalTitleEnd": "обо мне",
    "personalDescription": "Помимо работы, участвую в хакатонах и делаю личные проекты. Здесь собираю свой опыт, код и фотографии - всё, чему хочется оставить отдельное место.",
    "readAbout": "Читать обо мне"
}
</i18n>

<i18n locale="en-GB">
{
    "role": "Frontend developer",
    "firstName": "Igor",
    "lastName": "Kretov",
    "and": "and",
    "introduction": "I build interfaces with {stack}. I work on product features, shared components and code that is easy to maintain.",
    "aboutLink": "More about me",
    "projectsLink": "My projects",
    "stack": "Technologies",
    "directionsTitle": "Main areas of work",
    "directionsLabel": "What I work on",
    "interfaces": {
        "title": "Product interfaces",
        "description": "I develop new features, connect interfaces to APIs and adapt them to different screen sizes.",
        "technologies": "Vue · Nuxt · TypeScript"
    },
    "components": {
        "title": "Shared UI components",
        "description": "I develop a component library and embeddable interfaces, working with localisation and UI states.",
        "technologies": "Components · vue-i18n · Module Federation"
    },
    "testing": {
        "title": "Maintenance and testing",
        "description": "I help migrate Vue 2 to Vue 3, refactor code and cover user journeys with tests.",
        "technologies": "Vitest · Testing Library · Playwright"
    },
    "now": "Now",
    "currentRole": "Frontend developer at",
    "careerLink": "Career",
    "personalTitle": "A little more",
    "personalTitleEnd": "about me",
    "personalDescription": "Outside work, I take part in hackathons and build personal projects. This site brings together my experience, code and photographs - things I want to give a space of their own.",
    "readAbout": "Read about me"
}
</i18n>
