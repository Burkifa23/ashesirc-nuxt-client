<template>
  <main class="min-h-screen bg-gradient-to-b from-paper to-paper/50">
    <div class="mx-auto max-w-4xl px-4 py-12 md:py-20">
      <!-- Header Section -->
      <div class="text-center mb-16">
        <h1 class="font-serif text-4xl leading-tight text-ink md:text-5xl lg:text-6xl">
          Join Our Research Community
        </h1>
        <p class="mt-6 text-xl text-ink/70 max-w-3xl mx-auto leading-relaxed">
          Embark on a journey of discovery. Apply to join Ashesi's premier research initiative where 
          innovation meets impact, and where your ideas can shape the future.
        </p>
      </div>

      <!-- Application Form -->
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-2xl p-8 md:p-12">
        <!-- Success Message -->
        <div v-if="submitSuccess" class="mb-12 p-6 bg-emerald-50 border-l-4 border-emerald-400 rounded-r-lg">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-emerald-800 font-medium">Application Submitted Successfully!</h3>
              <p class="mt-1 text-sm text-emerald-700">We'll review your submission and contact you within 5-7 business days.</p>
            </div>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="submitError || error" class="mb-12 p-6 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-red-800 font-medium">Submission Error</h3>
              <p class="mt-1 text-sm text-red-700">{{ submitError || error }}</p>
            </div>
          </div>
        </div>

        <form @submit.prevent="onSubmit" class="space-y-12">
          <!-- Personal Information -->
          <section>
            <div class="border-b border-slate-200 pb-6 mb-8">
              <h2 class="font-serif text-2xl text-ink">Personal Information</h2>
              <p class="mt-2 text-sm text-ink/60">Tell us about yourself and your contact details.</p>
            </div>
            
            <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div class="space-y-2">
                <label for="firstName" class="block text-sm font-semibold text-ink">
                  First Name *
                </label>
                <input 
                  id="firstName" 
                  v-model="form.firstName" 
                  type="text" 
                  required 
                  class="block w-full rounded-lg border-slate-300 shadow-sm focus:border-primary focus:ring-primary text-ink placeholder:text-ink/40 px-4 py-3"
                  placeholder="Enter your first name"
                />
              </div>

              <div class="space-y-2">
                <label for="lastName" class="block text-sm font-semibold text-ink">
                  Last Name *
                </label>
                <input 
                  id="lastName" 
                  v-model="form.lastName" 
                  type="text" 
                  required 
                  class="block w-full rounded-lg border-slate-300 shadow-sm focus:border-primary focus:ring-primary text-ink placeholder:text-ink/40 px-4 py-3"
                  placeholder="Enter your last name"
                />
              </div>

              <div class="space-y-2">
                <label for="email" class="block text-sm font-semibold text-ink">
                  Email Address *
                </label>
                <input 
                  id="email" 
                  v-model="form.email" 
                  type="email" 
                  required 
                  class="block w-full rounded-lg border-slate-300 shadow-sm focus:border-primary focus:ring-primary text-ink placeholder:text-ink/40 px-4 py-3"
                  :placeholder="`your.name@${appConfig.universityDomain}`"
                />
              </div>

              <div class="space-y-2">
                <label for="phone" class="block text-sm font-semibold text-ink">
                  Phone Number *
                </label>
                <input 
                  id="phone" 
                  v-model="form.phone" 
                  type="tel" 
                  required 
                  class="block w-full rounded-lg border-slate-300 shadow-sm focus:border-primary focus:ring-primary text-ink placeholder:text-ink/40 px-4 py-3"
                  placeholder="+233 XX XXX XXXX"
                />
              </div>
            </div>
          </section>

          <!-- Academic Information -->
          <section>
            <div class="border-b border-slate-200 pb-6 mb-8">
              <h2 class="font-serif text-2xl text-ink">Academic Information</h2>
              <p class="mt-2 text-sm text-ink/60">Your academic background and program details.</p>
            </div>
            
            <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div class="space-y-2">
                <label for="program" class="block text-sm font-semibold text-ink">
                  Academic Program *
                </label>
                <select 
                  id="program" 
                  v-model="form.program" 
                  required 
                  class="block w-full rounded-lg border-slate-300 shadow-sm focus:border-primary focus:ring-primary text-ink px-4 py-3"
                >
                  <option value="computer-science">Computer Science</option>
                  <option value="electrical-engineering">Electrical Engineering</option>
                  <option value="mechanical-engineering">Mechanical Engineering</option>
                  <option value="business-administration">Business Administration</option>
                  <option value="economics">Economics</option>
                  <option value="liberal-arts">Liberal Arts</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div class="space-y-2">
                <label for="yearOfStudy" class="block text-sm font-semibold text-ink">
                  Year of Study *
                </label>
                <select 
                  id="yearOfStudy" 
                  v-model="form.yearOfStudy" 
                  required 
                  class="block w-full rounded-lg border-slate-300 shadow-sm focus:border-primary focus:ring-primary text-ink px-4 py-3"
                >
                  <option value="year-1">Year 1</option>
                  <option value="year-2">Year 2</option>
                  <option value="year-3">Year 3</option>
                  <option value="year-4">Year 4</option>
                  <option value="graduate">Graduate Student</option>
                  <option value="faculty">Faculty</option>
                  <option value="staff">Staff</option>
                </select>
              </div>
            </div>
          </section>

          <!-- Research Information -->
          <section>
            <div class="border-b border-slate-200 pb-6 mb-8">
              <h2 class="font-serif text-2xl text-ink">Research Information</h2>
              <p class="mt-2 text-sm text-ink/60">Details about your proposed research project.</p>
            </div>
            
            <div class="space-y-8">
              <div class="space-y-2">
                <label for="researchAdvisor" class="block text-sm font-semibold text-ink">
                  Research Advisor (Optional)
                </label>
                <input 
                  id="researchAdvisor" 
                  v-model="form.researchAdvisor" 
                  type="text" 
                  class="block w-full rounded-lg border-slate-300 shadow-sm focus:border-primary focus:ring-primary text-ink placeholder:text-ink/40 px-4 py-3"
                  placeholder="e.g., Dr. Sarah Johnson, Computer Science Department"
                />
              </div>

              <div class="space-y-2">
                <label for="researchTitle" class="block text-sm font-semibold text-ink">
                  Research Title *
                </label>
                <input 
                  id="researchTitle" 
                  v-model="form.researchTitle" 
                  type="text" 
                  required 
                  class="block w-full rounded-lg border-slate-300 shadow-sm focus:border-primary focus:ring-primary text-ink placeholder:text-ink/40 px-4 py-3"
                  placeholder="e.g., Machine Learning for Agricultural Disease Detection in Ghana"
                />
              </div>

              <div class="space-y-2">
                <label for="researchCategory" class="block text-sm font-semibold text-ink">
                  Research Category *
                </label>
                <select 
                  id="researchCategory" 
                  v-model="form.researchCategory" 
                  required 
                  class="block w-full rounded-lg border-slate-300 shadow-sm focus:border-primary focus:ring-primary text-ink px-4 py-3"
                >
                  <option value="computer-science">Computer Science</option>
                  <option value="engineering">Engineering</option>
                  <option value="business">Business & Entrepreneurship</option>
                  <option value="social-sciences">Social Sciences</option>
                  <option value="humanities">Humanities</option>
                  <option value="interdisciplinary">Interdisciplinary</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div class="space-y-2">
                <label for="projectStage" class="block text-sm font-semibold text-ink">
                  Project Stage *
                </label>
                <select 
                  id="projectStage" 
                  v-model="form.projectStage" 
                  required 
                  class="block w-full rounded-lg border-slate-300 shadow-sm focus:border-primary focus:ring-primary text-ink px-4 py-3"
                >
                  <option value="ideation">Ideation Phase</option>
                  <option value="research">Research & Planning</option>
                  <option value="development">Development & Implementation</option>
                  <option value="testing">Testing & Validation</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </section>

          <!-- Research Details -->
          <section>
            <div class="border-b border-slate-200 pb-6 mb-8">
              <h2 class="font-serif text-2xl text-ink">Research Details</h2>
              <p class="mt-2 text-sm text-ink/60">Detailed description of your research project.</p>
            </div>
            
            <div class="space-y-8">
              <div class="space-y-2">
                <label for="abstract" class="block text-sm font-semibold text-ink">
                  Research Abstract *
                </label>
                <textarea 
                  id="abstract" 
                  v-model="form.abstract" 
                  required 
                  rows="6"
                  class="block w-full rounded-lg border-slate-300 shadow-sm focus:border-primary focus:ring-primary text-ink placeholder:text-ink/40 px-4 py-3"
                  placeholder="Provide a detailed abstract of your research including objectives, methods, and expected outcomes..."
                ></textarea>
              </div>

              <div class="space-y-2">
                <label for="motivation" class="block text-sm font-semibold text-ink">
                  Research Motivation *
                </label>
                <textarea 
                  id="motivation" 
                  v-model="form.motivation" 
                  required 
                  rows="4"
                  class="block w-full rounded-lg border-slate-300 shadow-sm focus:border-primary focus:ring-primary text-ink placeholder:text-ink/40 px-4 py-3"
                  placeholder="What inspired this research? What problem are you trying to solve and why is it important?"
                ></textarea>
              </div>

              <div class="space-y-2">
                <label for="impact" class="block text-sm font-semibold text-ink">
                  Expected Impact *
                </label>
                <textarea 
                  id="impact" 
                  v-model="form.impact" 
                  required 
                  rows="4"
                  class="block w-full rounded-lg border-slate-300 shadow-sm focus:border-primary focus:ring-primary text-ink placeholder:text-ink/40 px-4 py-3"
                  placeholder="Describe the potential impact of your research on your field, community, or society..."
                ></textarea>
              </div>

              <div class="space-y-2">
                <label for="supportingMaterials" class="block text-sm font-semibold text-ink">
                  Supporting Materials (Optional)
                </label>
                <textarea 
                  id="supportingMaterials" 
                  v-model="form.supportingMaterials" 
                  rows="3"
                  class="block w-full rounded-lg border-slate-300 shadow-sm focus:border-primary focus:ring-primary text-ink placeholder:text-ink/40 px-4 py-3"
                  placeholder="Provide links to any supporting materials, publications, or portfolio items..."
                ></textarea>
              </div>
            </div>
          </section>

          <!-- Consent & Agreement -->
          <section>
            <div class="border-b border-slate-200 pb-6 mb-8">
              <h2 class="font-serif text-2xl text-ink">Agreement & Consent</h2>
              <p class="mt-2 text-sm text-ink/60">Please review and agree to our terms.</p>
            </div>
            
            <div class="space-y-6">
              <div class="flex items-start space-x-3">
                <input 
                  id="consent" 
                  v-model="form.consent" 
                  type="checkbox" 
                  required
                  class="mt-1 h-5 w-5 rounded border-slate-300 text-primary focus:ring-primary"
                />
                <div class="text-sm">
                  <label for="consent" class="font-semibold text-ink">
                    I agree to the terms and conditions *
                  </label>
                  <p class="mt-1 text-ink/60">
                    I consent to the Ashesi Research Club processing my application and understand that 
                    my research may be featured in publications, presentations, or other academic materials. 
                    I commit to upholding the highest standards of academic integrity and ethical research practices.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <!-- Submit Button -->
          <div class="border-t border-slate-200 pt-8">
            <div class="flex justify-end">
              <button 
                type="submit" 
                :disabled="loading || !form.consent"
                class="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-primary to-blue-oxford-700 px-8 py-4 text-base font-semibold text-white shadow-lg hover:shadow-xl hover:from-primary/90 hover:to-blue-oxford-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
              >
                <span v-if="loading">Submitting Application...</span>
                <span v-else>Submit Application</span>
                <svg v-if="!loading" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12l-7.5 7.5M21 12H3"/>
                </svg>
                <div v-else class="h-5 w-5">
                  <svg class="animate-spin h-full w-full" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" opacity="0.25"/>
                    <path fill="currentColor" opacity="0.75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </form>
      </div>

      <!-- Information Section -->
      <div class="mt-12 text-center">
        <div class="bg-slate-50 rounded-xl p-6 border border-slate-200">
          <h3 class="font-serif text-lg text-ink mb-3">Questions About the Application Process?</h3>
          <p class="text-sm text-ink/70 mb-4">
            Our research coordinators are here to help guide you through the application process and answer any questions about our programs.
          </p>
          <div class="flex justify-center space-x-6 text-sm">
            <a :href="`mailto:${appConfig.contactEmail}`" class="inline-flex items-center gap-2 text-primary hover:text-blue-oxford-800 font-medium transition-colors">
              <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
              {{ appConfig.contactEmail }}
            </a>
            <span class="text-ink/40">|</span>
            <a :href="`tel:${appConfig.contactPhone.replace(/\s/g, '')}`" class="inline-flex items-center gap-2 text-primary hover:text-blue-oxford-800 font-medium transition-colors">
              <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              {{ appConfig.contactPhone }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useApi, type ApplicationForm as ApiApplicationForm } from '@/composables/useApi'
