<template>
    <div class="relative isolate mx-auto w-full max-w-248 font-profile text-portfolio-heading">
        <DecorativeOrbit variant="about" class="top-10 right-0 md:top-40 xl:-right-20" />

        <header class="pt-10 pb-9 md:pt-14 md:pb-12">
            <p class="mb-5 flex items-center gap-3 font-mono text-[10px] leading-5 tracking-[0.12em] text-brand uppercase before:h-px before:w-7 before:bg-brand md:mb-6 md:text-[11px]">
                {{ t('eyebrow') }}
            </p>

            <h1 class="text-5xl leading-[1.08] font-semibold tracking-[-0.055em] md:text-[64px]">
                {{ t('title') }}<span class="text-brand">.</span>
            </h1>

            <p class="mt-6 max-w-140 text-[15px] leading-[1.7] text-portfolio-text md:text-[17px]">
                {{ t('introduction') }}<br>
                {{ t('introductionDetails') }}
            </p>
        </header>

        <div class="pb-10 md:grid md:grid-cols-[11rem_minmax(0,1fr)] md:gap-14 md:pb-16">
            <aside class="hidden border-t border-brand pt-5 md:block">
                <PortraitPlaceholder compact class="mb-7" />

                <nav class="flex flex-col items-start gap-3 text-[11px] text-portfolio-muted" :aria-label="t('contents')">
                    <span class="mb-2 font-mono tracking-[0.12em] uppercase">{{ t('contents') }}</span>

                    <RouterLink
                        v-for="section in sections"
                        :key="section.key"
                        class="rounded-sm outline-none hover:text-brand focus-visible:ring-2 focus-visible:ring-brand"
                        :to="{ path: '/about', hash: `#${section.key}` }"
                    >
                        {{ t(`${section.key}.title`) }}
                    </RouterLink>
                </nav>
            </aside>

            <div class="min-w-0">
                <section
                    v-for="section in sections"
                    :id="section.key"
                    :key="section.key"
                    class="mt-7 border-t border-portfolio-line pt-6 first:mt-0 first:border-0 first:pt-0 md:mt-10 md:pt-8"
                    :aria-labelledby="`${section.key}-title`"
                >
                    <h2 :id="`${section.key}-title`" class="mb-5 text-[22px] leading-[1.4] font-medium tracking-[-0.03em] md:text-[23px]">
                        {{ t(`${section.key}.title`) }}
                    </h2>

                    <div class="space-y-4 text-sm leading-[1.95] text-portfolio-text">
                        <p v-for="paragraph in section.paragraphs" :key="paragraph">
                            {{ t(`${section.key}.paragraphs.${paragraph - 1}`) }}
                        </p>

                        <i18n-t v-if="section.key === 'hackathons'" keypath="personalProjects" tag="p">
                            <template #github>
                                <a
                                    href="https://github.com/Knigor"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="text-portfolio-heading underline decoration-brand underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-brand"
                                >{{ t('onGithub') }}</a>
                            </template>
                        </i18n-t>
                    </div>

                    <RouterLink v-if="section.key === 'outside'" to="/career" class="profile-link mt-5">
                        {{ t('careerLink') }}

                        <ArrowUpRight class="size-4" aria-hidden="true" />
                    </RouterLink>
                </section>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ArrowUpRight } from '@lucide/vue'
import { RouterLink } from 'vue-router'
import DecorativeOrbit from '@/components/DecorativeOrbit.vue'
import PortraitPlaceholder from '@/components/PortraitPlaceholder.vue'

import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const sections = [
    { key: 'work', paragraphs: 2 },
    { key: 'vue', paragraphs: 2 },
    { key: 'approach', paragraphs: 3 },
    { key: 'hackathons', paragraphs: 2 },
    { key: 'outside', paragraphs: 2 },
] as const
</script>

