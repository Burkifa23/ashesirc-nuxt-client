<template>
  <!-- Research Feature Application Form -->
  <!-- Comment out this entire template to disable the form and use external service -->
  <main class="min-h-screen bg-paper">
    <div class="mx-auto max-w-4xl px-4 py-12 md:py-16">
      <!-- Header Section -->
      <div class="text-center mb-12">
        <h1 class="font-serif text-3xl leading-tight text-ink md:text-4xl lg:text-5xl">
          Get Featured in Our Magazine
        </h1>
        <p class="mt-4 text-lg text-ink/75 max-w-2xl mx-auto">
          Share your research with the Ashesi community. We're looking for innovative projects, 
          groundbreaking discoveries, and inspiring academic journeys to feature in our magazine.
        </p>
      </div>

      <!-- Application Form -->
      <div class="bg-white rounded-lg border border-slate-200 p-8 md:p-12">
        <form @submit.prevent="onSubmit" class="space-y-8">
          <!-- Personal Information -->
          <section>
            <h2 class="font-serif text-xl text-ink mb-6">Personal Information</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="firstName" class="block text-sm font-medium text-ink mb-2">
                  First Name *
                </label>
                <input 
                  id="firstName" 
                  v-model="form.firstName" 
                  type="text" 
                  required 
                  class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-colors"
                />
              </div>
              <div>
                <label for="lastName" class="block text-sm font-medium text-ink mb-2">
                  Last Name *
                </label>
                <input 
                  id="lastName" 
                  v-model="form.lastName" 
                  type="text" 
                  required 
                  class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-colors"
                />
              </div>
              <div>
                <label for="email" class="block text-sm font-medium text-ink mb-2">
                  Email Address *
                </label>
                <input 
                  id="email" 
                  v-model="form.email" 
                  type="email" 
                  required 
                  class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-colors"
                />
              </div>
              <div>
                <label for="phone" class="block text-sm font-medium text-ink mb-2">
                  Phone Number
                </label>
                <input 
                  id="phone" 
                  v-model="form.phone" 
                  type="tel" 
                  class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-colors"
                />
              </div>
            </div>
          </section>

          <!-- Academic Information -->
          <section>
            <h2 class="font-serif text-xl text-ink mb-6">Academic Information</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="program" class="block text-sm font-medium text-ink mb-2">
                  Program of Study *
                </label>
                <select 
                  id="program" 
                  v-model="form.program" 
                  required 
                  class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-colors"
                >
                  <option value="">Select your program</option>
                  <option value="computer-science">Computer Science</option>
                  <option value="electrical-engineering">Electrical & Electronics Engineering</option>
                  <option value="mechanical-engineering">Mechanical Engineering</option>
                  <option value="business-administration">Business Administration</option>
                  <option value="economics">Economics</option>
                  <option value="liberal-arts">Liberal Arts</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label for="year" class="block text-sm font-medium text-ink mb-2">
                  Year of Study *
                </label>
                <select 
                  id="year" 
                  v-model="form.year" 
                  required 
                  class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-colors"
                >
                  <option value="">Select year</option>
                  <option value="1">Year 1</option>
                  <option value="2">Year 2</option>
                  <option value="3">Year 3</option>
                  <option value="4">Year 4</option>
                  <option value="graduate">Graduate</option>
                  <option value="faculty">Faculty</option>
                  <option value="staff">Staff</option>
                </select>
              </div>
              <div class="md:col-span-2">
                <label for="advisor" class="block text-sm font-medium text-ink mb-2">
                  Research Advisor/Supervisor
                </label>
                <input 
                  id="advisor" 
                  v-model="form.advisor" 
                  type="text" 
                  class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-colors"
                />
              </div>
            </div>
          </section>

          <!-- Research Information -->
          <section>
            <h2 class="font-serif text-xl text-ink mb-6">Research Information</h2>
            <div class="space-y-6">
              <div>
                <label for="title" class="block text-sm font-medium text-ink mb-2">
                  Research Project Title *
                </label>
                <input 
                  id="title" 
                  v-model="form.title" 
                  type="text" 
                  required 
                  class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-colors"
                />
              </div>
              <div>
                <label for="category" class="block text-sm font-medium text-ink mb-2">
                  Research Category *
                </label>
                <select 
                  id="category" 
                  v-model="form.category" 
                  required 
                  class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-colors"
                >
                  <option value="">Select category</option>
                  <option value="computer-science">Computer Science & Technology</option>
                  <option value="engineering">Engineering & Innovation</option>
                  <option value="business">Business & Entrepreneurship</option>
                  <option value="social-sciences">Social Sciences</option>
                  <option value="humanities">Liberal Arts & Humanities</option>
                  <option value="interdisciplinary">Interdisciplinary</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label for="abstract" class="block text-sm font-medium text-ink mb-2">
                  Research Abstract/Summary *
                </label>
                <textarea 
                  id="abstract" 
                  v-model="form.abstract" 
                  required 
                  rows="6" 
                  placeholder="Provide a brief summary of your research, its objectives, methodology, and key findings..."
                  class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-colors resize-vertical"
                ></textarea>
              </div>
              <div>
                <label for="impact" class="block text-sm font-medium text-ink mb-2">
                  Potential Impact & Significance *
                </label>
                <textarea 
                  id="impact" 
                  v-model="form.impact" 
                  required 
                  rows="4" 
                  placeholder="Explain how your research contributes to your field and its potential real-world applications..."
                  class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-colors resize-vertical"
                ></textarea>
              </div>
              <div>
                <label for="stage" class="block text-sm font-medium text-ink mb-2">
                  Project Stage *
                </label>
                <select 
                  id="stage" 
                  v-model="form.stage" 
                  required 
                  class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-colors"
                >
                  <option value="">Select current stage</option>
                  <option value="proposal">Proposal/Planning Stage</option>
                  <option value="ongoing">Ongoing Research</option>
                  <option value="near-completion">Near Completion</option>
                  <option value="completed">Completed</option>
                  <option value="published">Published/Presented</option>
                </select>
              </div>
            </div>
          </section>

          <!-- Additional Information -->
          <section>
            <h2 class="font-serif text-xl text-ink mb-6">Additional Information</h2>
            <div class="space-y-6">
              <div>
                <label for="motivation" class="block text-sm font-medium text-ink mb-2">
                  Why do you want to be featured?
                </label>
                <textarea 
                  id="motivation" 
                  v-model="form.motivation" 
                  rows="4" 
                  placeholder="Share your motivation for wanting to be featured in the Ashesi Research Magazine..."
                  class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-colors resize-vertical"
                ></textarea>
              </div>
              <div>
                <label for="materials" class="block text-sm font-medium text-ink mb-2">
                  Supporting Materials
                </label>
                <div class="space-y-3">
                  <div class="text-sm text-ink/70">
                    Please provide links to any supporting materials (papers, presentations, GitHub repos, etc.):
                  </div>
                  <input 
                    v-model="form.materials" 
                    type="url" 
                    placeholder="https://example.com/your-research-paper"
                    class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-colors"
                  />
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <input 
                  id="consent" 
                  v-model="form.consent" 
                  type="checkbox" 
                  required
                  class="mt-1 h-4 w-4 text-secondary border-slate-300 rounded focus:ring-secondary"
                />
                <label for="consent" class="text-sm text-ink">
                  I consent to being contacted for an interview and potentially being featured in the Ashesi Research Magazine. I understand that submission does not guarantee publication. *
                </label>
              </div>
            </div>
          </section>

          <!-- Submit Button -->
          <div class="pt-6">
            <button 
              type="submit" 
              :disabled="isSubmitting"
              class="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-md bg-primary px-8 py-3 text-sm font-medium text-white hover:bg-blue-oxford-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span v-if="isSubmitting">Submitting...</span>
              <span v-else>Submit Application</span>
              <svg v-if="!isSubmitting" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12l-7.5 7.5M21 12H3"/>
              </svg>
            </button>
          </div>
        </form>
      </div>

      <!-- Help Section -->
      <div class="mt-12 text-center">
        <div class="bg-slate-50 rounded-lg p-6">
          <h3 class="font-serif text-lg text-ink mb-2">Need Help?</h3>
          <p class="text-sm text-ink/70 mb-4">
            Have questions about the application process or need assistance with your submission?
          </p>
          <a 
            href="mailto:research@ashesi.edu.gh" 
            class="inline-flex items-center gap-2 text-sm text-secondary hover:text-vista-blue-600 transition-colors"
          >
            Contact our editorial team
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12l-7.5 7.5M21 12H3"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </main>
  <!-- End Research Feature Application Form -->
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

// Form state
const isSubmitting = ref(false)
const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  program: '',
  year: '',
  advisor: '',
  title: '',
  category: '',
  abstract: '',
  impact: '',
  stage: '',
  motivation: '',
  materials: '',
  consent: false
})

// Form submission handler
async function onSubmit() {
  isSubmitting.value = true
  
  try {
    // Simulate API call - replace with actual endpoint
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // In a real app, send form data to backend
    console.log('Form submitted:', form)
    
    // Show success message
    alert('Application submitted successfully! We\'ll review your submission and contact you within 5-7 business days.')
    
    // Reset form
    Object.keys(form).forEach(key => {
      if (typeof form[key] === 'boolean') {
        form[key] = false
      } else {
        form[key] = ''
      }
    })
    
  } catch (error) {
    console.error('Submission error:', error)
    alert('There was an error submitting your application. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
/* Additional form-specific styles if needed */
textarea {
  min-height: 100px;
}

select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}
</style>
