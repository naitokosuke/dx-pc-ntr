<script setup lang="ts">
const { t } = useI18n();

const navLinks = [
  { path: "/", label: t("pages.dashboard") },
  { path: "/projects", label: t("pages.projects.list") },
  { path: "/todos", label: t("pages.todos.list") },
  { path: "/tags", label: t("pages.tags.list") },
  { path: "/search", label: t("pages.search") },
  { path: "/archived", label: t("pages.archived") },
];
</script>

<template>
  <header>
    <div class="header-left">
      <h1>
        <NuxtLinkLocale to="/">
          {{ $t("common.appName") }}
        </NuxtLinkLocale>
      </h1>
      <nav class="main-nav">
        <NuxtLinkLocale
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
        >
          {{ link.label }}
        </NuxtLinkLocale>
      </nav>
    </div>
    <nav class="utility-nav">
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
  gap: 2rem;

  .header-left {
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    gap: 2rem;
    justify-content: start;

    h1 {
      margin: 0;
      font-size: 1.25rem;

      a {
        color: var(--color-text);
        text-decoration: none;
        transition: color 0.2s;

        &:hover {
          color: var(--color-primary);
        }
      }
    }

    .main-nav {
      display: grid;
      grid-auto-flow: column;
      gap: 1.5rem;

      a {
        color: var(--color-text-secondary);
        text-decoration: none;
        font-size: 0.9375rem;
        transition: color 0.2s;
        position: relative;

        &:hover {
          color: var(--color-primary);
        }

        &.router-link-active {
          color: var(--color-primary);
          font-weight: 500;

          &::after {
            content: "";
            position: absolute;
            bottom: -1.25rem;
            left: 0;
            right: 0;
            height: 2px;
            background: var(--color-primary);
          }
        }
      }
    }
  }

  .utility-nav {
    display: grid;
    gap: 1rem;
  }
}
</style>
