<template>
  <div class="flex flex-col min-h-dvh">
    <header class="shrink-0 flex justify-end">
      <NavigationMenu class="px-4 py-4 flex gap-2">
        <NavigationMenuLink>
          <RouterLink to="/">
            Home
          </RouterLink>
        </NavigationMenuLink>

        <NavigationMenuLink>
          <RouterLink to="/projects">
            Projects
          </RouterLink>
        </NavigationMenuLink>
      </NavigationMenu>

      <Button
        variant="outline"
        size="icon"
        @click="handleMode"
      >
        <Sun v-if="mode === 'dark'" />

        <Moon v-else />
      </Button>
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
import { Button } from '@/components/ui/button'

import { useColorMode } from '@vueuse/core'

import { Sun } from '@lucide/vue'
import { Moon } from '@lucide/vue'

const mode = useColorMode({ disableTransition: false })

const handleMode = () => {
  if (mode.value === 'dark') {
    mode.value = 'light'
  } else {
    mode.value = 'dark'
  }
}

</script>

