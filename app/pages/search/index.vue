<script setup lang="ts">
import { useBreadcrumbs } from "~/components/Breadcrumbs.vue";

const { t } = useI18n();
const { setBreadcrumbs } = useBreadcrumbs();

onMounted(() => {
  setBreadcrumbs([
    { to: { name: "index" }, label: t("pages.dashboard") },
    { label: t("pages.search") },
  ]);
});
</script>

<template>
  <h2>{{ $t("pages.search") }}</h2>
</template>
