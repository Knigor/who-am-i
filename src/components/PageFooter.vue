<template>
    <footer class="shrink-0 px-6 font-profile md:px-12">
        <div class="mx-auto w-full max-w-248 border-t border-portfolio-line pt-7 pb-6 md:pt-10">
            <div class="grid gap-6 md:grid-cols-[1fr_1.5fr] md:gap-10">
                <div>
                    <h2 class="text-[25px] font-medium tracking-[-0.04em] text-portfolio-heading">
                        {{ t('contacts') }}
                    </h2>

                    <p class="mt-3 max-w-60 text-xs leading-5 text-portfolio-text">
                        {{ t('contactDescription') }}
                    </p>
                </div>

                <div class="grid grid-cols-2 gap-6 md:gap-8">
                    <a
                        v-for="contact in contacts"
                        :key="contact.name"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="border-b border-portfolio-line pt-1 pb-4 font-interface outline-none hover:text-brand focus-visible:ring-2 focus-visible:ring-brand"
                        :href="contact.href"
                    >
                        <span class="flex items-center justify-between gap-3 text-base">
                            {{ contact.name }}

                            <ArrowUpRight class="size-4 shrink-0" aria-hidden="true" />
                        </span>

                        <span class="mt-1 block font-mono text-[11px] leading-5 text-portfolio-muted">{{ t(contact.description) }}</span>
                    </a>
                </div>
            </div>

            <div class="mt-8 flex items-center justify-between gap-4 font-mono text-[9px] leading-4 text-portfolio-muted md:mt-13 md:text-[10px]">
                <p>© {{ year }} {{ t('name') }}</p>

                <a
                    href="https://github.com/Knigor/who-am-i"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex min-h-11 items-center gap-2 rounded-sm outline-none hover:text-brand focus-visible:ring-2 focus-visible:ring-brand"
                >
                    {{ t('source') }}

                    <ArrowUpRight class="size-3" aria-hidden="true" />
                </a>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { ArrowUpRight } from '@lucide/vue'

import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const year = new Date().getFullYear()
const contacts = [
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/knigor/', description: 'getInTouch' },
    { name: 'GitHub', href: 'https://github.com/Knigor', description: 'codeAndProjects' },
]
</script>

<i18n locale="ru-RU">
{
    "contacts": "Контакты",
    "contactDescription": "По вопросам работы и совместных проектов.",
    "getInTouch": "Связаться со мной",
    "codeAndProjects": "Код и проекты",
    "name": "Игорь Кретов",
    "source": "Исходный код"
}
</i18n>

<i18n locale="en-GB">
{
    "contacts": "Contact",
    "contactDescription": "For work enquiries and projects together.",
    "getInTouch": "Get in touch",
    "codeAndProjects": "Code and projects",
    "name": "Igor Kretov",
    "source": "Source code"
}
</i18n>
