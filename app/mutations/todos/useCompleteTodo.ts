import { useMutation, useQueryCache } from "@pinia/colada";
import { todosKeys, dashboardKeys } from "~/queries/queryKeys";
import type { TodoStatus } from "#shared/schemas/todo.schema";
import type { InternalApi } from "nitropack/types";

export function useCompleteTodo() {
  const queryCache = useQueryCache();

  return useMutation({
    mutation: async ({ id, currentStatus }: { id: string; currentStatus: TodoStatus }) => {
      const status: TodoStatus = currentStatus === "completed" ? "pending" : "completed";

      // FIXME: Remove type args
      return await $fetch<InternalApi["/api/todos/:id"]["put"]>(`/api/todos/${id}`, {
        method: "PUT",
        body: {
          status,
          completedAt: status === "completed" ? new Date().toISOString() : undefined,
        },
      });
    },
    onSettled: () => {
      queryCache.invalidateQueries({ key: todosKeys.root });
      queryCache.invalidateQueries({ key: dashboardKeys.root });
    },
  });
}
