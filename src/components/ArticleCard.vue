<template>
  <article class="group grid grid-cols-1 gap-3 md:grid-cols-5">
    <div class="aspect-[3/2] overflow-hidden rounded bg-slate-100 md:col-span-2">
      <img v-if="image" :src="image" :alt="title" class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
      <div v-else class="h-full w-full bg-gradient-to-br from-slate-100 to-slate-200" />
    </div>
    <div class="md:col-span-3">
      <p class="text-xs uppercase tracking-wide text-accent">{{ tag }}</p>
      <h3 class="mt-1 font-serif text-xl leading-snug text-ink group-hover:underline">
        <a :href="link">{{ title }}</a>
      </h3>
      <p class="mt-2 line-clamp-2 text-sm text-ink/70">{{ description }}</p>
      <p class="mt-2 text-xs text-ink/60">By {{ author }} • {{ date }}</p>
    </div>
  </article>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description: string
  author: string
  date: string
  tag?: string
  image?: string | null
  link: string
}

withDefaults(defineProps<Props>(), {
  tag: 'Feature',
  image: null,
})
</script>

<style scoped></style>
