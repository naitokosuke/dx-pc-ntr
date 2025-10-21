<script setup lang="ts">
import { useBreadcrumbs } from "~/components/Breadcrumbs.vue";

const route = useRoute("todos-id");
const { setBreadcrumbs } = useBreadcrumbs();

onMounted(() => {
  setBreadcrumbs([
    { to: { name: "index" }, label: "ダッシュボード" },
    { to: { name: "todos" }, label: "TODO一覧" },
    { label: route.params.id },
  ]);
});
</script>

<template>
  <h2>TODO詳細</h2>
</template>
