<script setup lang="ts">
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Home from '@/pages/Home.vue'
import Article from '@/pages/Article.vue'
import Topics from '@/pages/Topics.vue'
import Archives from '@/pages/Archives.vue'
import About from '@/pages/About.vue'
import Join from '@/pages/Join.vue'
import { useHashRouter } from '@/router/useHashRouter'

const { route } = useHashRouter()
</script>

<template>
  <div class="min-h-screen bg-paper text-ink">
    <Header />
    <main>
      <Home v-if="route.name === 'home'" />
      <Topics v-else-if="route.name === 'topics'" />
      <Archives v-else-if="route.name === 'archives'" />
      <About v-else-if="route.name === 'about'" />
      <Join v-else-if="route.name === 'join'" />
      <Article v-else-if="route.name === 'article'" />
      <Home v-else />
    </main>
    <Footer />
  </div>
</template>

<style scoped></style>
