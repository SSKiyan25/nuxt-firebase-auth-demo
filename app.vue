<script setup lang="ts">
  useHead({
    title: "Nuxt Tutorial",
  });
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UiVueSonner />
  </div>
</template>
