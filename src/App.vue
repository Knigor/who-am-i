<template>
  <div class="flex flex-col min-h-dvh">
    <PageHeader />

    <main class="flex-1 p-6">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
</script>

