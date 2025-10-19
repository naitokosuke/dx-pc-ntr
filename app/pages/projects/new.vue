<script setup lang="ts">
import { useBreadcrumbs } from "~/components/Breadcrumbs.vue";

const { t } = useI18n();
const { setBreadcrumbs } = useBreadcrumbs();

onMounted(() => {
  setBreadcrumbs([
    { to: { name: "index" }, label: t("pages.dashboard") },
    { to: { name: "projects" }, label: t("pages.projects.list") },
    { label: t("pages.projects.new") },
  ]);
});
</script>

<template>
  <h2>{{ $t("pages.projects.new") }}</h2>
</template>
