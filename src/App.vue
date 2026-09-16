<template>
  <div class="flex flex-col min-h-dvh">
    <header class="shrink-0 flex justify-end">
      <NavigationMenu class="px-4 py-4 flex gap-2">
        <NavigationMenuLink>
          <RouterLink to="/">
            {{ t('navigation.home') }}
          </RouterLink>
        </NavigationMenuLink>

        <NavigationMenuLink>
          <RouterLink to="/projects">
            {{ t('navigation.projects') }}
          </RouterLink>
        </NavigationMenuLink>

        <Button
          variant="outline"
          size="icon"
          class="cursor-pointer"
          @click="handleMode"
        >
          <Sun v-if="mode === 'dark'" />

          <Moon v-else />
        </Button>

        <Select
          v-model="locale"
        >
          <SelectTrigger class="cursor-pointer min-w-34">
            <Languages />

            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="en-GB" class="cursor-pointer">
              English
            </SelectItem>

            <SelectItem value="ru-RU" class="cursor-pointer">
              Русский
            </SelectItem>
          </SelectContent>
        </Select>
      </NavigationMenu>
    </header>

    <main class="flex-1 p-6">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'

import { useColorMode } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

import { Sun } from '@lucide/vue'
import { Moon } from '@lucide/vue'
import { Languages } from '@lucide/vue'

const mode = useColorMode({
  initialValue: 'dark',
  disableTransition: false
})

const { t, locale } = useI18n()

const handleMode = () => {
  if (mode.value === 'dark') {
    mode.value = 'light'
  } else {
    mode.value = 'dark'
  }
}
</script>
<i18n locale="en-GB">
{
  "navigation": {
    "home": "About me",
    "projects": "Projects"
  }
}
</i18n>

<i18n locale="ru-RU">
{
  "navigation": {
    "home": "Обо мне",
    "projects": "Проекты"
  }
}
</i18n>

