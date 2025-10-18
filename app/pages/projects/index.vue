<script setup lang="ts">
const { t } = useI18n();
const { setBreadcrumbs } = useBreadcrumbs();

setBreadcrumbs([
  { to: { name: "index" }, label: t("pages.dashboard") },
  { label: t("pages.projects.list") },
]);
</script>

<template>
  <h2>{{ $t("pages.projects.list") }}</h2>
</template>
