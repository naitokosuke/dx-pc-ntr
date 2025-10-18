<script setup lang="ts" generic="T extends RoutesNamesList, P extends string">
import type { NuxtRoute, RoutesNamesList } from "@typed-router";

const { to } = defineProps<{
  to?: NuxtRoute<T, P>;
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
