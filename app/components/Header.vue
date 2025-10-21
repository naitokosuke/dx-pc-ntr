<script setup lang="ts">
import type { RoutesNamesList } from "@typed-router";
import { routesNames } from "@typed-router";

const navLinks: { name: RoutesNamesList; label: string }[] = [
  { name: routesNames.index, label: "ダッシュボード" },
  { name: routesNames.todos, label: "TODO一覧" },
  { name: routesNames.projects, label: "プロジェクト一覧" },
  { name: routesNames.tags, label: "タグ一覧" },
  { name: routesNames.search, label: "全体横断検索" },
  { name: routesNames.archived, label: "アーカイブ一覧" },
];
</script>

<template>
  <header>
    <div class="header-left">
      <h1>
        <NuxtLink to="/">
          Todoアプリ
        </NuxtLink>
      </h1>
      <nav class="main-nav">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.name"
          :to="{ name: link.name }"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
    </div>
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

}
</style>