<i18n locale="ru-RU">
{
    "eyebrow": "За пределами резюме",
    "title": "Обо мне",
    "introduction": "Я Игорь, фронтенд-разработчик.",
    "introductionDetails": "Здесь — подробнее о работе, подходе к коду и том, что делаю вне рабочих задач.",
    "contents": "На этой странице",
    "work": {
        "title": "Чем занимаюсь",
        "paragraphs": [
            "Моя основная область — фронтенд. Сейчас я работаю в RetailCRM: разрабатываю веб-интерфейсы, участвую в развитии внутренней UI-библиотеки и встраиваемых компонентов. В повседневных задачах больше всего использую Vue и TypeScript.",
            "Мне интересно работать над интерфейсом целиком: от разметки и состояний компонентов до взаимодействия с API и проверки поведения в браузере. Особенно привлекают задачи, где небольшое изменение в общем компоненте делает удобнее сразу несколько частей продукта."
        ]
    },
    "vue": {
        "title": "Vue и интерфейсы",
        "paragraphs": [
            "У меня есть опыт с Vue 2 и Vue 3. В работе встречаются и новые функции, и существующий код, который нужно постепенно обновлять. Участвую в миграции на Vue 3 и рефакторинге компонентов, работаю с Vuex и Pinia, локализацией и разными способами подключения интерфейсов.",
            "Раньше разрабатывал интерфейс ИИ-ассистента на Vue 3 и Nuxt 3: чат, управление состоянием, переиспользуемые компоненты и адаптивную вёрстку. Был и опыт с React — в сервисе проверки документов. Но основной фокус сейчас остаётся на экосистеме Vue."
        ]
    },
    "approach": {
        "title": "Как работаю",
        "paragraphs": [
            "В коде ценю понятные имена, простую структуру и решения, соразмерные задаче. Для небольшого проекта мне достаточно нескольких ясных модулей. Повторяющуюся логику выношу отдельно, когда это действительно помогает работать с ней дальше.",
            "Обращаю внимание на детали интерфейса: как он ведёт себя при загрузке и ошибке, помещается ли перевод, можно ли пройти сценарий с клавиатуры. Стараюсь учитывать это в процессе разработки, вместе с основной функциональностью.",
            "Для проверки использую unit- и браузерные тесты. В тестах мне важнее поведение, которое видит пользователь: открыл меню, выбрал пункт, получил результат. Поэтому работаю с Vitest, Testing Library и Playwright."
        ]
    },
    "hackathons": {
        "title": "Хакатоны и личные проекты",
        "paragraphs": [
            "В хакатонных командах я занимаюсь фронтендом. Участвовал в региональных и всероссийских соревнованиях, представлял Липецкую область в составе команды notFive на чемпионате России по продуктовому программированию.",
            "Среди результатов — вторые места на IV региональном IT-хакатоне 2024 года, хакатоне по применению ИИ для адаптации первокурсников и чемпионате Липецкой области по спортивному программированию. Такой формат даёт возможность быстро проверить идею и собрать работающий интерфейс вместе с командой."
        ]
    },
    "personalProjects": "Личные проекты использую, чтобы пробовать инструменты на практике. Этот сайт — один из них: Vue, TypeScript, shadcn-vue, две темы и два языка. Другие проекты и исходный код собираю {github}.",
    "onGithub": "на GitHub",
    "outside": {
        "title": "Кроме кода",
        "paragraphs": [
            "На этом сайте мне хочется оставить место и для фотографий. Для них есть отдельная галерея: просто снимки, без длинных подписей и лишних элементов вокруг.",
            "А подробную историю работы и образование я вынес на страницу карьеры. Так здесь можно спокойно рассказать о себе, не превращая весь сайт в копию резюме."
        ]
    },
    "careerLink": "Перейти к опыту и образованию"
}
</i18n>

<i18n locale="en-GB">
{
    "eyebrow": "Beyond the CV",
    "title": "About me",
    "introduction": "I'm Igor, a frontend developer.",
    "introductionDetails": "Here is a little more about my work, my approach to code and what I do outside work.",
    "contents": "On this page",
    "work": {
        "title": "What I do",
        "paragraphs": [
            "My main area is frontend development. I currently work at RetailCRM, building web interfaces and contributing to an internal UI library and embeddable components. Vue and TypeScript are the tools I use most in my daily work.",
            "I enjoy working on an interface as a whole, from markup and component states to API integration and checking behaviour in the browser. I especially like tasks where a small change to a shared component improves several parts of a product at once."
        ]
    },
    "vue": {
        "title": "Vue and interfaces",
        "paragraphs": [
            "I have experience with both Vue 2 and Vue 3. My work includes new features as well as existing code that needs gradual updates. I help migrate applications to Vue 3 and refactor components, working with Vuex, Pinia, localisation and different ways of embedding interfaces.",
            "Previously, I built an AI assistant interface with Vue 3 and Nuxt 3, including chat, state management, reusable components and responsive layouts. I also worked with React on a document validation service. My main focus today remains the Vue ecosystem."
        ]
    },
    "approach": {
        "title": "How I work",
        "paragraphs": [
            "I value clear names, simple structure and solutions that fit the task. A small project can work well with a few straightforward modules. I extract repeated logic when doing so makes it easier to maintain.",
            "I pay attention to interface details: loading and error states, translated text fitting the layout and keyboard navigation. I try to consider these alongside the main functionality throughout development.",
            "I use unit and browser tests to check my work. In tests, I care most about behaviour the user sees: opening a menu, choosing an option and getting a result. I work with Vitest, Testing Library and Playwright."
        ]
    },
    "hackathons": {
        "title": "Hackathons and personal projects",
        "paragraphs": [
            "I take the frontend role in hackathon teams. I have participated in regional and national competitions and represented the Lipetsk Region with team notFive at the Russian Product Programming Championship.",
            "My results include second place at the 4th Regional IT Hackathon 2024, a hackathon on using AI for freshman onboarding, and the Lipetsk Region Competitive Programming Championship. These events are a chance to test an idea quickly and build a working interface with a team."
        ]
    },
    "personalProjects": "I use personal projects to try tools in practice. This site is one of them: Vue, TypeScript, shadcn-vue, two themes and two languages. I keep my other projects and source code {github}.",
    "onGithub": "on GitHub",
    "outside": {
        "title": "Beyond code",
        "paragraphs": [
            "I also want this site to have room for photographs. They have a gallery of their own: just images, without long captions or unnecessary elements around them.",
            "My detailed work history and education live on the career page. This leaves room here to talk about myself without turning the whole site into a copy of my CV."
        ]
    },
    "careerLink": "View experience and education"
}
</i18n>
