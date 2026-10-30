<template>
  <header class="shrink-0">
    <div class="mx-auto flex min-h-22 w-full max-w-300 items-center justify-between gap-6 px-6 md:min-h-26.5 md:px-12">
      <RouterLink
        to="/"
        :aria-label="t('homeLabel')"
        class="rounded-sm font-serif text-4xl italic tracking-tighter outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        k<span class="text-muted-foreground">.</span>
      </RouterLink>

      <nav class="hidden items-center gap-1 md:flex" :aria-label="t('navigationLabel')">
        <template v-for="item in navigation" :key="item.key">
          <Button
            v-if="hasPage(item.to)"
            as-child
            variant="ghost"
            class="h-11 px-3 font-normal text-muted-foreground"
          >
            <RouterLink :to="item.to" :aria-current="route.path === item.to ? 'page' : undefined">
              {{ t(item.key) }}
            </RouterLink>
          </Button>

          <Button
            v-else
            variant="ghost"
            disabled
            class="h-11 px-3 font-normal"
            :title="t('comingSoon')"
          >
            {{ t(item.key) }}
          </Button>
        </template>

        <Button
          :as-child="hasPage('/photos')"
          :disabled="!hasPage('/photos')"
          variant="ghost"
          size="icon"
          class="size-11 text-muted-foreground"
          :aria-label="t('photos')"
          :title="hasPage('/photos') ? t('photos') : t('comingSoon')"
        >
          <RouterLink v-if="hasPage('/photos')" to="/photos">
            <Camera aria-hidden="true" />
          </RouterLink>

          <Camera v-else aria-hidden="true" />
        </Button>

        <Button
          v-for="social in socials"
          :key="social.name"
          :as="social.href ? 'a' : 'button'"
          :href="social.href"
          :disabled="!social.href"
          :target="social.href ? '_blank' : undefined"
          :rel="social.href ? 'noopener noreferrer' : undefined"
          :aria-label="social.label"
          :title="social.href ? social.label : t('linkPending')"
          variant="ghost"
          size="icon"
          class="size-11 text-muted-foreground"
        >
          <component :is="social.icon" aria-hidden="true" />
        </Button>

        <span class="mx-2 h-4 w-px bg-border" aria-hidden="true" />

        <Button
          variant="ghost"
          size="icon"
          class="size-11 text-muted-foreground"
          :aria-label="themeLabel"
          :title="themeLabel"
          @click="toggleTheme"
        >
          <Sun v-if="mode === 'dark'" aria-hidden="true" />
          <Moon v-else aria-hidden="true" />
        </Button>

        <div class="ml-2 flex gap-1 border-l pl-3" role="group" :aria-label="t('language')">
          <Button
            v-for="language in languages"
            :key="language.value"
            variant="ghost"
            class="h-11 w-10 px-0 font-mono text-xs text-muted-foreground"
            :class="{ 'bg-brand/10': locale === language.value }"
            :aria-label="language.name"
            :aria-pressed="locale === language.value"
            @click="locale = language.value"
          >
            {{ language.label }}
          </Button>
        </div>
      </nav>

      <DropdownMenu v-model:open="menuOpen" :modal="false">
        <DropdownMenuTrigger as-child>
          <Button
            variant="outline"
            size="icon"
            class="size-11 rounded-sm data-[state=open]:border-brand md:hidden"
            :aria-label="t('menu')"
          >
            <Menu class="size-6" aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          :side-offset="10"
          :collision-padding="16"
          class="w-60 max-w-[calc(100vw-2rem)] rounded-sm border-t-brand bg-background p-2 md:hidden"
          @close-auto-focus="event => { if (isDesktop) event.preventDefault() }"
        >
          <DropdownMenuItem
            v-for="item in navigation"
            :key="item.key"
            :as-child="hasPage(item.to)"
            :disabled="!hasPage(item.to)"
            :title="hasPage(item.to) ? undefined : t('comingSoon')"
            :class="{ 'bg-brand/10 text-brand': route.path === item.to }"
          >
            <RouterLink
              v-if="hasPage(item.to)"
              :to="item.to"
              :aria-current="route.path === item.to ? 'page' : undefined"
            >
              {{ t(item.key) }}
            </RouterLink>

            <template v-else>
              {{ t(item.key) }}
            </template>
          </DropdownMenuItem>

          <DropdownMenuItem :as-child="hasPage('/photos')" :disabled="!hasPage('/photos')">
            <RouterLink v-if="hasPage('/photos')" to="/photos">
              <Camera aria-hidden="true" /> {{ t('photos') }}
            </RouterLink>

            <template v-else>
              <Camera aria-hidden="true" /> {{ t('photos') }}
            </template>
          </DropdownMenuItem>

          <DropdownMenuSeparator class="my-2 h-px bg-border" />

          <div class="grid grid-cols-3 gap-1">
            <DropdownMenuItem
              v-for="social in socials"
              :key="social.name"
              :as-child="Boolean(social.href)"
              :disabled="!social.href"
              :aria-label="social.label"
              :title="social.href ? social.label : t('linkPending')"
              class="justify-center"
            >
              <a
                v-if="social.href"
                :href="social.href"
                target="_blank"
                rel="noopener noreferrer"
              >
                <component :is="social.icon" aria-hidden="true" />
              </a>
              <component :is="social.icon" v-else aria-hidden="true" />
            </DropdownMenuItem>

            <DropdownMenuItem
              class="justify-center"
              :aria-label="themeLabel"
              :title="themeLabel"
              @select.prevent="toggleTheme"
            >
              <Sun v-if="mode === 'dark'" aria-hidden="true" />

              <Moon v-else aria-hidden="true" />
            </DropdownMenuItem>
          </div>

          <DropdownMenuSeparator class="my-2 h-px bg-border" />

          <DropdownMenuRadioGroup v-model="locale" class="flex items-center justify-between gap-2">
            <DropdownMenuLabel class="px-3 text-sm text-muted-foreground">
              {{ t('language') }}
            </DropdownMenuLabel>

            <div class="flex gap-1">
              <DropdownMenuRadioItem
                v-for="language in languages"
                :key="language.value"
                :value="language.value"
                :aria-label="language.name"
                class="flex size-11 cursor-pointer items-center justify-center rounded-sm font-mono text-xs outline-none data-[highlighted]:bg-accent data-[state=checked]:bg-brand/10 data-[state=checked]:text-brand"
                @select.prevent
              >
                {{ language.label }}
              </DropdownMenuRadioItem>
            </div>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { LucideIcon, Menu, Moon, Sun } from '@lucide/vue'

