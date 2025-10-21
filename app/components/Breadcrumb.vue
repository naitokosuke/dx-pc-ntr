<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";

const { to } = defineProps<{
  to?: RouteLocationRaw;
}>();
</script>

<template>
  <NuxtLinkLocale
    v-if="to"
    :to
  >
    <slot />
  </NuxtLinkLocale>
  <span
    v-else
    aria-current="page"
  >
    <slot />
  </span>
</template>
