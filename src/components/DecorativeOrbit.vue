<template>
    <div
        class="pointer-events-none absolute -z-10 w-full select-none"
        aria-hidden="true"
        :class="variant === 'home' ? 'max-w-168' : 'max-w-120'"
    >
        <img
            v-for="theme in themes"
            :key="theme"
            class="h-auto w-full"
            alt=""
            :class="theme === 'dark' ? 'hidden dark:block' : 'block dark:hidden'"
            :src="assets[variant][theme]"
        >
    </div>
</template>

<script setup lang="ts">
import homeDesktopDark from '@/assets/orbits/home-desktop-dark.svg'
import homeDesktopLight from '@/assets/orbits/home-desktop-light.svg'
import aboutDesktopDark from '@/assets/orbits/about-desktop-dark.svg'
import aboutDesktopLight from '@/assets/orbits/about-desktop-light.svg'

defineProps<{ variant: 'home' | 'about' }>()

const themes = ['light', 'dark'] as const
const assets = {
    home: {
        dark: homeDesktopDark,
        light: homeDesktopLight,
    },
    about: {
        dark: aboutDesktopDark,
        light: aboutDesktopLight,
    },
}
</script>
