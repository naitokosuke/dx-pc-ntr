<script setup lang="ts">
import { useBreadcrumbs } from "~/components/Breadcrumbs.vue";
import { useQuery } from "@pinia/colada";

const { t, locale } = useI18n();
const { setBreadcrumbs } = useBreadcrumbs();

setBreadcrumbs([{ label: t("pages.dashboard") }]);

const { data, isLoading, error } = useQuery({
  key: ["dashboard", "summary"],
  query: async () => {
    const response = await $fetch("/api/dashboard/summary");
    return response;
  },
});

const getStatusLabel = (status: string) => {
  return t(`dashboard.status.${status}`);
};

const getPriorityLabel = (priority: string) => {
  return t(`dashboard.priority.${priority}`);
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const localeCode = locale.value === "ja" ? "ja-JP" : "en-US";
  return date.toLocaleDateString(localeCode, { year: "numeric", month: "long", day: "numeric" });
};

const formatRelativeDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return t("dashboard.date.daysAgo", { days: Math.abs(diffDays) });
  if (diffDays === 0) return t("dashboard.date.today");
  if (diffDays === 1) return t("dashboard.date.tomorrow");
  return t("dashboard.date.daysLater", { days: diffDays });
};
</script>

<template>
  <div class="dashboard">
    <div
      v-if="isLoading"
      class="status-message"
    >
      {{ $t("common.loading") }}
    </div>

    <div
      v-else-if="error"
      class="status-message error"
    >
      {{ $t("dashboard.error.message", { message: error.message }) }}
    </div>

    <div
      v-else-if="data"
      class="content"
    >
      <!-- サマリー統計 -->
      <section class="stats">
        <h3>{{ $t("dashboard.summary.title") }}</h3>
        <div class="cards">
          <Card
            :label="$t('dashboard.summary.totalTodos')"
            :value="data.summary.totalTodos"
          />
          <Card
            :label="$t('dashboard.summary.totalProjects')"
            :value="data.summary.totalProjects"
          />
          <Card
            :label="$t('dashboard.summary.totalTags')"
            :value="data.summary.totalTags"
          />
        </div>
      </section>

      <!-- ステータス統計 -->
      <section class="stats">
        <h3>{{ $t("dashboard.status.title") }}</h3>
        <div class="cards">
          <Card
            v-for="(count, status) in data.todosByStatus"
            :key="status"
            :label="getStatusLabel(status as string)"
            :value="count"
          />
        </div>
      </section>

      <!-- 優先度統計 -->
      <section class="stats">
        <h3>{{ $t("dashboard.priority.title") }}</h3>
        <div class="cards">
          <Card
            v-for="(count, priority) in data.todosByPriority"
            :key="priority"
            :label="getPriorityLabel(priority as string)"
            :value="count"
          />
        </div>
      </section>

      <!-- 最近のTODO -->
      <section class="todos">
        <h3>{{ $t("dashboard.recentTodos.title") }}</h3>
        <div
          v-if="data.recentTodos.length === 0"
          class="empty"
        >
          {{ $t("dashboard.recentTodos.empty") }}
        </div>
        <ul v-else>
          <li
            v-for="todo in data.recentTodos"
            :key="todo.id"
          >
            <NuxtLink :to="{ name: 'todos-id', params: { id: todo.id } }">
              <div>
                <strong>{{ todo.title }}</strong>
                <span>{{ getPriorityLabel(todo.priority) }}</span>
              </div>
              <div>
                <span>{{ getStatusLabel(todo.status) }}</span>
                <span>{{ formatDate(todo.createdAt) }}</span>
              </div>
            </NuxtLink>
          </li>
        </ul>
      </section>

      <!-- 期限の近いTODO -->
      <section class="todos">
        <h3>{{ $t("dashboard.upcomingTodos.title") }}</h3>
        <div
          v-if="data.upcomingTodos.length === 0"
          class="empty"
        >
          {{ $t("dashboard.upcomingTodos.empty") }}
        </div>
        <ul v-else>
          <li
            v-for="todo in data.upcomingTodos"
            :key="todo.id"
          >
            <NuxtLink :to="{ name: 'todos-id', params: { id: todo.id } }">
              <div>
                <strong>{{ todo.title }}</strong>
                <span>{{ getPriorityLabel(todo.priority) }}</span>
              </div>
              <div v-if="todo.dueDate">
                <span>{{ getStatusLabel(todo.status) }}</span>
                <span>{{ $t("dashboard.upcomingTodos.dueDate") }}: {{ formatRelativeDate(todo.dueDate) }}</span>
              </div>
            </NuxtLink>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  h2 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 2rem;
  }

  .status-message {
    text-align: center;
    padding: 2rem;
    font-size: 1.125rem;

    &.error {
      color: var(--color-error);
    }
  }

  .content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
    }
  }

  .stats {
    h3 {
      font-size: 1.125rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    .cards {
      display: grid;
      gap: 0.75rem;
    }
  }

  .todos {
    h3 {
      font-size: 1.125rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    .empty {
      text-align: center;
      padding: 2rem;
      color: var(--color-text-muted);
      background: var(--color-surface);
      border-radius: 0.5rem;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: grid;
      gap: 0.5rem;

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
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          text-decoration: none;
          color: inherit;

          > div {
            display: grid;
            grid-auto-flow: column;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
            font-size: 0.875rem;

            &:first-child {
              strong {
                font-size: 1rem;
              }

              span {
                font-size: 0.875rem;
                font-weight: 600;
              }
            }

            &:last-child {
              color: var(--color-text-secondary);

              span {
                padding: 0.25rem 0.5rem;
                background: var(--color-surface-hover);
                border-radius: 0.25rem;
                font-size: 0.75rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>