import { appConfig } from '@/config/app'

const { submitApplication, loading, error, clearError } = useApi()

// Success and error states
const submitSuccess = ref(false)
const submitError = ref<string | null>(null)

// Form interface matching the Application schema
interface ApplicationForm {
  // Personal Information (Required)
  firstName: string
  lastName: string
  email: string
  phone: string

  // Academic Information (Required)
  program: 'computer-science' | 'electrical-engineering' | 'mechanical-engineering' | 'business-administration' | 'economics' | 'liberal-arts' | 'other'
  yearOfStudy: 'year-1' | 'year-2' | 'year-3' | 'year-4' | 'graduate' | 'faculty' | 'staff'

  // Research Information
  researchAdvisor: string
  researchTitle: string
  researchCategory: 'computer-science' | 'engineering' | 'business' | 'social-sciences' | 'humanities' | 'interdisciplinary' | 'other'

  // Research Details (Required)
  abstract: string
  impact: string
  projectStage: 'ideation' | 'research' | 'development' | 'testing' | 'completed'
  motivation: string

  // Supporting Information
  supportingMaterials: string
  consent: boolean
}

// Form data
const form = reactive<ApplicationForm>({
  // Personal Information
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  
  // Academic Information
  program: 'computer-science',
  yearOfStudy: 'year-1',
  
  // Research Information
  researchAdvisor: '',
  researchTitle: '',
  researchCategory: 'computer-science',
  
  // Research Details
  abstract: '',
  impact: '',
  projectStage: 'ideation',
  motivation: '',
  
  // Supporting Information
  supportingMaterials: '',
  consent: false
})

