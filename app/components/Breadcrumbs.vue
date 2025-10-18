<script setup lang="ts">
import type { BreadcrumbItem } from "~/composables/useBreadcrumbs";

const { items } = defineProps<{
  items: BreadcrumbItem[];
}>();
</script>

<template>
  <nav
    aria-label="Breadcrumb"
    class="breadcrumbs"
  >
    <ol>
      <li
        v-for="(item, index) in items"
        :key="index"
      >
        <Breadcrumb :to="item.to">
          {{ $t(item.i18nKey) }}
        </Breadcrumb>
        <Icon
          v-if="index < items.length - 1"
          name="material-symbols:chevron-right"
          aria-hidden="true"
        />
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.breadcrumbs {
  ol {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--color-text-secondary);
      font-size: 0.875rem;

      a {
        color: var(--color-text-secondary);
        text-decoration: none;
        transition: color 0.2s;

        &:hover {
          color: var(--color-primary);
        }
      }

      span[aria-current="page"] {
        color: var(--color-text);
        font-weight: 500;
      }
    }
  }
}
</style>
