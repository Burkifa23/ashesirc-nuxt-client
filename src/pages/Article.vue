<template>
  <div>
    <div class="fixed inset-x-0 top-0 z-50 h-1 bg-slate-200/60">
      <div class="h-full bg-accent transition-[width]" :style="{ width: progress + '%' }"></div>
    </div>
    <article class="mx-auto max-w-3xl px-4 pb-16 pt-10">
      <header class="mb-8">
        <p class="text-xs uppercase tracking-wide text-accent">{{ tag }}</p>
        <h1 class="mt-2 font-serif text-3xl leading-tight text-ink md:text-4xl">{{ title }}</h1>
        <p class="mt-2 text-sm text-ink/70">By {{ author }} • {{ date }} • {{ readingTime }}</p>
      </header>

      <figure class="my-6 overflow-hidden rounded bg-slate-100">
        <img :src="image" :alt="title" class="w-full object-cover" />
        <figcaption class="px-3 py-2 text-center text-xs text-ink/60">{{ caption }}</figcaption>
      </figure>

      <div class="prose max-w-none">
        <p class="lead">Across the continent, students are building labs that punch above their weight. This piece explores funding, mentorship, and infrastructure that make it possible.</p>

        <blockquote class="pull-quote">“Young researchers are not the future—they are the present.”</blockquote>

        <p>
          Collaborative grants and open-source tools are lowering barriers to entry. Universities that empower undergraduate labs see benefits in publications, community impact, and graduate outcomes.
        </p>

        <h2>What changes the game</h2>
        <ul>
          <li>Access to mentors with time and incentives to teach</li>
          <li>Seed funding for small, iterative projects</li>
          <li>Spaces that support collaboration and safety</li>
        </ul>

        <p>
          Case studies from Accra, Nairobi, and Cape Town show that when students lead, universities follow—creating a virtuous cycle of curiosity and delivery.
        </p>

        <p class="end">Thanks for reading. Share your lab stories with us for a chance to be featured.</p>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const title = 'Rethinking University Research in Africa: Funding, Collaboration, and Impact'
const tag = 'Feature'
const author = 'Ama K.'
const date = 'Jan 17, 2025'
const image = 'https://images.unsplash.com/photo-1523246191914-9fdb7d0b42d4?q=80&w=1600&auto=format&fit=crop'
const caption = 'Student researchers collaborating in a campus lab.'
const readingTime = '8 min read'

const progress = ref(0)

function updateProgress() {
  const el = document.documentElement
  const scrollTop = el.scrollTop
  const height = el.scrollHeight - el.clientHeight
  progress.value = height ? Math.min(100, Math.round((scrollTop / height) * 100)) : 0
}

onMounted(() => {
  updateProgress()
  window.addEventListener('scroll', updateProgress, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
})
</script>

<style scoped>
.prose :where(p) { @apply my-4 text-[17px] leading-7 text-ink/90; }
.prose :where(.lead) { @apply text-lg leading-8 text-ink; }
.prose :where(h2) { @apply mt-8 mb-3 font-serif text-2xl text-ink; }
.prose :where(ul) { @apply my-4 list-disc pl-6 text-ink/90; }
.prose :where(blockquote.pull-quote) {
  @apply my-6 border-l-4 border-accent/60 bg-slate-50/80 p-4 font-serif text-xl italic text-ink;
}
.prose :where(figure) { @apply my-6; }
.prose :where(p.end) { @apply mt-8 text-ink; }
</style>
