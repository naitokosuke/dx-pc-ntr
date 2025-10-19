<script setup lang="ts">
const { label, value } = defineProps<{
  label: string;
  value: string | number;
}>();
</script>

<template>
  <div class="card">
    <span>{{ label }}</span>
    <strong>{{ value }}</strong>
  </div>
</template>

<style scoped>
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  padding: 1rem;
  display: grid;
  gap: 0.5rem;
  transition: background-color 0.2s;

  &:hover {
    background: var(--color-surface-hover);
  }

  span {
    font-size: 0.875rem;
    color: var(--color-text-muted);
  }

  strong {
    font-size: 1.5rem;
    color: var(--color-text);
  }
}
</style>
