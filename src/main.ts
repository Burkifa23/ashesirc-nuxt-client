import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { appConfig } from '@/config/app'

// Set document title from environment variable
document.title = appConfig.appName

// Set meta description from environment variable
const metaDescription = document.querySelector('meta[name="description"]')
if (metaDescription) {
    metaDescription.setAttribute('content', appConfig.appDescription)
}

createApp(App).mount('#app')