import { computed, ref, watch } from 'vue'

import { BriefcaseBusiness, Camera, CodeXml } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { useRoute, useRouter } from 'vue-router'
import { useColorMode, useMediaQuery } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { locale } = useI18n({ useScope: 'global' })
const route = useRoute()
const router = useRouter()
const mode = useColorMode({ initialValue: 'dark', disableTransition: false })

const menuOpen = ref(false)
const isDesktop = useMediaQuery('(min-width: 768px)')
const themeLabel = computed(() => t(mode.value === 'dark' ? 'lightTheme' : 'darkTheme'))
const navigation = [
  { key: 'home', to: '/' },
  { key: 'projects', to: '/projects' },
  { key: 'career', to: '/career' },
]
const languages = [
  { value: 'ru-RU', label: 'RU', name: 'Русский' },
  { value: 'en-GB', label: 'EN', name: 'English' },
]
const socials = ref<{
  name: string;
  icon: LucideIcon;
  label: string;
  href: string
}[]>([
  { name: 'github', icon: CodeXml, label: 'GitHub', href: 'https://github.com/Knigor' },
  { name: 'linkedin', icon: BriefcaseBusiness, label: 'LinkedIn', href: 'https://www.linkedin.com/in/knigor/' },
])

function hasPage(path: string) {
  return router.getRoutes().some(record => record.path === path)
}

function toggleTheme() {
  mode.value = mode.value === 'dark' ? 'light' : 'dark'
}

watch(isDesktop, (desktop) => {
  if (desktop) menuOpen.value = false
})
watch(() => route.fullPath, () => { menuOpen.value = false })
watch(locale, value => { document.documentElement.lang = value }, { immediate: true })
</script>

<i18n locale="ru-RU">
{
  "home": "Обо мне",
  "projects": "Проекты",
  "career": "Карьера",
  "photos": "Фото",
  "homeLabel": "Knigor — на главную",
  "navigationLabel": "Основная навигация",
  "menu": "Меню",
  "language": "Язык",
  "lightTheme": "Включить светлую тему",
  "darkTheme": "Включить тёмную тему",
  "comingSoon": "Страница пока не добавлена",
  "linkPending": "Ссылка пока не добавлена"
}
</i18n>

<i18n locale="en-GB">
{
  "home": "About me",
  "projects": "Projects",
  "career": "Career",
  "photos": "Photos",
  "homeLabel": "Knigor — home",
  "navigationLabel": "Main navigation",
  "menu": "Menu",
  "language": "Language",
  "lightTheme": "Switch to light theme",
  "darkTheme": "Switch to dark theme",
  "comingSoon": "Page not added yet",
  "linkPending": "Link not added yet"
}
</i18n>
