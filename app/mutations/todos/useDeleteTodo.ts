import { useMutation, useQueryCache } from "@pinia/colada";
import { todosKeys, dashboardKeys } from "~/queries/queryKeys";

export function useDeleteTodo() {
  const queryCache = useQueryCache();

  return useMutation({
    mutation: async (id: string) => {
      return await $fetch("/api/todos/:id", {
        method: "DELETE",
        params: { id },
      });
    },
    onSettled: () => {
      queryCache.invalidateQueries({ key: todosKeys.root });
      queryCache.invalidateQueries({ key: dashboardKeys.root });
    },
  });
}
