<script setup lang="ts">
import { useBreadcrumbs } from "~/components/Breadcrumbs.vue";

const { t } = useI18n();
const { setBreadcrumbs } = useBreadcrumbs();

setBreadcrumbs([{ label: t("pages.dashboard") }]);
</script>

<template>
  <h2>{{ $t("pages.dashboard") }}</h2>
</template>
