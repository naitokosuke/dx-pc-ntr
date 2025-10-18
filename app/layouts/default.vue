<template>
  <div>
    <Header />
    <main>
      <BreadCrumbs />
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
