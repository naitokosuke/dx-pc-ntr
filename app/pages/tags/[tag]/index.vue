<script setup lang="ts">
import { useBreadcrumbs } from "~/components/Breadcrumbs.vue";

const route = useRoute("tags-tag");
const { setBreadcrumbs } = useBreadcrumbs();

onMounted(() => {
  setBreadcrumbs([
    { to: { name: "index" }, label: "ダッシュボード" },
    { to: { name: "tags" }, label: "タグ一覧" },
    { label: route.params.tag },
  ]);
});
</script>

<template>
  <h2>タグ別TODO一覧</h2>
</template>
