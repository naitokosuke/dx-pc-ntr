<!--
  DEPRECATED: Do not use this component. Use Breadcrumbs.vue instead.
-->

<script setup lang="ts">
const route = useRoute();
const { t } = useI18n();

// FIXME: IS THERE A BETTER WAY TO DO THIS?
const LOCALE_SUFFIX_PATTERN = /___[a-z]+$/;
function stripLocaleSuffix(name: string | symbol | null | undefined): string {
  if (!name || typeof name === "symbol") return "";
  return name.toString().replace(LOCALE_SUFFIX_PATTERN, "");
}

const ROUTE_NAMES = [
  "index",
  "archived",
  "projects",
  "projects-new",
  "search",
  "tags",
  "todos",
  "todos-new",
  "projects-projectId",
  "projects-projectId-settings",
  "tags-tag",
  "todos-id",
  "todos-id-edit",
] as const;

function isRouteName(name: string): boolean {
  return ROUTE_NAMES.includes(name as any);
}

// FIXME: REDUNDANT & UGLY
function buildRoute(name: string): { name: string; params?: Record<string, any> } | undefined {
  const { params } = route;

  switch (name) {
    case "index":
    case "archived":
    case "projects":
    case "projects-new":
    case "search":
    case "tags":
    case "todos":
    case "todos-new":
      return { name };
    case "projects-projectId":
    case "projects-projectId-settings":
      return "projectId" in params ? { name, params: { projectId: params.projectId } } : undefined;
    case "tags-tag":
      return "tag" in params ? { name, params: { tag: params.tag } } : undefined;
    case "todos-id":
    case "todos-id-edit":
      return "id" in params ? { name, params: { id: params.id } } : undefined;
    default:
      return undefined;
  }
}

// FIXME: REDUNDANT & UGLY
function getRouteI18nKey(name: string): string {
  switch (name) {
    case "index": return "pages.dashboard";
    case "archived": return "pages.archived";
    case "projects": return "pages.projects.list";
    case "projects-new": return "pages.projects.new";
    case "search": return "pages.search";
    case "tags": return "pages.tags.list";
    case "todos": return "pages.todos.list";
    case "todos-new": return "pages.todos.new";

    // NOTE: Parameterized routes use param values directly as labels, so no i18n key needed
    case "projects-projectId":
    case "projects-projectId-settings":
    case "tags-tag":
    case "todos-id":
    case "todos-id-edit":
      return "";
    default:
      return "";
  }
}

const breadcrumbs = computed<{
  label: string;
  to?: { name: string; params?: Record<string, any> };
}[]>(() => [
  { label: t("pages.dashboard"), to: { name: "index" } },
  ...route.matched
    .map(matchedRoute => stripLocaleSuffix(matchedRoute.name))
    .filter((name): name is string => name !== "" && name !== "index" && isRouteName(name))
    .map((name, index, array) => {
      const isLast = index === array.length - 1;
      const paramValue = Object.values(route.params)[0];

      return {
        label: paramValue?.toString() ?? (() => {
          const i18nKey = getRouteI18nKey(name);
          if (!i18nKey) return name;
          const translated = t(i18nKey);
          return translated !== i18nKey ? translated : name;
        })(),
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
        <NuxtLinkLocale
          v-if="bc.to"
          :to="bc.to"
        >
          {{ bc.label }}
        </NuxtLinkLocale>
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
