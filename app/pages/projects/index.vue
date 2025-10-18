<script setup lang="ts">
const { setBreadcrumbs } = useBreadcrumbs();

onMounted(() => {
  setBreadcrumbs([
    { to: { name: "index" }, i18nKey: "pages.dashboard" },
    { i18nKey: "pages.projects.list" },
  ]);
});
</script>

<template>
  <h2>{{ $t("pages.projects.list") }}</h2>
</template>
