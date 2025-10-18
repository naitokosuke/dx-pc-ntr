<template>
  <header>
    <div>
      <h1>{{ $t("common.appName") }}</h1>
    </div>
    <nav>
      <LangSelect />
    </nav>
  </header>
</template>

<style scoped>
header {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--color-border);
}

nav {
  display: grid;
  gap: 1rem;
}
</style>
