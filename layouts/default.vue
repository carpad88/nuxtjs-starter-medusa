<template>
  <div class="min-h-screen flex flex-col">
    <app-navbar />

    <main class="flex-1">
      <Nuxt />
    </main>

    <app-footer />
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout'
}
</script>
