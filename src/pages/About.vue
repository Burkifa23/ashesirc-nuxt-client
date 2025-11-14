<template>
  <main class="min-h-screen bg-paper">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-slate-50 to-slate-100 border-b border-slate-200/70">
      <div class="mx-auto max-w-4xl px-4 py-16 md:py-20 text-center">
        <h1 class="font-serif text-4xl leading-tight text-ink md:text-5xl lg:text-6xl">
          About the <span class="text-accent">Research Club</span>
        </h1>
        <p class="mt-6 text-xl text-ink/75 leading-relaxed max-w-3xl mx-auto">
          Fostering academic excellence and innovation through collaborative research at Ashesi University
        </p>
      </div>
    </section>

    <!-- Mission & Vision -->
    <section class="py-16 md:py-20">
      <div class="mx-auto max-w-4xl px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 class="font-serif text-2xl text-ink mb-6">Our Mission</h2>
            <p class="text-ink/80 leading-relaxed mb-6">
              To amplify and celebrate student research across all departments by providing a platform highlighting diverse academic contributions.
            </p>
            <p class="text-ink/80 leading-relaxed">
              The club seeks to broaden recognition beyond traditionally visible fields, fostering appreciation for a broad spectrum of student scholarship.
            </p>
          </div>
          <div>
            <h2 class="font-serif text-2xl text-ink mb-6">Our Vision</h2>
            <p class="text-ink/80 leading-relaxed mb-6">
              To create a vibrant research culture at Ashesi where every researcher's work is valued, shared, and inspires innovation, collaboration, and impact across disciplines.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Impact Stats -->
    <section class="py-16 bg-slate-50 border-y border-slate-200/70">
      <div class="mx-auto max-w-6xl px-4">
        <h2 class="font-serif text-3xl text-center text-ink mb-12">Our Impact</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="text-3xl font-bold text-primary mb-2">50+</div>
            <div class="text-ink/70">Featured Researchers</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-primary mb-2">15</div>
            <div class="text-ink/70">Research Categories</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-primary mb-2">8</div>
            <div class="text-ink/70">Academic Departments</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-primary mb-2">2K+</div>
            <div class="text-ink/70">Monthly Readers</div>
          </div>
        </div>
      </div>
    </section>

    <!-- What We Do -->
    <section class="py-16 md:py-20">
      <div class="mx-auto max-w-4xl px-4">
        <h2 class="font-serif text-3xl text-center text-ink mb-12">What We Do</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <h3 class="font-serif text-xl text-ink mb-3">Publish Research</h3>
            <p class="text-ink/70 text-sm leading-relaxed">
              Feature outstanding student and faculty research in our quarterly magazine, reaching thousands of readers across Ghana and beyond.
            </p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 class="font-serif text-xl text-ink mb-3">Build Community</h3>
            <p class="text-ink/70 text-sm leading-relaxed">
              Connect researchers across disciplines through workshops, seminars, and collaborative projects that foster innovation.
            </p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 class="font-serif text-xl text-ink mb-3">Drive Impact</h3>
            <p class="text-ink/70 text-sm leading-relaxed">
              Amplify research that addresses real-world challenges and contributes to sustainable development across Africa.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Carousel -->
    <section class="py-16 md:py-20 bg-slate-50">
      <div class="mx-auto max-w-6xl px-4">
        <h2 class="font-serif text-3xl text-center text-ink mb-4">Meet Our Executives</h2>
        <p class="text-center text-ink/70 mb-12 max-w-2xl mx-auto">
          Passionate students and faculty dedicated to advancing research culture at Ashesi University
        </p>
        
        <!-- Carousel Container -->
        <div class="relative">
          <!-- Loading State -->
          <div v-if="loading" class="text-center py-8">
            <p class="text-ink/60">Loading team members...</p>
          </div>
          
          <!-- Error State -->
          <div v-else-if="apiError" class="text-center py-8">
            <p class="text-red-600">{{ apiError }}</p>
          </div>
          
          <!-- Team Members Carousel -->
          <div v-else>
            <!-- Carousel Wrapper -->
            <div class="overflow-hidden">
              <div 
                class="flex transition-transform duration-500 ease-in-out"
                :style="{ transform: `translateX(-${currentSlide * (100 / slidesPerView)}%)` }"
              >
              <!-- Team Member Cards -->
              <div 
                v-for="(member, index) in teamMembers" 
                :key="index"
                class="flex-shrink-0 px-3"
                :style="{ width: `${100 / slidesPerView}%` }"
              >
                <div class="bg-white rounded-xl border border-slate-200 overflow-hidden h-full">
                  <!-- Member Image -->
                  <div class="h-64 bg-gradient-to-br from-vista-blue-200 to-vista-blue-300 relative overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    <div class="absolute bottom-4 left-4 text-white">
                      <div class="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                        <span class="text-lg font-bold">{{ member.name.split(' ').map(n => n[0]).join('') }}</span>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Member Info -->
                  <div class="p-6">
                    <div class="flex items-start justify-between mb-3">
                      <div>
                        <h3 class="font-serif text-lg text-ink">{{ member.name }}</h3>
                        <p class="text-sm text-primary font-medium">{{ member.role }}</p>
                      </div>
                      <div class="text-xs text-ink/50">{{ member.yearOfStudy }}</div>
                    </div>
                    
                    <p class="text-sm text-ink/70 leading-relaxed mb-4">{{ member.description }}</p>
                    
                    <div class="flex flex-wrap gap-2">
                      <span class="text-xs px-2 py-1 bg-slate-100 text-ink/70 rounded-full">
                        {{ member.specialization }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          
          <!-- Navigation Buttons (only show when not loading/error) -->
          <button 
            v-if="!loading && !apiError"
            @click="previousSlide"
            :disabled="currentSlide === 0"
            class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md transition-shadow"
          >
            <svg class="w-5 h-5 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          
          <button 
            v-if="!loading && !apiError"
            @click="nextSlide"
            :disabled="currentSlide >= maxSlides"
            class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md transition-shadow"
          >
            <svg class="w-5 h-5 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
        
        <!-- Dots Indicator (only show when not loading/error) -->
        <div v-if="!loading && !apiError" class="flex justify-center space-x-2 mt-8">
          <button 
            v-for="dot in totalSlides" 
            :key="dot"
            @click="currentSlide = dot - 1"
            class="w-2 h-2 rounded-full transition-colors"
            :class="currentSlide === dot - 1 ? 'bg-primary' : 'bg-slate-300'"
          ></button>
        </div>
      </div>
    </section>

    <!-- Join Us CTA -->
    <section class="py-16 md:py-20">
      <div class="mx-auto max-w-4xl px-4 text-center">
        <h2 class="font-serif text-3xl text-ink mb-6">Join Our Mission</h2>
        <p class="text-lg text-ink/75 mb-8 max-w-2xl mx-auto">
          Whether you're a researcher, writer, or simply passionate about innovation, there's a place for you in our community.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/apply" 
            class="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-blue-oxford-800 transition-colors"
          >
            Get Featured
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12l-7.5 7.5M21 12H3"/>
            </svg>
          </a>
          <a 
            href="/join" 
            class="inline-flex items-center justify-center gap-2 rounded-md border border-secondary bg-secondary px-6 py-3 text-sm font-medium text-primary hover:bg-vista-blue-300 transition-colors"
          >
            Subscribe to Updates
          </a>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useApi, type TeamMember } from '@/composables/useApi'

