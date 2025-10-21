<script setup lang="ts">
import { useBreadcrumbs } from "~/components/Breadcrumbs.vue";

const { setBreadcrumbs } = useBreadcrumbs();

onMounted(() => {
  setBreadcrumbs([
    { to: { name: "index" }, label: "ダッシュボード" },
    { label: "アーカイブ一覧" },
  ]);
});
</script>

<template>
  <h2>アーカイブ一覧</h2>
</template>
