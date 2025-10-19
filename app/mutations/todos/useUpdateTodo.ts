import { useMutation, useQueryCache } from "@pinia/colada";
import type { TodoPriority, TodoStatus } from "#shared/schemas/todo.schema";
import { todosKeys, dashboardKeys } from "~/queries/queryKeys";
import type { InternalApi } from "nitropack/types";

export interface UpdateTodoData {
  title?: string;
  description?: string;
  status?: TodoStatus;
  priority?: TodoPriority;
  dueDate?: string;
  tags?: string[];
}

export function useUpdateTodo() {
  const queryCache = useQueryCache();

  return useMutation({
    mutation: async ({ id, data }: { id: string; data: UpdateTodoData }) => {
      const payload = {
        ...data,
        dueDate: data.dueDate ? new Date(data.dueDate).toISOString() : undefined,
      };

      // FIXME: Remove type args
      return await $fetch<InternalApi["/api/todos/:id"]["put"]>(`/api/todos/${id}`, {
        method: "PUT",
        body: payload,
      });
    },
    onSettled: () => {
      queryCache.invalidateQueries({ key: todosKeys.root });
      queryCache.invalidateQueries({ key: dashboardKeys.root });
    },
  });
}
