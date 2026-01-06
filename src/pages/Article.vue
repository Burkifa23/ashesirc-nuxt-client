<template>
  <div>
    <div class="fixed inset-x-0 top-0 z-50 h-1 bg-slate-200/60">
      <div class="h-full bg-accent transition-[width]" :style="{ width: progress + '%' }"></div>
    </div>
    
    <!-- Loading State -->
    <div v-if="loading" class="mx-auto max-w-3xl px-4 pt-20">
      <div class="animate-pulse">
        <div class="h-4 bg-slate-200 rounded w-20 mb-4"></div>
        <div class="h-8 bg-slate-200 rounded w-3/4 mb-2"></div>
        <div class="h-4 bg-slate-200 rounded w-1/2 mb-8"></div>
        <div class="h-64 bg-slate-200 rounded mb-8"></div>
        <div class="space-y-4">
          <div class="h-4 bg-slate-200 rounded"></div>
          <div class="h-4 bg-slate-200 rounded w-5/6"></div>
          <div class="h-4 bg-slate-200 rounded w-4/6"></div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="pageError" class="mx-auto max-w-3xl px-4 pt-20 text-center">
      <div class="text-red-600 mb-4">
        <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 15.5c-.77.833.192 2.5 1.732 2.5z"/>
        </svg>
      </div>
      <h1 class="font-serif text-2xl text-ink mb-4">Article Not Found</h1>
      <p class="text-ink/70 mb-6">{{ pageError }}</p>
      <a href="/" class="text-secondary hover:text-vista-blue-600 font-medium">← Back to Home</a>
    </div>

    <!-- Article Content -->
    <article v-else-if="article" class="mx-auto max-w-3xl px-4 pb-16 pt-10">
      <header class="mb-8">
        <p class="text-xs uppercase tracking-wide text-accent">{{ getCategoryName(article.category) }}</p>
        <h1 class="mt-2 font-serif text-3xl leading-tight text-ink md:text-4xl">{{ article.title }}</h1>
        <p class="mt-2 text-sm text-ink/70">
          By {{ formatAuthor(article) }} • {{ formatDate(article.publishedDate) }} • {{ article.readTime }} min read
        </p>
      </header>

      <figure v-if="article.featuredImage" class="my-6 overflow-hidden rounded bg-slate-100">
        <img :src="article.featuredImage.url" :alt="article.title" class="w-full object-cover" />
        <figcaption v-if="article.featuredImage.caption" class="px-3 py-2 text-center text-xs text-ink/60">
          {{ article.featuredImage.caption }}
        </figcaption>
      </figure>

      <div class="prose max-w-none">
        <p v-if="article.excerpt" class="lead">{{ article.excerpt }}</p>
        <template v-if="article.content && Array.isArray(article.content)">
          <PortableText :value="article.content" />
        </template>
        <div v-else v-html="parsedContent"></div>
      </div>
      
      <!-- Article Tags -->
      <div v-if="article.tags && article.tags.length" class="mt-8 pt-8 border-t border-slate-200">
        <h3 class="text-sm font-medium text-ink/70 mb-3">Tags</h3>
        <div class="flex flex-wrap gap-2">
          <span 
            v-for="tag in article.tags" 
            :key="tag.id"
            class="inline-block px-3 py-1 text-xs rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
          >
            {{ tag.name }}
          </span>
        </div>
      </div>

      <!-- Related Articles -->
      <div v-if="relatedArticles.length" class="mt-12 pt-8 border-t border-slate-200">
        <h3 class="font-serif text-xl text-ink mb-6">Related Articles</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <article 
            v-for="relatedArticle in relatedArticles" 
            :key="relatedArticle.id"
            class="border border-slate-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <div class="h-32 bg-gradient-to-br from-slate-100 to-slate-200"></div>
            <div class="p-4">
              <h4 class="font-serif text-lg text-ink mb-2 line-clamp-2">
                <a :href="`/article/${relatedArticle.slug}`" class="hover:text-primary transition-colors">
                  {{ relatedArticle.title }}
                </a>
              </h4>
              <p class="text-sm text-ink/70 line-clamp-2">{{ relatedArticle.excerpt }}</p>
            </div>
          </article>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { useApi } from '@/composables/useApi'
import { useMarkdown } from '@/composables/useMarkdown'
import type { Article } from '@/composables/useApi'
import { appConfig } from '@/config/app'
import { fetchBySlug, fetchArticlesList } from '@/lib/sanity'
import { PortableText } from '@portabletext/vue'

const { loading } = useApi()
const pageError = ref<string | null>(null)
const { parseMarkdown } = useMarkdown()

const article = ref<Article | null>(null)
const relatedArticles = ref<Article[]>([])
const progress = ref(0)

// Get article slug from URL path
const articleSlug = computed(() => {
  const path = window.location.pathname
  const segments = path.split('/')
  return segments[segments.length - 1] // Get the last segment as slug
})