const { getTeamMembers, loading, error } = useApi()

// Team members data - now loaded from API
const teamMembers = ref<TeamMember[]>([])
const apiError = ref<string | null>(null)

// Load team members on mount
onMounted(async () => {
  try {
    teamMembers.value = await getTeamMembers()
  } catch (err) {
    apiError.value = err instanceof Error ? err.message : 'Failed to load team members'
    // Fallback to empty array or show error message
    console.error('Failed to load team members:', err)
  }
})

// Carousel state
const currentSlide = ref(0)
const slidesPerView = ref(3)

// Computed properties for carousel
const totalSlides = computed(() => Math.ceil(teamMembers.value.length / slidesPerView.value))
const maxSlides = computed(() => totalSlides.value - 1)

// Carousel navigation
const nextSlide = () => {
  if (currentSlide.value < maxSlides.value) {
    currentSlide.value++
  }
}

const previousSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--
  }
}

// Responsive slides per view
const updateSlidesPerView = () => {
  if (window.innerWidth < 768) {
    slidesPerView.value = 1
  } else if (window.innerWidth < 1024) {
    slidesPerView.value = 2
  } else {
    slidesPerView.value = 3
  }
  // Reset to first slide when changing view
  currentSlide.value = 0
}

// Auto-advance carousel
let autoAdvanceInterval: number

const startAutoAdvance = () => {
  autoAdvanceInterval = setInterval(() => {
    if (currentSlide.value >= maxSlides.value) {
      currentSlide.value = 0
    } else {
      nextSlide()
    }
  }, 5000) // 5 seconds
}

const stopAutoAdvance = () => {
  if (autoAdvanceInterval) {
    clearInterval(autoAdvanceInterval)
  }
}

// Lifecycle
onMounted(() => {
  updateSlidesPerView()
  window.addEventListener('resize', updateSlidesPerView)
  startAutoAdvance()
})

onUnmounted(() => {
  window.removeEventListener('resize', updateSlidesPerView)
  stopAutoAdvance()
})
</script>

<style scoped>
/* Additional carousel-specific styles */
.carousel-container {
  scroll-snap-type: x mandatory;
}

.carousel-item {
  scroll-snap-align: start;
}
</style>
