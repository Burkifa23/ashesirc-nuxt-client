<template>
  <main class="min-h-screen bg-paper">
    <!-- Header -->
    <section class="bg-gradient-to-br from-slate-50 to-slate-100 border-b border-slate-200/70">
      <div class="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div class="text-center mb-8">
          <h1 class="font-serif text-4xl leading-tight text-ink md:text-5xl lg:text-6xl">
            Research <span class="text-accent">Archives</span>
          </h1>
          <p class="mt-6 text-xl text-ink/75 leading-relaxed max-w-3xl mx-auto">
            Explore our complete collection of research articles, spanning multiple disciplines and years of academic excellence.
          </p>
        </div>

        <!-- Search & Filter Bar -->
        <div class="bg-white rounded-lg border border-slate-200 p-6">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <!-- Search Input -->
            <div class="md:col-span-2">
              <label for="search" class="sr-only">Search articles</label>
              <div class="relative">
                <input 
                  id="search"
                  v-model="searchQuery" 
                  type="text" 
                  placeholder="Search articles, authors, or keywords..."
                  class="w-full rounded-md border border-slate-300 pl-10 pr-3 py-2 text-sm bg-white focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-colors"
                />
                <svg class="absolute left-3 top-2.5 h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>

            <!-- Category Filter -->
            <div>
              <label for="category" class="sr-only">Filter by category</label>
              <select 
                id="category"
                v-model="selectedCategory" 
                class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-colors"
              >
                <option value="">All Categories</option>
                <option value="computer-science">Computer Science</option>
                <option value="engineering">Engineering</option>
                <option value="business">Business</option>
                <option value="social-sciences">Social Sciences</option>
                <option value="humanities">Humanities</option>
                <option value="interdisciplinary">Interdisciplinary</option>
              </select>
            </div>

            <!-- Sort By -->
            <div>
              <label for="sort" class="sr-only">Sort by</label>
              <select 
                id="sort"
                v-model="sortBy" 
                class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-colors"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title">Title A-Z</option>
                <option value="author">Author A-Z</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Results Summary -->
    <section class="py-8">
      <div class="mx-auto max-w-6xl px-4">
        <div v-if="loading" class="text-center">
          <div class="inline-flex items-center gap-2 text-ink/70">
            <svg class="animate-spin h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" opacity="0.25"/>
              <path fill="currentColor" opacity="0.75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            Loading articles...
          </div>
        </div>
        
        <div v-else-if="error" class="text-center">
          <div class="text-red-600 mb-2">Error loading articles</div>
          <p class="text-sm text-ink/70">{{ error }}</p>
        </div>
        
        <div v-else class="flex items-center justify-between">
          <p class="text-ink/70">
            <span class="font-medium">{{ filteredArticles.length }}</span> 
            article{{ filteredArticles.length !== 1 ? 's' : '' }} found
            <span v-if="searchQuery || selectedCategory" class="text-sm">
              {{ searchQuery ? `for "${searchQuery}"` : '' }}
              {{ selectedCategory ? `in ${getCategoryName(selectedCategory)}` : '' }}
            </span>
          </p>
          <button 
            v-if="searchQuery || selectedCategory"
            @click="clearFilters"
            class="text-sm text-secondary hover:text-vista-blue-600 transition-colors"
          >
            Clear filters
          </button>
        </div>
      </div>
    </section>

    <!-- Articles by Year -->
    <section class="pb-16">
      <div class="mx-auto max-w-6xl px-4">
        <div v-if="!loading && !error && filteredArticles.length === 0" class="text-center py-16">
          <div class="text-slate-400 mb-4">
            <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <h3 class="font-serif text-xl text-ink mb-2">No articles found</h3>
          <p class="text-ink/70">Try adjusting your search terms or filters.</p>
        </div>

        <!-- Grouped by Year -->
        <div v-else-if="!loading && !error" class="space-y-12">
          <div v-for="(articles, year) in groupedArticles" :key="year" class="space-y-6">
            <!-- Year Header -->
            <div class="border-b border-slate-200 pb-4">
              <h2 class="font-serif text-2xl text-ink">{{ year }}</h2>
              <p class="text-sm text-ink/70 mt-1">{{ articles.length }} article{{ articles.length !== 1 ? 's' : '' }}</p>
            </div>

            <!-- Articles Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <article 
                v-for="article in articles" 
                :key="article.id"
                class="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group"
              >
                <!-- Article Image/Placeholder -->
                <div class="h-48 bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
                  <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div class="absolute top-4 left-4">
                    <span 
                      class="inline-block px-2 py-1 text-xs font-medium rounded-full"
                      :class="getCategoryColor(article.category)"
                    >
                      {{ getCategoryName(article.category) }}
                    </span>
                  </div>
                </div>

                <!-- Article Content -->
                <div class="p-6">
                  <div class="mb-3">
                    <time class="text-xs text-ink/50">{{ formatDate(article.publishedDate) }}</time>
                  </div>
                  
                  <h3 class="font-serif text-lg text-ink mb-2 group-hover:text-primary transition-colors">
                    <a :href="`/article/${article.slug}`" class="line-clamp-2">{{ article.title }}</a>
                  </h3>
                  
                  <p class="text-sm text-ink/70 leading-relaxed mb-4 line-clamp-3">
                    {{ stripMarkdown(article.excerpt) }}
                  </p>
                  
                  <div class="flex items-center justify-between">
                    <div class="text-sm text-ink/60">
                      by <span class="font-medium">{{ formatAuthor(article) }}</span>
                    </div>
                    <a 
                      :href="`/article/${article.slug}`"
                      class="text-sm text-secondary hover:text-vista-blue-600 font-medium transition-colors"
                    >
                      Read more →
                    </a>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useStaticApi } from '@/composables/useStaticApi'
