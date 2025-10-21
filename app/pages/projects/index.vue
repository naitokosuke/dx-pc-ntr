<script setup lang="ts">
import { useBreadcrumbs } from "~/components/Breadcrumbs.vue";

const { setBreadcrumbs } = useBreadcrumbs();

setBreadcrumbs([
  { to: { name: "index" }, label: "ダッシュボード" },
  { label: "プロジェクト一覧" },
]);
</script>

<template>
  <h2>プロジェクト一覧</h2>
</template>
