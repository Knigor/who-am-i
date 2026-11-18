<template>
    <figure>
        <div
            class="relative bg-background p-2 ring-1 ring-portfolio-line ring-inset before:pointer-events-none before:absolute before:top-0 before:left-0 before:size-6 before:border-t before:border-l before:border-brand after:pointer-events-none after:absolute after:right-0 after:bottom-0 after:size-6 after:border-r after:border-b after:border-brand"
        >
            <img
                class="block w-full rounded-sm object-cover"
                decoding="async"
                :class="compact ? 'aspect-square object-[center_65%]' : 'aspect-4/5'"
                :src="`${baseUrl}photo.jpg`"
            >
        </div>
    </figure>
</template>

<script setup lang="ts">
defineProps<{ compact?: boolean }>()

const baseUrl = import.meta.env.BASE_URL
</script>
