<script setup lang="ts">
import { useBreadcrumbs } from "~/components/Breadcrumbs.vue";

const { t } = useI18n();
const route = useRoute("todos-id-edit");
const { setBreadcrumbs } = useBreadcrumbs();

onMounted(() => {
  setBreadcrumbs([
    { to: { name: "index" }, label: t("pages.dashboard") },
    { to: { name: "todos" }, label: t("pages.todos.list") },
    { to: { name: "todos-id", params: { id: route.params.id } }, label: route.params.id },
    { label: t("pages.todos.edit") },
  ]);
});
</script>

<template>
  <h2>{{ $t("pages.todos.edit") }}</h2>
</template>
