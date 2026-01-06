/// <reference types="vite/client" />

interface ImportMetaEnv {
    // API Configuration
    // Legacy Strapi base URL (optional — removed as required)
    readonly VITE_API_BASE_URL?: string

    // Application Configuration
    readonly VITE_APP_NAME: string
    readonly VITE_APP_DESCRIPTION: string

    // Contact Information
    readonly VITE_CONTACT_EMAIL: string
    readonly VITE_CONTACT_PHONE: string
    readonly VITE_UNIVERSITY_DOMAIN: string

    // External Services
    readonly VITE_GOOGLE_FONTS_URL: string
    readonly VITE_GOOGLE_FONTS_GSTATIC_URL: string

    // Development Configuration
    readonly VITE_NODE_ENV: string
    readonly VITE_ENABLE_DEVTOOLS: string

    // SheetDB endpoints (optional)
    readonly VITE_SHEETDB_NEWSLETTER_URL?: string
    readonly VITE_SHEETDB_APPLICATION_URL?: string

    // Sanity config (optional)
    readonly VITE_SANITY_PROJECT_ID?: string
    readonly VITE_SANITY_DATASET?: string
    readonly VITE_SANITY_API_VERSION?: string
    readonly VITE_SANITY_USE_CDN?: string
    readonly VITE_SANITY_READ_TOKEN?: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
