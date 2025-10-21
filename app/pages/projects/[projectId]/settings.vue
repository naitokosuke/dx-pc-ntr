<script setup lang="ts">
import { useBreadcrumbs } from "~/components/Breadcrumbs.vue";

const route = useRoute("projects-projectId-settings");
const { setBreadcrumbs } = useBreadcrumbs();

onMounted(() => {
  setBreadcrumbs([
    { to: { name: "index" }, label: "ダッシュボード" },
    { to: { name: "projects" }, label: "プロジェクト一覧" },
    { to: { name: "projects-projectId", params: { projectId: route.params.projectId } }, label: route.params.projectId },
    { label: "プロジェクト設定" },
  ]);
});
</script>

<template>
  <h2>プロジェクト設定</h2>
</template>
