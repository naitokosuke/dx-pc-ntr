<script setup lang="ts">
const { breadcrumbs } = useBreadcrumbs();
</script>

<template>
  <div>
    <Header />
    <main>
      <ClientOnly>
        <Breadcrumbs
          v-if="breadcrumbs.length"
          :items="breadcrumbs"
        />
      </ClientOnly>
      <slot />
    </main>
  </div>
</template>

<style scoped>
main {
  padding: 2rem;
  display: grid;
  gap: 1.5rem;
}
</style>
