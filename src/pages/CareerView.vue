<template>
    <section class="mx-auto w-full max-w-200 pt-9 pb-10 font-portfolio md:pt-10 md:pb-12" aria-labelledby="career-title">
        <h1 id="career-title" class="border-b border-portfolio-line pb-3 font-mono text-[11px] leading-4 tracking-[1.6px] text-portfolio-muted uppercase">
            {{ t('career') }}
        </h1>

        <section class="mt-9 md:mt-11" aria-labelledby="experience-title">
            <h2 id="experience-title" class="font-mono text-[11px] leading-5 tracking-[1.5px] text-brand uppercase">
                {{ t('experience') }}
            </h2>

            <ol class="mt-7">
                <li
                    v-for="job in jobs"
                    :key="job.id"
                    class="relative pb-9 pl-6 last:pb-0 md:grid md:grid-cols-[8rem_minmax(0,1fr)] md:gap-x-10 md:pb-10 md:pl-0"
                >
                    <span class="absolute top-2 bottom-0 left-1 w-px -translate-x-1/2 bg-portfolio-line md:left-36" aria-hidden="true" />
                    <span
                        class="absolute top-2 left-0 size-2 rounded-full border md:left-35"
                        aria-hidden="true"
                        :class="job.end ? 'border-portfolio-muted bg-background' : 'border-brand bg-brand'"
                    />

                    <p
                        class="flex flex-wrap gap-x-1 font-mono text-[11px] leading-5 md:block md:pt-1"
                        :class="job.end ? 'text-portfolio-muted' : 'text-brand'"
                    >
                        <span><time :datetime="job.start">{{ t(`jobs.${job.id}.start`) }}</time> —</span>
                        <time v-if="job.end" class="md:block" :datetime="job.end">{{ t(`jobs.${job.id}.end`) }}</time>
                        <span v-else class="md:block">{{ t('present') }}</span>
                    </p>

                    <article class="mt-3 min-w-0 md:mt-0" :aria-labelledby="`${job.id}-title`">
                        <div class="flex flex-wrap items-center gap-x-4 gap-y-2">
                            <h3 :id="`${job.id}-title`" class="text-[21px] leading-[1.3] tracking-[-0.5px] text-portfolio-heading md:text-[23px]">
                                {{ t(`jobs.${job.id}.company`) }}
                            </h3>
                            <span v-if="!job.end" class="border border-brand/30 px-2 py-1 font-mono text-[10px] leading-4 text-brand">
                                {{ t('current') }}
                            </span>
                        </div>
                        <p class="mt-2 text-sm leading-[1.75] text-portfolio-text">
                            {{ t(`jobs.${job.id}.role`) }}
                        </p>
                        <p class="mt-4 max-w-139 text-sm leading-[1.75] text-portfolio-text md:mt-5">
                            {{ t(`jobs.${job.id}.description`) }}
                        </p>

                        <h4 class="mt-5 text-xs leading-5 text-portfolio-heading">
                            {{ t('highlights') }}
                        </h4>
                        <ul class="mt-2 list-[circle] space-y-2 pl-4 text-[13px] leading-[1.75] text-portfolio-text marker:text-brand">
                            <li v-for="highlight in job.highlights" :key="highlight">
                                {{ t(`jobs.${job.id}.highlights.${highlight}`) }}
                            </li>
                        </ul>

                        <div class="mt-5 flex items-start gap-3 font-mono text-[10px] leading-4">
                            <span :id="`${job.id}-stack`" class="shrink-0 py-1 text-portfolio-muted">{{ t('stack') }}</span>
                            <ul class="flex min-w-0 flex-wrap gap-2 md:gap-2" :aria-labelledby="`${job.id}-stack`">
                                <li v-for="technology in job.stack" :key="technology" class="rounded-xs bg-muted px-2 py-1 text-portfolio-text">
                                    {{ technology }}
                                </li>
                            </ul>
                        </div>
                    </article>
                </li>
            </ol>
        </section>

        <section class="mt-10 border-t border-portfolio-line pt-7" aria-labelledby="education-title">
            <h2 id="education-title" class="font-mono text-[11px] leading-5 tracking-[1.5px] text-brand uppercase">
                {{ t('education') }}
            </h2>
            <div class="mt-7 grid gap-3 md:grid-cols-[8rem_minmax(0,1fr)] md:gap-x-10">
                <p class="font-mono text-[11px] leading-5 text-portfolio-muted md:pt-1">
                    <time datetime="2025">2025</time>
                </p>
                <div>
                    <h3 class="text-xl leading-[1.3] tracking-[-0.5px] text-portfolio-heading">
                        {{ t('university') }}
                    </h3>
                    <p class="mt-2 text-sm leading-[1.75] text-portfolio-text">
                        {{ t('speciality') }}
                    </p>
                    <p class="mt-1 text-xs leading-5 text-portfolio-muted">
                        {{ t('faculty') }}
                    </p>
                    <p class="mt-1 text-xs leading-5 text-portfolio-muted">
                        {{ t('educationLevel') }}
                    </p>
                </div>
            </div>
        </section>
    </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const jobs = [
    {
        id: 'retailcrm',
        start: '2025-06',
        end: null,
        highlights: ['components', 'migration', 'testing'],
        stack: ['Vue 2 / 3', 'TypeScript', 'JavaScript', 'Vuex', 'Pinia', 'GraphQL', 'LESS', 'CSS Modules', 'vue-i18n', 'Module Federation', 'Vitest', 'Vue Test Utils', 'Testing Library'],
    },
    {
        id: 'itc',
        start: '2024-07',
        end: '2025-05',
        highlights: ['assistant', 'documents', 'components'],
        stack: ['Vue 3', 'Nuxt 3', 'TypeScript', 'Pinia', 'Tailwind CSS', 'shadcn-vue', 'React', 'JavaScript'],
    },
    {
        id: 'payments',
        start: '2022-09',
        end: '2024-07',
        highlights: ['benefits', 'contract'],
        stack: ['PostgreSQL', 'SQL', 'ВКУ'],
    },
]
</script>

