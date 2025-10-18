<script setup lang="ts">
import type { GeneratedTypeConfig } from "@intlify/core-base";

const route = useRoute();
const { t } = useI18n();

interface BreadCrumb {
  label: string;
  path?: string;
}

function isLocaleCode(code: string): code is GeneratedTypeConfig["locale"] {
  return code === "ja" || code === "en";
}

const breadcrumbs = computed<BreadCrumb[]>(() => {
  const pathSegments = route.path.split("/").filter(Boolean);

  const firstSegment = pathSegments[0];
  const hasLocalePrefix = firstSegment && isLocaleCode(firstSegment);
  const filteredSegments = hasLocalePrefix
    ? pathSegments.slice(1)
    : pathSegments;

  const localePrefix = hasLocalePrefix ? `/${firstSegment}` : "";

  const breadcrumbs: BreadCrumb[] = [{ label: t("common.home"), path: localePrefix || "/" }];

  if (filteredSegments.length === 0) return breadcrumbs;

  let currentPath = localePrefix;
  filteredSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;

    let label = segment;

    if (segment.startsWith("[") && segment.endsWith("]")) {
      const paramName = segment.slice(1, -1);
      if (paramName === "id" && "id" in route.params) {
        const paramValue = route.params.id;
        label = typeof paramValue === "string" ? paramValue : String(paramValue);
      }
      else if (paramName === "projectId" && "projectId" in route.params) {
        const paramValue = route.params.projectId;
        label = typeof paramValue === "string" ? paramValue : String(paramValue);
      }
      else if (paramName === "tag" && "tag" in route.params) {
        const paramValue = route.params.tag;
        label = typeof paramValue === "string" ? paramValue : String(paramValue);
      }
    }
    else {
      const i18nKey = `pages.${filteredSegments.slice(0, index + 1).join(".")}`;
      const translated = t(i18nKey);

      if (translated !== i18nKey) label = translated;
    }

    breadcrumbs.push({
      label,
      path: index === filteredSegments.length - 1 ? undefined : currentPath,
    });
  });

  return breadcrumbs;
});
</script>

<template>
  <nav
    aria-label="Breadcrumb"
    class="breadcrumbs"
  >
    <ol>
      <li
        v-for="(bc, index) in breadcrumbs"
        :key="bc.path || bc.label"
      >
        <NuxtLink
          v-if="bc.path"
          :to="bc.path"
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
