<template>
    <svg
        class="shrink-0 fill-current"
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
    >
        <path :d="path" />
    </svg>
</template>

<script setup lang="ts">
defineProps<{ path: string }>()
</script>
