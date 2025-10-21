<script setup lang="ts">
import { useBreadcrumbs } from "~/components/Breadcrumbs.vue";

const route = useRoute("todos-id-edit");
const { setBreadcrumbs } = useBreadcrumbs();

onMounted(() => {
  setBreadcrumbs([
    { to: { name: "index" }, label: "ダッシュボード" },
    { to: { name: "todos" }, label: "TODO一覧" },
    { to: { name: "todos-id", params: { id: route.params.id } }, label: route.params.id },
    { label: "TODO編集" },
  ]);
});
</script>

<template>
  <h2>TODO編集</h2>
</template>
