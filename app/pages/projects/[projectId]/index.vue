<script setup lang="ts">
import { useBreadcrumbs } from "~/components/Breadcrumbs.vue";

const route = useRoute("projects-projectId");
const { setBreadcrumbs } = useBreadcrumbs();

onMounted(() => {
  setBreadcrumbs([
    { to: { name: "index" }, label: "ダッシュボード" },
    { to: { name: "projects" }, label: "プロジェクト一覧" },
    { label: route.params.projectId },
  ]);
});
</script>

<template>
  <h2>プロジェクト配下のTODO一覧</h2>
</template>
