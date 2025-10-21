<!--
  DEPRECATED: Do not use this component. Use Breadcrumbs.vue instead.
-->

<script setup lang="ts">
import type { RoutesNamedLocations, RoutesNamesList } from "@typed-router";
import { routesNames } from "@typed-router";

const route = useRoute();

// FIXME: IS THERE A BETTER WAY TO DO THIS?
const LOCALE_SUFFIX_PATTERN = /___[a-z]+$/;
function stripLocaleSuffix(name: string | symbol | null | undefined): string {
  if (!name || typeof name === "symbol") return "";
  return name.toString().replace(LOCALE_SUFFIX_PATTERN, "");
}

function isRouteName(name: string): name is RoutesNamesList {
  return Object.values(routesNames).some(routeName => routeName === name);
}

// FIXME: REDUNDANT & UGLY
function buildRoute(name: RoutesNamesList): RoutesNamedLocations | undefined {
  const { params } = route;

  switch (name) {
    case "index": return { name };
    case "archived": return { name };
    case "projects": return { name };
    case "projects-new": return { name };
    case "search": return { name };
    case "tags": return { name };
    case "todos": return { name };
    case "todos-new": return { name };
    case "projects-projectId": return "projectId" in params ? { name, params: { projectId: params.projectId } } : undefined;
    case "projects-projectId-settings": return "projectId" in params ? { name, params: { projectId: params.projectId } } : undefined;
    case "tags-tag": return "tag" in params ? { name, params: { tag: params.tag } } : undefined;
    case "todos-id": return "id" in params ? { name, params: { id: params.id } } : undefined;
    case "todos-id-edit": return "id" in params ? { name, params: { id: params.id } } : undefined;
    default: {
      const _exhaustiveCheck: never = name;
      return _exhaustiveCheck;
    }
  }
}

// FIXME: REDUNDANT & UGLY
function getRouteLabel(name: RoutesNamesList): string {
  switch (name) {
    case "index": return "ダッシュボード";
    case "archived": return "アーカイブ一覧";
    case "projects": return "プロジェクト一覧";
    case "projects-new": return "プロジェクト作成";
    case "search": return "全体横断検索";
    case "tags": return "タグ一覧";
    case "todos": return "TODO一覧";
    case "todos-new": return "TODO作成";

    // NOTE: Parameterized routes use param values directly as labels, so no label needed
    case "projects-projectId": return "";
    case "projects-projectId-settings": return "";
    case "tags-tag": return "";
    case "todos-id": return "";
    case "todos-id-edit": return "";
    default: {
      const _exhaustiveCheck: never = name;
      return _exhaustiveCheck;
    }
  }
}

const breadcrumbs = computed<{
  label: string;
  to?: RoutesNamedLocations;
}[]>(() => [
  { label: "ダッシュボード", to: { name: "index" } },
  ...route.matched
    .map(matchedRoute => stripLocaleSuffix(matchedRoute.name))
    .filter((name): name is RoutesNamesList => name !== "" && name !== "index" && isRouteName(name))
    .map((name, index, array) => {
      const isLast = index === array.length - 1;
      const paramValue = Object.values(route.params)[0];

      return {
        label: paramValue?.toString() ?? (getRouteLabel(name) || name),
        to: isLast ? undefined : buildRoute(name),
      };
    }),
]);
</script>

<template>
  <nav
    aria-label="Breadcrumb"
    class="breadcrumbs"
  >
    <ol>
      <li
        v-for="(bc, index) in breadcrumbs"
        :key="bc.to ? JSON.stringify(bc.to) : bc.label"
      >
        <NuxtLink
          v-if="bc.to"
          :to="bc.to"
        >
          {{ bc.label }}
        </NuxtLink>
        <span
          v-else
          aria-current="page"
        >
          {{ bc.label }}
        </span>
        <Icon
          v-if="index < breadcrumbs.length - 1"
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
