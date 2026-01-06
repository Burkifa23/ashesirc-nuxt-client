import { ref, computed } from 'vue'
import { appConfig } from '@/config/app'

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

// Remove legacy apiRequest and Strapi methods. Provide only sheetdb-backed write methods and client state.
export const useApi = () => {
    const loading = ref(false)
    const error = ref<string | null>(null)

    const clearError = () => { error.value = null }

    // Newsletter subscription (SheetDB-only)
    const subscribeNewsletter = async (email: string) => {
        loading.value = true
        error.value = null
        try {
            if (!appConfig.sheetdbNewsletterUrl) {
                throw new Error('Newsletter service not configured')
            }

            const payload = {
                data: [{ id: 'INCREMENT', email }]
            }

            const res = await fetch(appConfig.sheetdbNewsletterUrl, {
                method: 'POST',
                headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })

            if (!res.ok) {
                const txt = await res.text()
                throw new Error(`SheetDB Error: ${res.status} ${txt}`)
            }

            return true
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to subscribe to newsletter'
            throw err
        } finally {
            loading.value = false
        }
    }

    // Application submission (SheetDB-only)
    const submitApplication = async (applicationData: ApplicationForm, sheetRow?: Record<string, any>) => {
        loading.value = true
        error.value = null
        try {
            if (!appConfig.sheetdbApplicationUrl) {
                throw new Error('Application service not configured')
            }

            const row: Record<string, any> = sheetRow ?? {
                id: 'INCREMENT',
                name: (applicationData as any).name || '',
                email: (applicationData as any).email || '',
                program: (applicationData as any).program || '',
                yearOfStudy: (applicationData as any).yearOfStudy || '',
                researchTopic: (applicationData as any).researchTopic || '',
                researchDescription: (applicationData as any).researchDescription || '',
                methodology: (applicationData as any).methodology || '',
                collaborationType: (applicationData as any).collaborationType || '',
                timeline: (applicationData as any).timeline || '',
                impact: (applicationData as any).impact || '',
                additionalInfo: (applicationData as any).additionalInfo || '',
            }

            const payload = { data: [row] }

            const res = await fetch(appConfig.sheetdbApplicationUrl, {
                method: 'POST',
                headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })

            if (!res.ok) {
                const txt = await res.text()
                throw new Error(`SheetDB Error: ${res.status} ${txt}`)
            }

            return true
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Failed to submit application'
            throw err
        } finally {
            loading.value = false
        }
    }

    return {
        loading: computed(() => loading.value),
        error: computed(() => error.value),
        clearError,
        subscribeNewsletter,
        submitApplication,
    }
}