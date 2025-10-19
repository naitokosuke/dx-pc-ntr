<script setup lang="ts">
import { useBreadcrumbs } from "~/components/Breadcrumbs.vue";
import { useQuery } from "@pinia/colada";
import { formatDate, formatRelativeDate } from "~/utils/date";
import { dashboardKeys } from "~/queries/queryKeys";

const { t, locale } = useI18n();
const { setBreadcrumbs } = useBreadcrumbs();

setBreadcrumbs([{ label: t("pages.dashboard") }]);

const { state, asyncStatus } = useQuery({
  key: dashboardKeys.root,
  query: () => $fetch("/api/dashboard/summary"),
});

const getStatusLabel = (status: string) => t(`dashboard.status.${status}`);
const getPriorityLabel = (priority: string) => t(`dashboard.priority.${priority}`);
</script>

<template>
  <div class="dashboard">
    <div
      v-if="asyncStatus === 'loading'"
      class="status-message"
    >
      {{ $t("common.loading") }}
    </div>

    <div
      v-else-if="state.error"
      class="status-message error"
    >
      {{ $t("dashboard.error.message", { message: state.error.message }) }}
    </div>

    <div
      v-else-if="state.data"
      class="content"
    >
      <section class="stats">
        <h3>{{ $t("dashboard.summary.title") }}</h3>
        <div class="cards">
          <Card
            :label="$t('dashboard.summary.totalTodos')"
            :value="state.data.summary.totalTodos"
          />
          <Card
            :label="$t('dashboard.summary.totalProjects')"
            :value="state.data.summary.totalProjects"
          />
          <Card
            :label="$t('dashboard.summary.totalTags')"
            :value="state.data.summary.totalTags"
          />
        </div>
      </section>

      <section class="stats">
        <h3>{{ $t("dashboard.status.title") }}</h3>
        <div class="cards">
          <Card
            v-for="(count, status) in state.data.todosByStatus"
            :key="status"
            :label="getStatusLabel(status as string)"
            :value="count"
          />
        </div>
      </section>

      <section class="stats">
        <h3>{{ $t("dashboard.priority.title") }}</h3>
        <div class="cards">
          <Card
            v-for="(count, priority) in state.data.todosByPriority"
            :key="priority"
            :label="getPriorityLabel(priority as string)"
            :value="count"
          />
        </div>
      </section>

      <section class="todos">
        <h3>{{ $t("dashboard.recentTodos.title") }}</h3>
        <div
          v-if="state.data.recentTodos.length === 0"
          class="empty"
        >
          {{ $t("dashboard.recentTodos.empty") }}
        </div>
        <ul v-else>
          <li
            v-for="todo in state.data.recentTodos"
            :key="todo.id"
          >
            <NuxtLinkLocale :to="{ name: 'todos-id', params: { id: todo.id } }">
              <div>
                <strong>{{ todo.title }}</strong>
                <span>{{ getPriorityLabel(todo.priority) }}</span>
              </div>
              <div>
                <span>{{ getStatusLabel(todo.status) }}</span>
                <span>{{ formatDate(todo.createdAt, locale, { year: "numeric", month: "long", day: "numeric" }) }}</span>
              </div>
            </NuxtLinkLocale>
          </li>
        </ul>
      </section>

      <section class="todos">
        <h3>{{ $t("dashboard.upcomingTodos.title") }}</h3>
        <div
          v-if="state.data.upcomingTodos.length === 0"
          class="empty"
        >
          {{ $t("dashboard.upcomingTodos.empty") }}
        </div>
        <ul v-else>
          <li
            v-for="todo in state.data.upcomingTodos"
            :key="todo.id"
          >
            <NuxtLinkLocale :to="{ name: 'todos-id', params: { id: todo.id } }">
              <div>
                <strong>{{ todo.title }}</strong>
                <span>{{ getPriorityLabel(todo.priority) }}</span>
              </div>
              <div v-if="todo.dueDate">
                <span>{{ getStatusLabel(todo.status) }}</span>
                <span>{{ $t("dashboard.upcomingTodos.dueDate") }}: {{ formatRelativeDate(todo.dueDate, t) }}</span>
              </div>
            </NuxtLinkLocale>
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
