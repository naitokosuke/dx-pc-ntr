import { useMutation, useQueryCache } from "@pinia/colada";
import type { TodoPriority } from "#shared/schemas/todo.schema";
import { todosKeys, dashboardKeys } from "~/queries/queryKeys";

export interface CreateTodoData {
  title: string;
  description?: string;
  priority?: TodoPriority;
  dueDate?: string;
  tags?: string[];
}

export function useCreateTodoMutation() {
  const queryCache = useQueryCache();

  return useMutation({
    mutation: async (data: CreateTodoData) => {
      const payload = {
        ...data,
        dueDate: data.dueDate ? new Date(data.dueDate).toISOString() : undefined,
      };
      return await $fetch("/api/todos", {
        method: "POST",
        body: payload,
      });
    },
    onSettled: () => {
      queryCache.invalidateQueries({ key: todosKeys.root });
      queryCache.invalidateQueries({ key: dashboardKeys.root });
    },
  });
}
