<template>
  <header class="sticky top-0 z-40 border-b border-slate-200/60 bg-paper/80 backdrop-blur supports-[backdrop-filter]:bg-paper/60">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">
      <a href="#/" class="flex items-center gap-3">
        <div class="h-8 w-8 rounded-sm bg-accent/90 text-paper grid place-items-center font-serif text-lg font-semibold">RN</div>
        <span class="sr-only">Ashesi Research Magazine</span>
        <span class="text-[1.4rem] font-serif tracking-tight text-ink">Ashesi Research Magazine</span>
      </a>
      <nav class="hidden items-center gap-6 text-sm md:flex">
        <a class="nav-link" href="#/">Home</a>
        <a class="nav-link" href="#/topics">Topics</a>
        <a class="nav-link" href="#/archives">Archives</a>
        <a class="nav-link" href="#/about">About</a>
        <a class="btn-ghost" href="#/join">Subscribe</a>
      </nav>
      <button class="md:hidden" @click="open = !open" aria-label="Toggle navigation">
        <svg class="h-6 w-6 text-ink" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
        </svg>
      </button>
    </div>
    <div v-if="open" class="border-t border-slate-200/60 md:hidden">
      <nav class="mx-auto flex max-w-6xl flex-col px-4 py-3 text-sm">
        <a class="mobile-link" href="#/" @click="open=false">Home</a>
        <a class="mobile-link" href="#/topics" @click="open=false">Topics</a>
        <a class="mobile-link" href="#/archives" @click="open=false">Archives</a>
        <a class="mobile-link" href="#/about" @click="open=false">About</a>
        <a class="mobile-link" href="#/join" @click="open=false">Subscribe</a>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const open = ref(false)
</script>

<style scoped>
.nav-link { @apply text-ink/80 hover:text-ink transition-colors; }
.btn-ghost { @apply rounded border border-slate-300/70 px-3 py-1.5 text-ink/80 hover:bg-slate-100/60; }
.mobile-link { @apply py-2 text-ink/80 hover:text-ink; }
</style>
