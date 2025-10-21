<script setup lang="ts">
import { useBreadcrumbs } from "~/components/Breadcrumbs.vue";

const { setBreadcrumbs } = useBreadcrumbs();

onMounted(() => {
  setBreadcrumbs([
    { to: { name: "index" }, label: "ダッシュボード" },
    { to: { name: "projects" }, label: "プロジェクト一覧" },
    { label: "プロジェクト作成" },
  ]);
});
</script>

<template>
  <h2>プロジェクト作成</h2>
</template>
