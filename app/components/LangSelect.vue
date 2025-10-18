<script setup lang="ts">
import type { GeneratedTypeConfig } from "@intlify/core-base";

const { locale, locales, setLocale } = useI18n();
const isOpen = ref(false);

const currentLocale = computed(() => {
  return locales.value.find(l => l.code === locale.value);
});

const switchLocale = async (code: GeneratedTypeConfig["locale"]) => {
  await setLocale(code);
  isOpen.value = false;
};

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const dropdown = useTemplateRef<HTMLElement>("dropdown");
onClickOutside(dropdown, () => {
  isOpen.value = false;
});
</script>

<template>
  <div
    ref="dropdown"
    class="lang-select"
  >
    <button
      class="current-lang"
      @click="toggleDropdown"
    >
      <Icon name="material-symbols:language" />
      {{ currentLocale?.name }}
      <Icon
        :name="isOpen ? 'material-symbols:arrow-drop-up' : 'material-symbols:arrow-drop-down'"
      />
    </button>
    <Transition name="dropdown">
      <ul
        v-if="isOpen"
        class="dropdown-menu"
      >
        <li
          v-for="loc in locales"
          :key="loc.code"
          :class="{ active: loc.code === locale }"
          @click="switchLocale(loc.code)"
        >
          {{ loc.name }}
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style scoped>
.lang-select {
  position: relative;
}

.current-lang {
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 0.375rem;
  background: var(--color-surface);
  color: var(--color-text);
  cursor: pointer;
  transition: background-color 0.2s;
}

.current-lang:hover {
  background-color: var(--color-surface-hover);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 0.25rem);
  right: 0;
  min-width: 150px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.5);
  list-style: none;
  padding: 0.25rem;
  margin: 0;
  z-index: 50;
}

.dropdown-menu li {
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 0.25rem;
  transition: background-color 0.2s;
  color: var(--color-text);
}

.dropdown-menu li:hover {
  background-color: var(--color-surface-hover);
}

.dropdown-menu li.active {
  background-color: var(--color-primary);
  color: var(--color-background);
  font-weight: 500;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-0.5rem);
}
</style>
