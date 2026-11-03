<template>
    <figure>
        <div
            class="relative grid place-content-center overflow-hidden border border-portfolio-line bg-portrait before:absolute before:top-0 before:left-0 before:size-6 before:border-t before:border-l before:border-brand after:absolute after:right-0 after:bottom-0 after:size-6 after:border-r after:border-b after:border-brand"
            :class="compact ? 'aspect-square' : 'aspect-5/4 md:aspect-4/5'"
        >
            <span
                class="pr-2 font-interface leading-none font-medium tracking-[-0.12em] text-portfolio-muted opacity-20"
                aria-hidden="true"
                :class="compact ? 'text-6xl' : 'text-[86px]'"
            >{{ t('initials') }}</span>

            <span class="absolute inset-x-0 bottom-4 text-center font-mono text-[10px] tracking-[0.08em] text-portfolio-muted">
                {{ t('placeholder') }}
            </span>
        </div>

        <figcaption class="mt-3 flex justify-between gap-4 font-mono text-[10px] tracking-[0.05em] text-portfolio-muted uppercase">
            <span>{{ t('name') }}</span>

            <span v-if="!compact">KNIGOR</span>
        </figcaption>
    </figure>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineProps<{ compact?: boolean }>()

const { t } = useI18n()
</script>

<i18n locale="ru-RU">
{
    "initials": "ИК",
    "name": "Игорь Кретов",
    "placeholder": "Место для портрета"
}
</i18n>

<i18n locale="en-GB">
{
    "initials": "IK",
    "name": "Igor Kretov",
    "placeholder": "Portrait placeholder"
}
</i18n>