// Form submission handler
async function onSubmit() {
  // Clear any previous errors
  clearError()
  submitError.value = null
  submitSuccess.value = false

  try {
    // Transform form data to match API expectations
    const applicationData: ApiApplicationForm = {
      name: `${form.firstName} ${form.lastName}`.trim(),
      email: form.email,
      program: form.program === 'other' ? 'computer-science' : form.program as any,
      yearOfStudy: ['graduate', 'faculty', 'staff'].includes(form.yearOfStudy) ? 'year-4' : form.yearOfStudy as any,
      researchTopic: form.researchTitle,
      researchDescription: form.abstract,
      methodology: 'mixed-methods',
      collaborationType: 'faculty-collaboration',
      timeline: '6-12 months',
      impact: 'national',
      additionalInfo: [
        form.phone && `Phone: ${form.phone}`,
        form.researchAdvisor && `Research Advisor: ${form.researchAdvisor}`,
        form.researchCategory && `Research Category: ${form.researchCategory}`,
        form.motivation && `Motivation: ${form.motivation}`,
        form.impact && `Expected Impact: ${form.impact}`,
        form.projectStage && `Project Stage: ${form.projectStage}`,
        form.supportingMaterials && `Supporting Materials: ${form.supportingMaterials}`
      ].filter(Boolean).join('\n\n')
    }
    
    // Submit to API
    await submitApplication(applicationData)
    
    // Show success state
    submitSuccess.value = true
    
    // Reset form
    Object.assign(form, {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      program: 'computer-science',
      yearOfStudy: 'year-1',
      researchAdvisor: '',
      researchTitle: '',
      researchCategory: 'computer-science',
      abstract: '',
      impact: '',
      projectStage: 'ideation',
      motivation: '',
      supportingMaterials: '',
      consent: false
    })
    
  } catch (err) {
    console.error('Submission error:', err)
    submitError.value = err instanceof Error ? err.message : 'Failed to submit application'
  }
}
</script>

<style scoped>
/* Enhanced form styling with better padding */
input[type="text"],
input[type="email"],
input[type="tel"],
select,
textarea {
  transition: all 0.2s ease;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="tel"]:focus,
select:focus,
textarea:focus {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
}

textarea {
  min-height: 120px;
  resize: vertical;
}

select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 1rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 3rem;
}

input[type="checkbox"] {
  cursor: pointer;
}

input[type="checkbox"]:checked {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.bg-gradient-to-b {
  background-image: linear-gradient(to bottom, var(--tw-gradient-stops));
}

/* Loading animation improvements */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