// Parse markdown content to HTML
const parsedContent = computed(() => {
  return article.value?.content && !Array.isArray(article.value.content) ? parseMarkdown(article.value.content as string) : ''
})

onMounted(async () => {
  try {
      // Try Sanity first for every slug (including 'from-curiosity-to-impact'). If not configured or not found, fall back to original API.
      if (appConfig.sanityProjectId) {
        try {
          const doc = await fetchBySlug(articleSlug.value)
          if (doc) {
            // map Sanity fields to local Article shape conservatively (same as previous mapping)
            article.value = {
              id: doc._id || 0,
              documentId: doc._id || 'sanity-'+(doc._id||'0'),
              title: doc.title || doc.headline || 'Untitled',
              excerpt: doc.excerpt || doc.description || '',
              // keep Portable Text as an array when provided (render with PortableText), otherwise fallback to plain/body
              content: doc.content || doc.body || '',
              slug: doc.slug?.current || articleSlug.value,
              category: doc.category || 'interdisciplinary',
              status: 'published',
              featured: !!doc.featured,
              readTime: doc.readTime || 5,
              publishedDate: doc.publishedAt || doc._createdAt || new Date().toISOString(),
              viewCount: 0,
              createdAt: doc._createdAt || new Date().toISOString(),
              updatedAt: doc._updatedAt || new Date().toISOString(),
              publishedAt: doc.publishedAt || new Date().toISOString(),
              locale: doc.lang || 'en',
              author: doc.author ? (() => {
                // Prefer explicit firstName/lastName from researcher type if present
                const docId = doc.author._id || doc.author._ref || 'author'
                let first = ''
                let last = ''
                if (doc.author.firstName || doc.author.lastName) {
                  first = doc.author.firstName || ''
                  last = doc.author.lastName || ''
                } else {
                  // Fallback to a single `name` or `title` field if available
                  const rawName = (doc.author && (doc.author.name || doc.author.title)) || ''
                  const parts = rawName.trim() ? rawName.trim().split(/\s+/) : []
                  first = parts.length ? parts[0] : ''
                  last = parts.length > 1 ? parts.slice(1).join(' ') : ''
                }
                return {
                  id: 0,
                  documentId: docId,
                  firstName: first,
                  lastName: last,
                  email: '',
                  program: 'computer-science',
                  yearOfStudy: 'faculty',
                  researchAdvisor: '',
                  bio: '',
                  researchInterests: '',
                  status: 'active',
                  achievements: '',
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                  publishedAt: new Date().toISOString(),
                  locale: 'en'
                }
              })() : null,
              tags: Array.isArray(doc.tags) ? doc.tags.map((t:any, i:number) => ({
                id: t._id || t._ref || i,
                name: (t && (t.title || t.slug || t._ref || t._id)) || `tag-${i}`
              })) : [],
              featuredImage: doc.mainImage ? { url: doc.mainImage.asset?.url, caption: doc.mainImage.caption } : null,
              seo: doc.seo || null,
              pdfFile: null,
              createdBy: null,
              updatedBy: null,
              localizations: []
            } as Article

            // Fetch related articles (Sanity) by same category — do not call legacy API
            try {
              const list = await fetchArticlesList(8)
              if (Array.isArray(list)) {
                relatedArticles.value = list
                   .map((r:any) => ({
                     id: r._id || 0,
                     documentId: r._id || 'sanity-'+(r._id||'0'),
                     title: r.title || 'Untitled',
                     excerpt: r.excerpt || r.description || '',
                     content: r.content || r.body || '',
                     slug: r.slug?.current || '',
                     category: r.category || 'interdisciplinary',
                     status: 'published',
                     featured: !!r.featured,
                     readTime: r.readTime || 5,
                     publishedDate: r.publishedDate || r._createdAt || new Date().toISOString(),
                     viewCount: 0,
                     createdAt: r._createdAt || new Date().toISOString(),
                     updatedAt: r._updatedAt || new Date().toISOString(),
                     publishedAt: r.publishedDate || new Date().toISOString(),
                     locale: r.lang || 'en',
                     author: r.author ? {
                       id: 0,
                       documentId: r.author._id || r.author._ref || 'author',
                       firstName: r.author.firstName || r.author.name || '',
                       lastName: r.author.lastName || '',
                       email: '',
                       program: 'other',
                       yearOfStudy: 'faculty',
                       researchAdvisor: '',
                       bio: '',
                       researchInterests: '',
                       status: 'active',
                       achievements: '',
                       createdAt: new Date().toISOString(),
                       updatedAt: new Date().toISOString(),
                       publishedAt: new Date().toISOString(),
                       locale: 'en'
                     } : null,
                     tags: Array.isArray(r.tags) ? r.tags.map((t:any)=>({ id: t._id, name: t.title || t.slug })) : [],
                     featuredImage: r.mainImage ? { url: r.mainImage.asset?.url, caption: r.mainImage.caption } : null,
                   }))
                   .filter(a => a.slug !== article.value!.slug && a.category === article.value!.category) as Article[]
              }
            } catch (relErr) {
              console.warn('Failed to fetch related articles from Sanity', relErr)
            }

            return
          }
        } catch (e) {
          console.warn('Sanity fetch failed for slug, not falling back to legacy API', e)
        }
      }

      // If we reach here, no Sanity document was found — show error
      pageError.value = 'Article not found'
      article.value = null
      } catch (err) {
       console.error('Error fetching article:', err)
       pageError.value = (err instanceof Error && err.message) ? err.message : 'Error fetching article'
       }

  // Setup scroll progress
  updateProgress()
  window.addEventListener('scroll', updateProgress, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
})

function updateProgress() {
  const el = document.documentElement
  const scrollTop = el.scrollTop
  const height = el.scrollHeight - el.clientHeight
  progress.value = height ? Math.min(100, Math.round((scrollTop / height) * 100)) : 0
}

// Helper functions
const getCategoryName = (category: string): string => {
  const categoryMap: Record<string, string> = {
    'computer-science': 'Computer Science',
    'engineering': 'Engineering',
    'business': 'Business', 
    'humanities': 'Humanities',
    'interdisciplinary': 'Interdisciplinary',
    'machine-intelligence': 'Machine Intelligence'
  }
  return categoryMap[category] || category
}

const formatAuthor = (article: Article): string => {
  if (!article.author) return 'Unknown Author'
  return `${article.author.firstName || ''} ${article.author.lastName || ''}`.trim()
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}
</script>

<style scoped>
/* Enhanced prose styling for markdown content */
.prose p { 
  margin: 20px 0; 
  font-size: 17px; 
  line-height: 1.75; 
  color: var(--ink-color, #0E0929);
  opacity: 0.9;
}

.prose .lead { 
  font-size: 1.125rem; 
  line-height: 2; 
  color: var(--ink-color, #0E0929); 
}

.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 { 
  margin-top: 2rem; 
  margin-bottom: 0.75rem; 
  font-family: serif; 
  color: var(--ink-color, #0E0929); 
  font-weight: 600;
}

.prose h1 { font-size: 2rem; }
.prose h2 { font-size: 1.75rem; }
.prose h3 { font-size: 1.5rem; }
.prose h4 { font-size: 1.25rem; }
.prose h5 { font-size: 1.125rem; }
.prose h6 { font-size: 1rem; }

.prose ul, .prose ol { 
  margin: 1rem 0; 
  padding-left: 1.5rem; 
  color: var(--ink-color, #0E0929);
  opacity: 0.9;
}

.prose ul { 
  list-style-type: disc; 
}

.prose ol { 
  list-style-type: decimal; 
}

.prose li {
  margin: 0.5rem 0;
}

.prose blockquote {
  margin: 1.5rem 0;
  border-left: 4px solid rgba(146, 172, 255, 0.6);
  background-color: rgba(248, 250, 252, 0.8);
  padding: 1rem 1.5rem;
  font-style: italic;
  color: var(--ink-color, #0E0929);
}

.prose blockquote p {
  margin: 0.5rem 0;
}

.prose code {
  background-color: rgba(230, 230, 230, 0.3);
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.875rem;
  color: #d73a49;
}

.prose pre {
  background-color: #f6f8fa;
  border: 1px solid #e1e4e8;
  border-radius: 0.375rem;
  padding: 1rem;
  margin: 1.5rem 0;
  overflow-x: auto;
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.875rem;
  line-height: 1.45;
}

.prose pre code {
  background: none;
  padding: 0;
  color: inherit;
}

.prose a {
  color: #0066cc;
  text-decoration: none;
}

.prose a:hover {
  color: #0052a3;
  text-decoration: underline;
}

.prose strong {
  font-weight: 600;
  color: var(--ink-color, #0E0929);
}

.prose em {
  font-style: italic;
}

.prose hr {
  margin: 2rem 0;
  border: 0;
  border-top: 1px solid #e1e4e8;
}

.prose table {
  width: 100%;
  margin: 1.5rem 0;
  border-collapse: collapse;
  border: 1px solid #e1e4e8;
}

.prose th,
.prose td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #e1e4e8;
}

.prose th {
  background-color: #f6f8fa;
  font-weight: 600;
}

.prose figure { 
  margin: 1.5rem 0; 
}

.prose .end { 
  margin-top: 2rem; 
  color: var(--ink-color, #0E0929); 
}
</style>

<!-- Global styles applied to v-html content (unscoped) -->
<style>
.prose p {
  margin: 20px 0 !important;
}
</style>
