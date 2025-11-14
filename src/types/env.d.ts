/// <reference types="vite/client" />

interface ImportMetaEnv {
    // API Configuration
    readonly VITE_API_BASE_URL: string

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
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
