<template>
  <main class="mx-auto max-w-4xl px-4 py-16 text-center">
    <h1 class="font-serif text-3xl text-ink">{{ title }}</h1>
    <p class="mt-2 text-ink/70">This page is a placeholder. Tell us to fill it with content tailored to your needs.</p>
    <a href="#/" class="mt-6 inline-block rounded border border-slate-300/70 px-4 py-2 text-sm text-ink/80 hover:bg-slate-100/60">Back to Home</a>
  </main>
</template>

<script setup lang="ts">
interface Props { title: string }

defineProps<Props>()
</script>

<style scoped></style>
