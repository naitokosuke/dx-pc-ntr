import { useMutation, useQueryCache } from "@pinia/colada";
import type { TodoPriority, TodoStatus } from "#shared/schemas/todo.schema";
import { todosKeys, dashboardKeys } from "~/queries/queryKeys";

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
      return await $fetch("/api/todos/:id", {
        method: "PUT",
        params: { id },
        body: payload,
      });
    },
    onSettled: (_data, _error, variables) => {
      queryCache.invalidateQueries({ key: todosKeys.root });
      queryCache.invalidateQueries({ key: todosKeys.byId(variables.id) });
      queryCache.invalidateQueries({ key: dashboardKeys.root });
    },
  });
}
