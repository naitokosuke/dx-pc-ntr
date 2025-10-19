<script setup lang="ts">
import { useBreadcrumbs } from "~/components/Breadcrumbs.vue";

const { t } = useI18n();
const { setBreadcrumbs } = useBreadcrumbs();

onMounted(() => {
  setBreadcrumbs([
    { to: { name: "index" }, label: t("pages.dashboard") },
    { to: { name: "todos" }, label: t("pages.todos.list") },
    { label: t("pages.todos.new") },
  ]);
});
</script>

<template>
  <h2>{{ $t("pages.todos.new") }}</h2>
</template>
