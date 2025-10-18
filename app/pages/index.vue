<script setup lang="ts">
const { setBreadcrumbs } = useBreadcrumbs();

onMounted(() => {
  setBreadcrumbs([
    { i18nKey: "pages.dashboard" },
  ]);
});
</script>

<template>
  <h2>{{ $t("pages.dashboard") }}</h2>
</template>
