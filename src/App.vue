<template>
  <nav>
    <RouterLink to="/" class="text-red-400 hover:text-blue-400">
      Home
    </RouterLink>

    <RouterLink to="/projects" class="text-red-400 hover:text-blue-400">
      Projects
    </RouterLink>
  </nav>

  <main>
    <RouterView />
  </main>
</template>

<script setup lang="ts">
</script>

