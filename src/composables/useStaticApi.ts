// Static data composable - uses cached data with live fallback
import { ref, computed } from 'vue'
import { fetchArticlesList, fetchBySlug, fetchFeaturedArticle } from '@/lib/sanity'
import { useApi } from './useApi'
import type { Article, TeamMember, Researcher, Tag } from './useApi'

// Static data cache
let staticDataCache: Record<string, any> = {}

const loadStaticFile = async (filename: string) => {
    try {
        const response = await fetch(`/src/data/${filename}`)
        if (!response.ok) {
            throw new Error(`Failed to load ${filename}`)
        }
        return await response.json()
    } catch (error) {
        console.warn(`Static data file ${filename} not available`)
        return null
    }
}

export const useStaticApi = () => {
    const loading = ref(false)
    const error = ref<string | null>(null)
    const { subscribeNewsletter, submitApplication } = useApi()

    // Load static data with caching
    const getStaticData = async (filename: string) => {
        if (!(filename in staticDataCache)) {
            staticDataCache[filename] = await loadStaticFile(filename)
        }
        return staticDataCache[filename]
    }

    // Static data getters with fallback to API
    const getArticles = async (options: {
        featured?: boolean
        category?: string
        limit?: number
    } = {}) => {
        loading.value = true
        error.value = null

        try {
            let filename = 'articles.json'

            if (options.featured) {
                filename = 'featured-articles.json'
            } else if (options.category === 'computer-science') {
                filename = 'cs-articles.json'
            } else if (options.category === 'business') {
                filename = 'business-articles.json'
            } else if (options.category === 'humanities') {
                filename = 'humanities-articles.json'
            }

            let data = await getStaticData(filename)

            if (!data) {
                // Fallback to Sanity CMS
                try {
                    const docs = await fetchArticlesList(options.limit || 20)
                    if (Array.isArray(docs)) {
                        const mapped = docs.map((doc: any) => ({
                            id: doc._id || 0,
                            documentId: doc._id || 'sanity-' + (doc._id || '0'),
                            title: doc.title || 'Untitled',
                            excerpt: doc.excerpt || doc.description || '',
                            content: doc.content || doc.body || '',
                            slug: doc.slug?.current || '',
                            category: doc.category || 'interdisciplinary',
                            status: 'published',
                            featured: !!doc.featured,
                            readTime: doc.readTime || 5,
                            publishedDate: doc.publishedDate || doc._createdAt || new Date().toISOString(),
                            viewCount: 0,
                            createdAt: doc._createdAt || new Date().toISOString(),
                            updatedAt: doc._updatedAt || new Date().toISOString(),
                            publishedAt: doc.publishedDate || new Date().toISOString(),
                            locale: doc.lang || 'en',
                            author: doc.author ? {
                                id: 0,
                                documentId: doc.author._id || doc.author._ref || 'author',
                                firstName: doc.author.firstName || doc.author.name || '',
                                lastName: doc.author.lastName || '',
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
                            tags: Array.isArray(doc.tags) ? doc.tags.map((t: any) => ({ id: t._id, name: t.title || t.slug })) : [],
                            featuredImage: doc.mainImage ? { url: doc.mainImage.asset?.url, caption: doc.mainImage.caption } : null,
                        }))
                        return mapped
                    }
                } catch (err) {
                    console.warn('Sanity fallback failed for getArticles', err)
                }
                return []
            }

            if (options.limit && Array.isArray(data)) {
                data = data.slice(0, options.limit)
            }

            return data || []
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to fetch articles'
            return []
        } finally {
            loading.value = false
        }
    }

    const getArticleBySlug = async (slug: string) => {
        loading.value = true
        error.value = null

        try {
            const data = await getStaticData('articles.json')

            if (data && Array.isArray(data)) {
                const article = data.find((a: Article) => a.slug === slug)
                if (article) {
                    return article
                }
            }

            // Fallback to Sanity
            try {
                const doc = await fetchBySlug(slug)
                if (doc) {
                    return {
                        id: doc._id || 0,
                        documentId: doc._id || 'sanity-' + (doc._id || '0'),
                        title: doc.title || 'Untitled',
                        excerpt: doc.excerpt || doc.description || '',
                        content: doc.content || doc.body || '',
                        slug: doc.slug?.current || slug,
                        category: doc.category || 'interdisciplinary',
                        status: 'published',
                        featured: !!doc.featured,
                        readTime: doc.readTime || 5,
                        publishedDate: doc.publishedDate || doc._createdAt || new Date().toISOString(),
                        viewCount: 0,
                        createdAt: doc._createdAt || new Date().toISOString(),
                        updatedAt: doc._updatedAt || new Date().toISOString(),
                        publishedAt: doc.publishedDate || new Date().toISOString(),
                        locale: doc.lang || 'en',
                        author: doc.author ? {
                            id: 0,
                            documentId: doc.author._id || doc.author._ref || 'author',
                            firstName: doc.author.firstName || doc.author.name || '',
                            lastName: doc.author.lastName || '',
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
                        tags: Array.isArray(doc.tags) ? doc.tags.map((t: any) => ({ id: t._id, name: t.title || t.slug })) : [],
                        featuredImage: doc.mainImage ? { url: doc.mainImage.asset?.url, caption: doc.mainImage.caption } : null,
                    } as Article
                }
            } catch (err) {
                console.warn('Sanity fallback failed for getArticleBySlug', err)
            }
            throw new Error('Article not found')
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to fetch article'
            throw err
        } finally {
            loading.value = false
        }
    }

    const getTeamMembers = async () => {
        loading.value = true
        error.value = null

        try {
            const data = await getStaticData('team-members.json')

            if (data) {
                return data
            }

            // No legacy API: return empty array if static not present
            return []
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to fetch team members'
            return []
        } finally {
            loading.value = false
        }
    }

    const getResearchers = async (options: {
        status?: 'active' | 'alumni' | 'inactive'
        program?: string
        limit?: number
    } = {}) => {
        loading.value = true
        error.value = null

        try {
            let data = await getStaticData('researchers.json')

            if (!data) {
                // Fallback to Sanity is not implemented for researchers here — return empty
                return []
            }

            if (Array.isArray(data)) {
                if (options.status) {
                    data = data.filter((r: Researcher) => r.status === options.status)
                }
                if (options.program) {
                    data = data.filter((r: Researcher) => r.program === options.program)
                }
                if (options.limit) {
                    data = data.slice(0, options.limit)
                }
            }

            return data || []
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to fetch researchers'
            return []
        } finally {
            loading.value = false
        }
    }

    const getTags = async () => {
        loading.value = true
        error.value = null

        try {
            const data = await getStaticData('tags.json')

            if (data) {
                return data
            }

            // No legacy API: return empty array
            return []
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to fetch tags'
            return []
        } finally {
            loading.value = false
        }
    }

    const getBuildInfo = async () => {
        const data = await getStaticData('build-info.json')
        return data || { timestamp: '', version: '' }
    }

    return {
        // State
        loading: computed(() => loading.value),
        error: computed(() => error.value),

        // Static data (fast)
        getArticles,
        getArticleBySlug,
        getTeamMembers,
        getResearchers,
        getTags,
        getBuildInfo,

        // Dynamic operations (when needed)
        subscribeNewsletter,
        submitApplication,

        // Clear error
        clearError: () => { error.value = null }
    }
}
