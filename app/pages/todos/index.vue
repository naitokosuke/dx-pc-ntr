<script setup lang="ts">
import { useBreadcrumbs } from "~/components/Breadcrumbs.vue";
import { useQuery } from "@pinia/colada";
import type { TodoStatus, TodoPriority } from "#shared/schemas/todo.schema";
import { formatDate, formatRelativeDate } from "~/utils/date";
import { useCreateTodo, useDeleteTodo, useCompleteTodo } from "~/mutations/todos";
import { todosKeys } from "~/queries/queryKeys";

const route = useRoute("todos");
const router = useRouter();

const { setBreadcrumbs } = useBreadcrumbs();

setBreadcrumbs([
  { to: { name: "index" }, label: "ダッシュボード" },
  { label: "TODO一覧" },
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
  key: () => todosKeys.withFilters(queryParams.value),
  query: () => $fetch("/api/todos", { query: queryParams.value }),
});

const clearFilters = () => {
  searchQuery.value = "";
  statusFilter.value = "";
  priorityFilter.value = "";
};

const statusLabels: Record<TodoStatus, string> = {
  pending: "未着手",
  in_progress: "進行中",
  completed: "完了",
  archived: "アーカイブ",
};
const priorityLabels: Record<TodoPriority, string> = {
  low: "低",
  medium: "中",
  high: "高",
};
const getStatusLabel = (status: string) => statusLabels[status as TodoStatus];
const getPriorityLabel = (priority: string) => priorityLabels[priority as TodoPriority];

watch(queryParams, (newParams) => {
  router.push({ query: newParams });
});

const quickAddTitle = ref("");
const { mutate: createTodo, asyncStatus: createStatus } = useCreateTodo();
const { mutate: deleteTodo, asyncStatus: deleteStatus } = useDeleteTodo();
const { mutate: completeTodo, asyncStatus: completeStatus } = useCompleteTodo();

const handleQuickAdd = () => {
  if (!quickAddTitle.value.trim()) return;
  createTodo({ title: quickAddTitle.value.trim() });
  quickAddTitle.value = "";
};

const handleDelete = (id: string) => {
  deleteTodo(id);
};

const handleComplete = (id: string, currentStatus: TodoStatus) => {
  completeTodo({ id, currentStatus });
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
          placeholder="タイトルを入力して素早く追加"
          :disabled="createStatus === 'loading'"
        >
        <button
          type="submit"
          :disabled="createStatus === 'loading' || !quickAddTitle.trim()"
        >
          追加
        </button>
      </form>
      <NuxtLink
        :to="{ name: 'todos-new' }"
        class="create-button"
      >
        新規TODO作成
      </NuxtLink>
    </div>

    <section class="filters">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="検索"
        class="search-input"
      >

      <select
        v-model="statusFilter"
        class="filter-select"
      >
        <option value="">
          すべて (ステータス)
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
          すべて (優先度)
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
        フィルタをクリア
      </button>
    </section>

    <div
      v-if="asyncStatus === 'loading'"
      class="status-message"
    >
      読み込み中...
    </div>

    <div
      v-else-if="todos.error"
      class="status-message error"
    >
      エラー: {{ todos.error.message }}
    </div>

    <div
      v-else-if="!todos.data || todos.data.length === 0"
      class="status-message"
    >
      TODOが見つかりません
    </div>

    <ul
      v-else
      class="todo-list"
    >
      <li
        v-for="todo in todos.data"
        :key="todo.id"
        :class="{ completed: todo.status === 'completed' }"
      >
        <div class="todo-actions">
          <input
            type="checkbox"
            :checked="todo.status === 'completed'"
            :disabled="completeStatus === 'loading'"
            @change="handleComplete(todo.id, todo.status)"
          >
          <button
            class="delete-button"
            :disabled="deleteStatus === 'loading'"
            @click="handleDelete(todo.id)"
          >
            削除
          </button>
        </div>
        <NuxtLink
          :to="{ name: 'todos-id', params: { id: todo.id } }"
          class="todo-content"
        >
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
            <span>{{ formatDate(todo.createdAt) }}</span>
            <span v-if="todo.dueDate">期限: {{ formatRelativeDate(todo.dueDate) }}</span>
            <span v-if="todo.tags.length > 0">{{ todo.tags.join(", ") }}</span>
          </div>
        </NuxtLink>
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
      transition: background-color 0.2s, border-color 0.2s, opacity 0.2s;
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 1rem;

      &:hover {
        background: var(--color-surface-hover);
        border-color: var(--color-border-light);
      }

      &.completed {
        opacity: 0.6;

        .todo-content strong {
          text-decoration: line-through;
        }
      }

      .todo-actions {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 1.25rem;
        align-items: center;

        input[type="checkbox"] {
          width: 1.25rem;
          height: 1.25rem;
          cursor: pointer;

          &:disabled {
            cursor: not-allowed;
            opacity: 0.5;
          }
        }

        .delete-button {
          padding: 0.25rem 0.5rem;
          background: var(--color-error);
          color: white;
          border: none;
          border-radius: 0.25rem;
          font-size: 0.75rem;
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

      .todo-content {
        display: grid;
        gap: 0.75rem;
        padding: 1.25rem 1.25rem 1.25rem 0;
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
