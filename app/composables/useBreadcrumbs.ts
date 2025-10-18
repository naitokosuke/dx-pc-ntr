import type { NuxtRoute, RoutesNamesList } from "@typed-router";

export interface BreadcrumbItem {
  to?: NuxtRoute<RoutesNamesList, string>;
  i18nKey: string;
}

const breadcrumbs = ref<BreadcrumbItem[]>([]);

export const useBreadcrumbs = () => {
  const setBreadcrumbs = (_breadcrumbs: BreadcrumbItem[]) => {
    breadcrumbs.value = _breadcrumbs;
  };

  return {
    breadcrumbs: readonly(breadcrumbs),
    setBreadcrumbs,
  };
};
