<script setup lang="ts">
import { useBreadcrumbs } from "~/components/Breadcrumbs.vue";
import { useQuery } from "@pinia/colada";
import type { TodoStatus, TodoPriority } from "#shared/schemas/todo.schema";
import { formatDate, formatRelativeDate } from "~/utils/date";
import { useCreateTodoMutation } from "~/mutations/useTodoMutation";

const route = useRoute("todos");
const router = useRouter();

const { t, locale } = useI18n();
const { setBreadcrumbs } = useBreadcrumbs();

setBreadcrumbs([
  { to: { name: "index" }, label: t("pages.dashboard") },
  { label: t("pages.todos.list") },
]);

const isValidStatus = (value: unknown): value is TodoStatus => {
  return typeof value === "string" && ["pending", "in_progress", "completed", "archived"].includes(value);
};
const isValidPriority = (value: unknown): value is TodoPriority => {
  return typeof value === "string" && ["low", "medium", "high"].includes(value);
};

const searchQuery = ref(typeof route.query.search === "string" ? route.query.search : "");
const statusFilter = ref<TodoStatus | "">(isValidStatus(route.query.status) ? route.query.status : "");
const priorityFilter = ref<TodoPriority | "">(isValidPriority(route.query.priority) ? route.query.priority : "");

const queryParams = computed(() => {
  const params: Record<string, string> = {};
  if (searchQuery.value) params.search = searchQuery.value;
  if (statusFilter.value) params.status = statusFilter.value;
  if (priorityFilter.value) params.priority = priorityFilter.value;
  return params;
});

const { state: todos, asyncStatus } = useQuery({
  key: () => ["todos", queryParams.value],
  query: () => $fetch("/api/todos", { query: queryParams.value }),
});

const clearFilters = () => {
  searchQuery.value = "";
  statusFilter.value = "";
  priorityFilter.value = "";
};

const getStatusLabel = (status: string) => t(`dashboard.status.${status}`);
const getPriorityLabel = (priority: string) => t(`dashboard.priority.${priority}`);

watch(queryParams, (newParams) => {
  router.push({ query: newParams });
});

const quickAddTitle = ref("");
const { mutate: createTodo, asyncStatus: createStatus } = useCreateTodoMutation();

const handleQuickAdd = () => {
  if (!quickAddTitle.value.trim()) return;
  createTodo({ title: quickAddTitle.value.trim() });
  quickAddTitle.value = "";
};
</script>

