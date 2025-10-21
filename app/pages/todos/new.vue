<script setup lang="ts">
import { useBreadcrumbs } from "~/components/Breadcrumbs.vue";
import type { TodoPriority } from "#shared/schemas/todo.schema";
import { useCreateTodo } from "~/mutations/todos";

interface FormData {
  title: string;
  description: string;
  priority: TodoPriority;
  dueDate: string;
  tags: string[];
}

const { setBreadcrumbs } = useBreadcrumbs();
const router = useRouter();

setBreadcrumbs([
  { to: { name: "index" }, label: "ダッシュボード" },
  { to: { name: "todos" }, label: "TODO一覧" },
  { label: "TODO作成" },
]);

const form = ref<FormData>({
  title: "",
  description: "",
  priority: "medium",
  dueDate: "",
  tags: [],
});

const { mutate, asyncStatus } = useCreateTodo();

const handleSubmit = () => {
  mutate(form.value);
  router.push({ name: "todos" });
};

const tagInput = ref("");
const addTag = () => {
  if (tagInput.value.trim() && !form.value.tags.includes(tagInput.value.trim())) {
    form.value.tags.push(tagInput.value.trim());
    tagInput.value = "";
  }
};
const removeTag = (tag: string) => {
  form.value.tags = form.value.tags.filter(t => t !== tag);
};

const priorityLabels: Record<TodoPriority, string> = {
  low: "低",
  medium: "中",
  high: "高",
};
const getPriorityLabel = (priority: string) => priorityLabels[priority as TodoPriority];
</script>

<template>
  <div class="new-todo-page">
    <h1>TODO作成</h1>

    <form
      class="todo-form"
      @submit.prevent="handleSubmit"
    >
      <div class="form-group">
        <label for="title">タイトル</label>
        <input
          id="title"
          v-model="form.title"
          type="text"
          required
        >
      </div>

      <div class="form-group">
        <label for="description">説明</label>
        <textarea
          id="description"
          v-model="form.description"
          rows="4"
        />
      </div>

      <div class="form-group">
        <label for="priority">優先度</label>
        <select
          id="priority"
          v-model="form.priority"
        >
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
      </div>

      <div class="form-group">
        <label for="dueDate">期限</label>
        <input
          id="dueDate"
          v-model="form.dueDate"
          type="date"
        >
      </div>

      <div class="form-group">
        <label for="tags">タグ</label>
        <div class="tag-input-container">
          <input
            id="tags"
            v-model="tagInput"
            type="text"
            @keyup.enter="addTag"
          >
          <button
            type="button"
            @click="addTag"
          >
            追加
          </button>
        </div>
        <div
          v-if="form.tags.length > 0"
          class="tags-list"
        >
          <span
            v-for="tag in form.tags"
            :key="tag"
            class="tag"
          >
            {{ tag }}
            <button
              type="button"
              @click="removeTag(tag)"
            >
              ×
            </button>
          </span>
        </div>
      </div>

      <div class="form-actions">
        <button
          type="submit"
          :disabled="asyncStatus === 'loading' || !form.title"
          class="submit-button"
        >
          {{ asyncStatus === "loading" ? "作成中..." : "作成" }}
        </button>
        <NuxtLink
          :to="{ name: 'todos' }"
          class="cancel-button"
        >
          キャンセル
        </NuxtLink>
      </div>
    </form>
  </div>
</template>

<style scoped>
.new-todo-page {
  h1 {
    margin-bottom: 2rem;
  }
}

.todo-form {
  max-width: 600px;

  .form-group {
    margin-bottom: 1.5rem;

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }

    input[type="text"],
    input[type="date"],
    textarea,
    select {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid var(--color-border);
      border-radius: 4px;
      font-size: 1rem;

      &:focus {
        outline: none;
        border-color: var(--color-primary);
      }
    }

    textarea {
      resize: vertical;
    }
  }

  .tag-input-container {
    display: flex;
    gap: 0.5rem;

    input {
      flex: 1;
    }

    button {
      padding: 0.5rem 1rem;
      background: var(--color-primary);
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        opacity: 0.9;
      }
    }
  }

  .tags-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;

    .tag {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.25rem 0.5rem;
      background: var(--color-bg-secondary);
      border-radius: 4px;
      font-size: 0.875rem;

      button {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 1.25rem;
        line-height: 1;
        padding: 0;
        color: var(--color-text-muted);

        &:hover {
          color: var(--color-error);
        }
      }
    }
  }

  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;

    .submit-button {
      padding: 0.75rem 1.5rem;
      background: var(--color-primary);
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      &:not(:disabled):hover {
        opacity: 0.9;
      }
    }

    .cancel-button {
      padding: 0.75rem 1.5rem;
      background: var(--color-bg-secondary);
      color: var(--color-text);
      border-radius: 4px;
      text-decoration: none;
      display: inline-block;

      &:hover {
        opacity: 0.9;
      }
    }
  }
}
</style>
