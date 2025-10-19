<script setup lang="ts">
import { useBreadcrumbs } from "~/components/Breadcrumbs.vue";

const { t } = useI18n();
const { setBreadcrumbs } = useBreadcrumbs();

onMounted(() => {
  setBreadcrumbs([
    { to: { name: "index" }, label: t("pages.dashboard") },
    { label: t("pages.archived") },
  ]);
});
</script>

<template>
  <h2>{{ $t("pages.archived") }}</h2>
</template>
