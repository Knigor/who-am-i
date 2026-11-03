<template>
    <div class="flex min-h-dvh flex-col overflow-x-clip bg-background" :class="{ 'profile-layout': isProfile }">
        <PageHeader />

        <main class="flex-1 px-6 md:px-12">
            <RouterView />
        </main>

        <PageFooter />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import PageHeader from '@/components/PageHeader.vue'
import PageFooter from '@/components/PageFooter.vue'

import { useRoute } from 'vue-router'

const route = useRoute()
const isProfile = computed(() => route.path === '/' || route.path === '/about')
</script>

