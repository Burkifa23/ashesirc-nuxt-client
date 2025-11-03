<template>
  <section class="rounded-md border border-slate-200/70 bg-paper p-5">
    <header class="mb-3 flex items-baseline justify-between">
      <h3 class="font-serif text-xl text-ink">{{ title }}</h3>
      <a :href="viewAll" class="text-xs text-accent hover:underline">View all</a>
    </header>
    <div class="space-y-5">
      <ArticleCard
        v-for="(a, i) in articles"
        :key="i"
        :title="a.title"
        :description="a.description"
        :author="a.author"
        :date="a.date"
        :tag="a.tag"
        :image="a.image"
        :link="a.link"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import ArticleCard from './ArticleCard.vue'

interface Article {
  title: string
  description: string
  author: string
  date: string
  tag?: string
  image?: string | null
  link: string
}

interface Props {
  title: string
  viewAll: string
  articles: Article[]
}

defineProps<Props>()
</script>

<style scoped></style>
