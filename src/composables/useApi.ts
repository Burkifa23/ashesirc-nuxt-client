import { ref, computed } from 'vue'
import { appConfig } from '@/config/app'

// Base API configuration from environment variables
const API_BASE_URL = appConfig.apiBaseUrl

// Common interfaces based on your Strapi schema (updated to match actual API response)
export interface Tag {
    id: number
    documentId: string
    name: string
    slug: string
    color: string
    description?: string
    createdAt: string
    updatedAt: string
    publishedAt: string | null
    locale: string | null
}

export interface Researcher {
    id: number
    documentId: string
    firstName: string
    lastName: string
    email: string
    phone?: string
    program: 'computer-science' | 'mechanical-engineering' | 'electrical-engineering' | 'business-administration' | 'economics' | 'liberal-arts' | 'other'
    yearOfStudy: 'year-1' | 'year-2' | 'year-3' | 'year-4' | 'faculty'
    researchAdvisor?: string
    bio: string
    researchInterests: string
    status: 'active' | 'alumni' | 'inactive'
    achievements?: string
    createdAt: string
    updatedAt: string
    publishedAt: string | null
    locale: string | null
}

export interface Article {
    id: number
    documentId: string
    title: string
    excerpt: string
    content: string
    slug: string
    category: 'computer-science' | 'engineering' | 'business' | 'humanities' | 'interdisciplinary'
    status: 'draft' | 'published' | 'archived'
    featured: boolean
    readTime: number
    publishedDate: string
    viewCount: number
    collaborators?: string | null
    fundingSource?: string | null
    createdAt: string
    updatedAt: string
    publishedAt: string | null
    locale: string | null
    author: Researcher | null
    tags: Tag[]
    featuredImage?: any
    seo?: any
    pdfFile?: any
    createdBy?: any
    updatedBy?: any
    localizations?: any[]
}

export interface TeamMember {
    id: number
    name: string
    role: string
    yearOfStudy: string
    description: string
    email: string
    isActive: boolean
    order: number
    specialization: string
    joinDate: string
}

export interface ApiResponse<T> {
    data: T
    meta?: {
        pagination?: {
            page: number
            pageSize: number
            pageCount: number
            total: number
        }
    }
}

// Application form interfaces (keeping existing structure)
export interface ApplicationForm {
    name: string
    email: string
    program: 'computer-science' | 'mechanical-engineering' | 'electrical-engineering' | 'management-information-systems' | 'business-administration' | 'economics' | 'liberal-arts'
    yearOfStudy: 'year-1' | 'year-2' | 'year-3' | 'year-4'
    researchTopic: string
    researchDescription: string
    methodology: 'quantitative' | 'qualitative' | 'mixed-methods' | 'experimental' | 'theoretical'
    collaborationType: 'solo' | 'team' | 'faculty-collaboration'
    timeline: '1-3 months' | '4-6 months' | '6-12 months' | 'ongoing'
    impact: 'local' | 'national' | 'regional' | 'global'
    additionalInfo?: string
}

export interface ApplicationFormState extends ApplicationForm {
    isSubmitting: boolean
    submitError: string | null
    submitSuccess: boolean
}

// API utility functions
const apiRequest = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
    const url = `${API_BASE_URL}${endpoint}`

    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        })

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        console.error(`API request failed for ${endpoint}:`, error)
        throw error
    }
}

export const useApi = () => {
    const loading = ref(false)
    const error = ref<string | null>(null)

    // Clear error state
    const clearError = () => {
        error.value = null
    }

    // Articles API
    const getArticles = async (options: {
        featured?: boolean
        category?: string
        populate?: boolean
        limit?: number
        page?: number
    } = {}) => {
        loading.value = true
        error.value = null

        try {
            let endpoint = '/articles'
            const params = new URLSearchParams()

            if (options.featured) {
                params.append('filters[featured][$eq]', 'true')
            }
            if (options.category) {
                params.append('filters[category][$eq]', options.category)
            }
            if (options.populate) {
                params.append('populate', '*')
            }
            if (options.limit) {
                params.append('pagination[pageSize]', options.limit.toString())
            }
            if (options.page) {
                params.append('pagination[page]', options.page.toString())
            }

            // Always get published articles
            params.append('filters[status][$eq]', 'published')
            params.append('sort[0]', 'publishedDate:desc')

            if (params.toString()) {
                endpoint += `?${params.toString()}`
            }

            const response = await apiRequest<Article[]>(endpoint)
            return response
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to fetch articles'
            throw err
        } finally {
            loading.value = false
        }
    }

    const getArticleBySlug = async (slug: string) => {
        loading.value = true
        error.value = null

        try {
            const endpoint = `/articles?filters[slug][$eq]=${slug}&populate=*`
            const response = await apiRequest<Article[]>(endpoint)

            if (response.length === 0) {
                throw new Error('Article not found')
            }

            return response[0]
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to fetch article'
            throw err
        } finally {
            loading.value = false
        }
    }

    // Team Members API
    const getTeamMembers = async () => {
        loading.value = true
        error.value = null

        try {
            const endpoint = '/team-members?filters[isActive][$eq]=true&sort[0]=order:asc'
            const response = await apiRequest<TeamMember[]>(endpoint)
            return response
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to fetch team members'
            throw err
        } finally {
            loading.value = false
        }
    }

    // Researchers API  
    const getResearchers = async (options: {
        status?: 'active' | 'alumni' | 'inactive'
        program?: string
        limit?: number
    } = {}) => {
        loading.value = true
        error.value = null

        try {
            let endpoint = '/researchers'
            const params = new URLSearchParams()

            if (options.status) {
                params.append('filters[status][$eq]', options.status)
            }
            if (options.program) {
                params.append('filters[program][$eq]', options.program)
            }
            if (options.limit) {
                params.append('pagination[pageSize]', options.limit.toString())
            }

            if (params.toString()) {
                endpoint += `?${params.toString()}`
            }

            const response = await apiRequest<Researcher[]>(endpoint)
            return response
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to fetch researchers'
            throw err
        } finally {
            loading.value = false
        }
    }

    // Tags API
    const getTags = async () => {
        loading.value = true
        error.value = null

        try {
            const response = await apiRequest<Tag[]>('/tags')
            return response
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to fetch tags'
            throw err
        } finally {
            loading.value = false
        }
    }

    // Newsletter subscription
    const subscribeNewsletter = async (email: string) => {
        loading.value = true
        error.value = null

        try {
            await apiRequest('/newsletter-subscribers', {
                method: 'POST',
                body: JSON.stringify({
                    data: { email, isActive: true }
                })
            })
            return true
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to subscribe to newsletter'
            throw err
        } finally {
            loading.value = false
        }
    }

    // Application submission
    const submitApplication = async (applicationData: ApplicationForm) => {
        loading.value = true
        error.value = null

        try {
            await apiRequest('/applications', {
                method: 'POST',
                body: JSON.stringify({
                    data: applicationData
                })
            })
            return true
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to submit application'
            throw err
        } finally {
            loading.value = false
        }
    }

    return {
        // State
        loading: computed(() => loading.value),
        error: computed(() => error.value),

        // Methods
        clearError,
        getArticles,
        getArticleBySlug,
        getTeamMembers,
        getResearchers,
        getTags,
        subscribeNewsletter,
        submitApplication,
    }
}