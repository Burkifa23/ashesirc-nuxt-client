<template>
  <main>
    <!-- Hero Featured Story -->
    <section class="border-b border-slate-200/70 bg-paper">
      <div class="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-10 md:grid-cols-12 md:gap-10 md:py-14">
        <div class="md:col-span-7">
          <div class="aspect-[16/10] overflow-hidden rounded bg-slate-100">
            <img src="https://images.unsplash.com/photo-1523246191914-9fdb7d0b42d4?q=80&w=1200&auto=format&fit=crop" alt="Featured" class="h-full w-full object-cover" />
          </div>
        </div>
        <div class="md:col-span-5">
          <p class="text-xs uppercase tracking-wide text-accent">Featured</p>
          <h1 class="mt-2 font-serif text-3xl leading-tight text-ink md:text-4xl">
            Advancing Research Excellence at Ashesi: Innovation, Impact, and Global Collaboration
          </h1>
          <p class="mt-3 text-ink/75">
            Exploring how Ashesi University's research initiatives are contributing to academic excellence and addressing real-world challenges across Africa and beyond.
          </p>
          <p class="mt-2 text-xs text-ink/60">By Research Team • Jan 17, 2025 • 8 min read</p>
          <div class="mt-5">
            <a href="#/article/ashesi-research-excellence" class="inline-flex items-center gap-2 rounded bg-ink px-4 py-2 text-sm font-medium text-paper hover:bg-ink/90">
              Read the story
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12l-7.5 7.5M21 12H3"/></svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Topics -->
    <section class="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <TopicBlock
          title="Computer Science & Engineering"
          viewAll="#/topics"
          :articles="[
            { title: 'Machine Learning for Social Impact', description: 'How Ashesi students are applying AI to solve local challenges.', author: 'Kwame A.', date: 'Jan 14, 2025', tag: 'CS', image: null, link: '#/article/ml-social-impact' },
            { title: 'Sustainable Technology Solutions', description: 'Engineering innovations for environmental challenges in Ghana.', author: 'Ama K.', date: 'Jan 10, 2025', tag: 'Engineering', image: null, link: '#/article/sustainable-tech' }
          ]"
        />
        <TopicBlock
          title="Business & Entrepreneurship"
          viewAll="#/topics"
          :articles="[
            { title: 'Social Enterprise Research Lab', description: 'Studying business models that create positive social impact.', author: 'Joseph T.', date: 'Jan 12, 2025', tag: 'Business', image: null, link: '#/article/social-enterprise' },
            { title: 'Fintech Innovation in West Africa', description: 'Research on financial technology adoption and impact.', author: 'Fatima O.', date: 'Jan 6, 2025', tag: 'Fintech', image: null, link: '#/article/fintech-innovation' }
          ]"
        />
        <TopicBlock
          title="Liberal Arts & Humanities"
          viewAll="#/topics"
          :articles="[
            { title: 'Digital Humanities Projects', description: 'Preserving and analyzing African cultural heritage through technology.', author: 'Nana Y.', date: 'Jan 3, 2025', tag: 'Humanities', image: null, link: '#/article/digital-humanities' },
            { title: 'Language and Identity Research', description: 'Exploring multilingualism and cultural identity in Ghana.', author: 'Kojo M.', date: 'Dec 30, 2024', tag: 'Language', image: null, link: '#/article/language-identity' }
          ]"
        />
        <TopicBlock
          title="Student Research Spotlight"
          viewAll="#/topics"
          :articles="[
            { title: 'Undergraduate Research Excellence', description: 'Highlighting outstanding student research projects and achievements.', author: 'Research Office', date: 'Dec 27, 2024', tag: 'Students', image: null, link: '#/article/student-excellence' },
            { title: 'Capstone Project Showcase', description: 'Innovative solutions developed by graduating students.', author: 'Academic Team', date: 'Dec 21, 2024', tag: 'Capstone', image: null, link: '#/article/capstone-showcase' }
          ]"
        />
      </div>
    </section>

    <!-- Magazine Subscription -->
    <NewsletterSignup />

    <!-- Latest Articles -->
    <section class="mx-auto max-w-6xl px-4 pb-12">
      <h2 class="mb-6 font-serif text-2xl text-ink">Latest Research</h2>
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
        <ArticleCard
          v-for="i in 4"
          :key="i"
          title="Innovation in Academic Research"
          description="How Ashesi is fostering a culture of research excellence and innovation."
          author="Editorial Team"
          date="Jan 17, 2025"
          tag="Research"
          :image="null"
          link="#/article/innovation-research"
        />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import TopicBlock from '@/components/TopicBlock.vue'
import NewsletterSignup from '@/components/NewsletterSignup.vue'
import ArticleCard from '@/components/ArticleCard.vue'
</script>

<style scoped></style>
