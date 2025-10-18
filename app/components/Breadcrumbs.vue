<script lang="ts">
import type { NuxtRoute, RoutesNamesList } from "@typed-router";

export interface BreadcrumbItem {
  to?: NuxtRoute<RoutesNamesList, string>;
  label: string;
}

const breadcrumbs = ref<BreadcrumbItem[]>([]);

export const useBreadcrumbs = () => {
  const setBreadcrumbs = (_breadcrumbs: BreadcrumbItem[]) => {
    breadcrumbs.value = _breadcrumbs;
  };

  return {
    breadcrumbs: computed(() => breadcrumbs.value),
    setBreadcrumbs,
  };
};
</script>

<script setup lang="ts">
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
          {{ item.label }}
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