<i18n locale="ru-RU">
{
    "career": "Карьера",
    "title": "Опыт и образование",
    "introduction": "От электронных государственных услуг к разработке интерфейсов на Vue.",
    "experience": "Опыт работы",
    "highlights": "Задачи и достижения",
    "stack": "Стек",
    "present": "настоящее время",
    "current": "Сейчас",
    "education": "Образование",
    "university": "Липецкий государственный технический университет",
    "speciality": "Информатика и вычислительная техника",
    "faculty": "Факультет автоматизации и информатики",
    "educationLevel": "Высшее образование · Липецк",
    "jobs": {
        "retailcrm": {
            "company": "RetailCRM",
            "role": "Фронтенд-разработчик",
            "start": "Июнь 2025",
            "description": "Разрабатываю и поддерживаю веб-интерфейсы RetailCRM: от вёрстки макетов до запуска новых функций в продакшене.",
            "highlights": {
                "components": "Развиваю внутреннюю UI-библиотеку, разрабатываю API и встраиваемые компоненты embed-ui для расширения интерфейса RetailCRM.",
                "migration": "Провожу рефакторинг и постепенно перевожу код с Vue 2 на Vue 3.",
                "testing": "Покрываю код unit-, e2e- и browser-mode тестами."
            }
        },
        "itc": {
            "company": "ОБУ «Информационно-технический центр»",
            "role": "Фронтенд-разработчик · Vue / Nuxt / React",
            "start": "Июль 2024",
            "end": "Май 2025",
            "description": "Разрабатывал внутренние приложения для организаций государственного сектора Липецкой области: ИИ-ассистента и сервис проверки документов.",
            "highlights": {
                "assistant": "Февраль — май 2025: разрабатывал интерфейс ИИ-ассистента на Vue 3 и Nuxt 3, взаимодействие с чат-ботом и управление состоянием приложения.",
                "documents": "Июль 2024 — январь 2025: работал над приложением на React для проверки документов — загрузкой таблиц, фильтрацией, отображением корректных и некорректных значений.",
                "components": "Создавал переиспользуемые UI-компоненты и адаптивную вёрстку по макетам интерфейсов."
            }
        },
        "payments": {
            "company": "ОКУ «Центр государственных выплат и кадровой работы»",
            "role": "Администратор баз данных",
            "start": "Сентябрь 2022",
            "end": "Июль 2024",
            "description": "Поддерживал базы данных PostgreSQL и работал с SQL. Разрабатывал электронные услуги в конструкторе ВКУ, проектировал макеты и путь пользователя, участвовал в тестировании и запуске услуг.",
            "highlights": {
                "benefits": "Разработал и запустил на портале «Госуслуги» услугу назначения ежемесячной денежной выплаты региональным льготникам.",
                "contract": "Разработал и запустил услугу предоставления государственной социальной помощи на основании социального контракта."
            }
        }
    }
}
</i18n>

<i18n locale="en-GB">
{
    "career": "Career",
    "title": "Experience and education",
    "introduction": "From digital public services to building interfaces with Vue.",
    "experience": "Work experience",
    "highlights": "Responsibilities and achievements",
    "stack": "Stack",
    "present": "Present",
    "current": "Current",
    "education": "Education",
    "university": "Lipetsk State Technical University",
    "speciality": "Computer Science and Computer Engineering",
    "faculty": "Faculty of Automation and Informatics",
    "educationLevel": "Higher education · Lipetsk",
    "jobs": {
        "retailcrm": {
            "company": "RetailCRM",
            "role": "Frontend developer",
            "start": "June 2025",
            "description": "I develop and maintain RetailCRM web interfaces, from implementing designs to shipping new features to production.",
            "highlights": {
                "components": "I develop the internal UI library, APIs and embeddable embed-ui components that extend the RetailCRM interface.",
                "migration": "I refactor existing code and gradually migrate it from Vue 2 to Vue 3.",
                "testing": "I write unit, end-to-end and browser-mode tests."
            }
        },
        "itc": {
            "company": "Information Technology Centre",
            "role": "Frontend developer · Vue / Nuxt / React",
            "start": "July 2024",
            "end": "May 2025",
            "description": "I developed internal applications for public sector organisations in the Lipetsk region: an AI assistant and a document validation tool.",
            "highlights": {
                "assistant": "February–May 2025: developed an AI assistant interface with Vue 3 and Nuxt 3, including chatbot interaction and application state management.",
                "documents": "July 2024–January 2025: worked on a React document validation application, including table uploads, filtering and highlighting valid and invalid values.",
                "components": "Built reusable UI components and responsive layouts from interface designs."
            }
        },
        "payments": {
            "company": "Centre for State Payments and Personnel Management",
            "role": "Database administrator",
            "start": "September 2022",
            "end": "July 2024",
            "description": "I maintained PostgreSQL databases and worked with SQL. I developed digital public services using the VKU visual builder, designed interfaces and user journeys, and took part in testing and launches.",
            "highlights": {
                "benefits": "Developed and launched a service on the Gosuslugi portal for granting monthly payments to eligible regional benefit recipients.",
                "contract": "Developed and launched a service for providing state social assistance under a social contract."
            }
        }
    }
}
</i18n>
