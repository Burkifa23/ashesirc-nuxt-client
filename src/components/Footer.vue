<template>
  <footer class="mt-16 border-t border-slate-200/70 bg-paper/60">
    <div class="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 md:grid-cols-3">
      <div>
        <div class="mb-2 flex items-center gap-3">
          <div class="h-7 w-7 rounded-sm bg-accent text-paper grid place-items-center font-serif text-base font-semibold">RN</div>
          <span class="text-lg font-serif text-ink">Ashesi Research Magazine</span>
        </div>
        <p class="text-sm text-ink/70">Showcasing cutting-edge research and academic insights from Ashesi University and beyond.</p>
      </div>
      <div>
        <h4 class="mb-2 font-sans text-sm font-semibold tracking-wide text-ink/70">Links</h4>
        <ul class="space-y-1 text-sm">
          <li><a class="hover:underline" href="/">Home</a></li>
          <li><a class="hover:underline" href="/topics">Topics</a></li>
          <li><a class="hover:underline" href="/archives">Archives</a></li>
          <li><a class="hover:underline" href="/about">About</a></li>
          <li><a class="hover:underline" href="/join">Subscribe</a></li>
        </ul>
      </div>
      <div>
        <h4 class="mb-2 font-sans text-sm font-semibold tracking-wide text-ink/70">Connect</h4>
        <div class="flex gap-4 text-ink/70">
          <a href="#" aria-label="Twitter" class="hover:text-ink">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M22 5.92a8.19 8.19 0 0 1-2.36.65A4.12 4.12 0 0 0 21.4 4a8.21 8.21 0 0 1-2.6 1A4.1 4.1 0 0 0 12 8.1a11.63 11.63 0 0 1-8.44-4.28 4.09 4.09 0 0 0 1.27 5.47 4.08 4.08 0 0 1-1.86-.51v.05a4.1 4.1 0 0 0 3.29 4 4.1 4.1 0 0 1-1.85.07 4.1 4.1 0 0 0 3.83 2.85A8.22 8.22 0 0 1 2 19.54a11.62 11.62 0 0 0 6.29 1.84c7.55 0 11.68-6.26 11.68-11.69 0-.18 0-.35-.01-.53A8.33 8.33 0 0 0 22 5.92z"/></svg>
          </a>
          <a href="#" aria-label="LinkedIn" class="hover:text-ink">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M6.94 6.5A2.44 2.44 0 1 1 4.5 4.06 2.44 2.44 0 0 1 6.94 6.5zM7 8.75H2.75V21H7zM13.38 8.75A4.62 4.62 0 0 0 9 13.37V21h4.25v-6.48c0-1.71.62-2.88 2.18-2.88 1.18 0 1.8.8 1.8 2.88V21H21V14.1c0-3.83-2.04-5.6-4.75-5.6a4.13 4.13 0 0 0-2.87 1.25v-1z"/></svg>
          </a>
          <a href="#" aria-label="Email" class="hover:text-ink">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4a2 2 0 0 0-2 2v.4l10 6.25L22 6.4V6a2 2 0 0 0-2-2zm0 4.15-8 5-8-5V18a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2z"/></svg>
          </a>
        </div>
        <p class="mt-4 text-xs text-ink/60">© {{ new Date().getFullYear() }} Ashesi Research Magazine. All rights reserved.</p>
        <p class="mt-1 text-xs text-ink/60">Content for educational purposes. Opinions are authors' own.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped></style>
