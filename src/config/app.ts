// Environment configuration for the application
// This module provides type-safe access to environment variables

export interface AppConfig {
    // API Configuration
    apiBaseUrl: string

    // Application Configuration
    appName: string
    appDescription: string

    // Contact Information
    contactEmail: string
    contactPhone: string
    universityDomain: string

    // External Services
    googleFontsUrl: string
    googleFontsGstaticUrl: string

    // Development Configuration
    nodeEnv: string
    enableDevtools: boolean

    // SheetDB / Newsletter endpoint (optional)
    sheetdbNewsletterUrl: string

    // SheetDB / Applications endpoint (optional)
    sheetdbApplicationUrl: string

    // Sanity configuration (optional)
    sanityProjectId: string
    sanityDataset: string
    sanityApiVersion: string
    sanityUseCdn: boolean
    sanityReadToken: string
}

// Helper function to get environment variable with fallback
const getEnvVar = (key: string, fallback?: string): string => {
    const value = import.meta.env[key]
    if (value === undefined || value === '') {
        if (fallback !== undefined) {
            return fallback
        }
        throw new Error(`Environment variable ${key} is required but not set`)
    }
    return value
}

// Configuration object with all environment variables
export const appConfig: AppConfig = {
    // API Configuration
    apiBaseUrl: getEnvVar('VITE_API_BASE_URL'),

    // Application Configuration
    appName: getEnvVar('VITE_APP_NAME', 'Ashesi Research Club'),
    appDescription: getEnvVar('VITE_APP_DESCRIPTION', 'Ashesi University Research Club'),

    // Contact Information
    contactEmail: getEnvVar('VITE_CONTACT_EMAIL', 'research@ashesi.edu.gh'),
    contactPhone: getEnvVar('VITE_CONTACT_PHONE', '+233 302 610 330'),
    universityDomain: getEnvVar('VITE_UNIVERSITY_DOMAIN', 'ashesi.edu.gh'),

    // External Services
    googleFontsUrl: getEnvVar('VITE_GOOGLE_FONTS_URL', 'https://fonts.googleapis.com'),
    googleFontsGstaticUrl: getEnvVar('VITE_GOOGLE_FONTS_GSTATIC_URL', 'https://fonts.gstatic.com'),

    // Development Configuration
    nodeEnv: getEnvVar('VITE_NODE_ENV', 'development'),
    enableDevtools: getEnvVar('VITE_ENABLE_DEVTOOLS', 'true') === 'true',

    // SheetDB Newsletter endpoint (optional - empty string disables network calls)
    sheetdbNewsletterUrl: getEnvVar('VITE_SHEETDB_NEWSLETTER_URL', ''),

    // SheetDB Applications endpoint (optional - empty string disables network calls)
    sheetdbApplicationUrl: getEnvVar('VITE_SHEETDB_APPLICATION_URL', ''),

    // Sanity configuration
    sanityProjectId: getEnvVar('VITE_SANITY_PROJECT_ID', ''),
    sanityDataset: getEnvVar('VITE_SANITY_DATASET', 'production'),
    sanityApiVersion: getEnvVar('VITE_SANITY_API_VERSION', '2021-10-21'),
    sanityUseCdn: getEnvVar('VITE_SANITY_USE_CDN', 'true') === 'true',
    sanityReadToken: getEnvVar('VITE_SANITY_READ_TOKEN', ''),
}

// Utility functions for common configuration checks
export const isDevelopment = appConfig.nodeEnv === 'development'
export const isProduction = appConfig.nodeEnv === 'production'
export const devtoolsEnabled = appConfig.enableDevtools && isDevelopment

// Export default configuration
export default appConfig
