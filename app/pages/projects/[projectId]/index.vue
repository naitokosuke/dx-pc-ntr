<script setup lang="ts">
import { useBreadcrumbs } from "~/components/Breadcrumbs.vue";

const { t } = useI18n();
const route = useRoute("projects-projectId");
const { setBreadcrumbs } = useBreadcrumbs();

onMounted(() => {
  setBreadcrumbs([
    { to: { name: "index" }, label: t("pages.dashboard") },
    { to: { name: "projects" }, label: t("pages.projects.list") },
    { label: route.params.projectId },
  ]);
});
</script>

<template>
  <h2>{{ $t("pages.projects.todos") }}</h2>
</template>