<template>
  <div class="todos-page">
    <div class="header">
      <form
        class="quick-add-form"
        @submit.prevent="handleQuickAdd"
      >
        <input
          v-model="quickAddTitle"
          type="text"
          :placeholder="$t('todos.quickAdd.placeholder')"
          :disabled="createStatus === 'loading'"
        >
        <button
          type="submit"
          :disabled="createStatus === 'loading' || !quickAddTitle.trim()"
        >
          {{ $t("todos.quickAdd.add") }}
        </button>
      </form>
      <NuxtLinkLocale
        :to="{ name: 'todos-new' }"
        class="create-button"
      >
        {{ $t("todos.createNew") }}
      </NuxtLinkLocale>
    </div>

    <section class="filters">
      <input
        v-model="searchQuery"
        type="text"
        :placeholder="$t('todos.filters.search')"
        class="search-input"
      >

      <select
        v-model="statusFilter"
        class="filter-select"
      >
        <option value="">
          {{ $t("todos.filters.all") }} ({{ $t("todos.filters.status") }})
        </option>
        <option value="pending">
          {{ getStatusLabel("pending") }}
        </option>
        <option value="in_progress">
          {{ getStatusLabel("in_progress") }}
        </option>
        <option value="completed">
          {{ getStatusLabel("completed") }}
        </option>
      </select>

      <select
        v-model="priorityFilter"
        class="filter-select"
      >
        <option value="">
          {{ $t("todos.filters.all") }} ({{ $t("todos.filters.priority") }})
        </option>
        <option value="low">
          {{ getPriorityLabel("low") }}
        </option>
        <option value="medium">
          {{ getPriorityLabel("medium") }}
        </option>
        <option value="high">
          {{ getPriorityLabel("high") }}
        </option>
      </select>

      <button
        v-if="searchQuery || statusFilter || priorityFilter"
        class="clear-button"
        @click="clearFilters"
      >
        {{ $t("todos.filters.clear") }}
      </button>
    </section>

    <div
      v-if="asyncStatus === 'loading'"
      class="status-message"
    >
      {{ $t("common.loading") }}
    </div>

    <div
      v-else-if="todos.error"
      class="status-message error"
    >
      {{ $t("dashboard.error.message", { message: todos.error.message }) }}
    </div>

    <div
      v-else-if="!todos.data || todos.data.length === 0"
      class="status-message"
    >
      {{ $t("todos.empty") }}
    </div>

    <ul
      v-else
      class="todo-list"
    >
      <li
        v-for="todo in todos.data"
        :key="todo.id"
      >
        <NuxtLinkLocale :to="{ name: 'todos-id', params: { id: todo.id } }">
          <div class="todo-main">
            <strong>{{ todo.title }}</strong>
            <div class="todo-badges">
              <span class="badge status">{{ getStatusLabel(todo.status) }}</span>
              <span class="badge priority">{{ getPriorityLabel(todo.priority) }}</span>
            </div>
          </div>
          <div
            v-if="todo.description"
            class="todo-description"
          >
            {{ todo.description }}
          </div>
          <div class="todo-meta">
            <span>{{ formatDate(todo.createdAt, locale) }}</span>
            <span v-if="todo.dueDate">{{ $t("dashboard.upcomingTodos.dueDate") }}: {{ formatRelativeDate(todo.dueDate, t) }}</span>
            <span v-if="todo.tags.length > 0">{{ todo.tags.join(", ") }}</span>
          </div>
        </NuxtLinkLocale>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.todos-page {
  .header {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;

    .quick-add-form {
      display: flex;
      gap: 0.5rem;

      input {
        flex: 1;
        padding: 0.5rem 1rem;
        border: 1px solid var(--color-border);
        border-radius: 0.5rem;
        font-size: 1rem;

        &:focus {
          outline: none;
          border-color: var(--color-primary);
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }

      button {
        padding: 0.5rem 1rem;
        background: var(--color-primary);
        color: white;
        border: none;
        border-radius: 0.5rem;
        font-weight: 600;
        cursor: pointer;
        transition: opacity 0.2s;

        &:hover:not(:disabled) {
          opacity: 0.9;
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }
    }

    .create-button {
      padding: 0.75rem 1.5rem;
      background: var(--color-primary);
      color: var(--color-background);
      text-decoration: none;
      border-radius: 0.5rem;
      font-weight: 600;
      transition: opacity 0.2s;

      &:hover {
        opacity: 0.9;
      }
    }
  }

  .filters {
    display: grid;
    grid-template-columns: 1fr auto auto auto;
    gap: 1rem;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    .search-input,
    .filter-select {
      padding: 0.75rem;
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: 0.5rem;
      color: var(--color-text);
      font-size: 0.875rem;

      &:focus {
        outline: none;
        border-color: var(--color-primary);
      }
    }

    .clear-button {
      padding: 0.75rem 1.5rem;
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: 0.5rem;
      color: var(--color-text);
      cursor: pointer;
      font-size: 0.875rem;
      transition: background-color 0.2s;

      &:hover {
        background: var(--color-surface-hover);
      }
    }
  }

  .status-message {
    text-align: center;
    padding: 2rem;
    font-size: 1.125rem;

    &.error {
      color: var(--color-error);
    }
  }

  .todo-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 1rem;

    li {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: 0.5rem;
      transition: background-color 0.2s, border-color 0.2s;

      &:hover {
        background: var(--color-surface-hover);
        border-color: var(--color-border-light);
      }

      a {
        display: grid;
        gap: 0.75rem;
        padding: 1.25rem;
        text-decoration: none;
        color: inherit;

        .todo-main {
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: center;
          gap: 1rem;

          strong {
            font-size: 1.125rem;
          }

          .todo-badges {
            display: grid;
            grid-auto-flow: column;
            gap: 0.5rem;

            .badge {
              padding: 0.25rem 0.75rem;
              background: var(--color-surface-hover);
              border-radius: 0.25rem;
              font-size: 0.75rem;
              font-weight: 600;
            }
          }
        }

        .todo-description {
          color: var(--color-text-secondary);
          font-size: 0.875rem;
          line-height: 1.5;
        }

        .todo-meta {
          display: grid;
          grid-auto-flow: column;
          justify-content: start;
          gap: 1.5rem;
          font-size: 0.75rem;
          color: var(--color-text-muted);
        }
      }
    }
  }
}
</style>
