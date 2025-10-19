<script setup lang="ts">
import { useBreadcrumbs } from "~/components/Breadcrumbs.vue";

const { t } = useI18n();
const route = useRoute("projects-projectId-settings");
const { setBreadcrumbs } = useBreadcrumbs();

onMounted(() => {
  setBreadcrumbs([
    { to: { name: "index" }, label: t("pages.dashboard") },
    { to: { name: "projects" }, label: t("pages.projects.list") },
    { to: { name: "projects-projectId", params: { projectId: route.params.projectId } }, label: route.params.projectId },
    { label: t("pages.projects.settings") },
  ]);
});
</script>

<template>
  <h2>{{ $t("pages.projects.settings") }}</h2>
</template>
