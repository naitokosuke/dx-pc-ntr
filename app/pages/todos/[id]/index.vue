<script setup lang="ts">
import { useBreadcrumbs } from "~/components/Breadcrumbs.vue";

const { t } = useI18n();
const route = useRoute("todos-id");
const { setBreadcrumbs } = useBreadcrumbs();

onMounted(() => {
  setBreadcrumbs([
    { to: { name: "index" }, label: t("pages.dashboard") },
    { to: { name: "todos" }, label: t("pages.todos.list") },
    { label: route.params.id },
  ]);
});
</script>

<template>
  <h2>{{ $t("pages.todos.detail") }}</h2>
</template>
