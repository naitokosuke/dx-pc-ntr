<script setup lang="ts">
import { useBreadcrumbs } from "~/components/Breadcrumbs.vue";

const { t } = useI18n();
const route = useRoute("tags-tag");
const { setBreadcrumbs } = useBreadcrumbs();

onMounted(() => {
  setBreadcrumbs([
    { to: { name: "index" }, label: t("pages.dashboard") },
    { to: { name: "tags" }, label: t("pages.tags.list") },
    { label: route.params.tag },
  ]);
});
</script>

<template>
  <h2>{{ $t("pages.tags.todos") }}</h2>
</template>