import { useMarkdown } from '@/composables/useMarkdown'
import type { Article } from '@/composables/useApi'

const { getArticles, loading, error } = useStaticApi()
const { stripMarkdown } = useMarkdown()

// State
const articles = ref<Article[]>([])

// Reactive filters
const searchQuery = ref('')
const selectedCategory = ref('')
const sortBy = ref('newest')

// Fetch articles on mount
onMounted(async () => {
  try {
    const fetchedArticles = await getArticles()
    articles.value = fetchedArticles
  } catch (err) {
    console.error('Error fetching articles:', err)
  }
})

// Computed properties
const filteredArticles = computed(() => {
  let filtered = [...articles.value]

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(article => 
      article.title.toLowerCase().includes(query) ||
      stripMarkdown(article.excerpt).toLowerCase().includes(query) ||
      (article.author?.firstName + ' ' + article.author?.lastName).toLowerCase().includes(query)
    )
  }

  // Filter by category
  if (selectedCategory.value) {
    filtered = filtered.filter(article => article.category === selectedCategory.value)
  }

  // Sort articles
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'oldest':
        return new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime()
      case 'title':
        return a.title.localeCompare(b.title)
      case 'author':
        const authorA = a.author ? `${a.author.firstName} ${a.author.lastName}` : 'Unknown'
        const authorB = b.author ? `${b.author.firstName} ${b.author.lastName}` : 'Unknown'
        return authorA.localeCompare(authorB)
      case 'newest':
      default:
        return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
    }
  })

  return filtered
})

const groupedArticles = computed(() => {
  const grouped: Record<string, Article[]> = {}
  
  filteredArticles.value.forEach(article => {
    const year = new Date(article.publishedDate).getFullYear().toString()
    if (!grouped[year]) {
      grouped[year] = []
    }
    grouped[year].push(article)
  })

  return grouped
})

// Helper functions
const getCategoryName = (category: string): string => {
  const categoryMap: Record<string, string> = {
    'computer-science': 'Computer Science',
    'engineering': 'Engineering', 
    'business': 'Business',
    'humanities': 'Humanities',
    'interdisciplinary': 'Interdisciplinary'
  }
  return categoryMap[category] || category
}

const getCategoryColor = (category: string): string => {
  const colorMap: Record<string, string> = {
    'computer-science': 'bg-blue-100 text-blue-800',
    'engineering': 'bg-green-100 text-green-800',
    'business': 'bg-purple-100 text-purple-800',
    'humanities': 'bg-pink-100 text-pink-800',
    'interdisciplinary': 'bg-secondary text-primary'
  }
  return colorMap[category] || 'bg-slate-100 text-slate-800'
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const formatAuthor = (article: Article): string => {
  if (!article.author) return 'Unknown Author'
  return `${article.author.firstName} ${article.author.lastName}`
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  sortBy.value = 'newest'
}
</script>

<style scoped>
/* Custom styles for select dropdown */
select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}
</style>
