<template>
  <section class="mx-auto my-12 max-w-4xl rounded-md border border-slate-200/70 bg-paper p-6 md:my-16 md:p-8">
    <div class="grid items-center gap-6 md:grid-cols-5">
      <div class="md:col-span-2">
        <h3 class="font-serif text-2xl leading-tight text-ink">Subscribe to our magazine</h3>
        <p class="mt-1 text-sm text-ink/70">Research insights delivered monthly. No spam.</p>
      </div>
      <form class="md:col-span-3 flex flex-col gap-3 md:flex-row" @submit.prevent="onSubmit">
        <label class="sr-only" for="email">Email</label>
        <input id="email" v-model="email" type="email" required placeholder="you@example.com" class="flex-1 rounded border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-accent/20 placeholder:text-slate-400 focus:ring-2" />
        <button type="submit" class="rounded bg-ink px-4 py-2 text-sm font-medium text-paper hover:bg-ink/90">Subscribe</button>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const email = ref('')

function onSubmit() {
  // In a real app, integrate with a backend or an MCP like Supabase/Zapier.
  alert(`Subscribed: ${email.value}`)
  email.value = ''
}
</script>

<style scoped></style>
