import { useMutation, useQueryCache } from "@pinia/colada";
import { todosKeys, dashboardKeys } from "~/queries/queryKeys";
import type { InternalApi } from "nitropack/types";

export function useDeleteTodo() {
  const queryCache = useQueryCache();

  return useMutation({

    // FIXME: Remove type args
    mutation: async (id: string) => {
      return await $fetch<InternalApi["/api/todos/:id"]["delete"]>(`/api/todos/${id}`, {
        method: "DELETE",
      });
    },
    onSettled: () => {
      queryCache.invalidateQueries({ key: todosKeys.root });
      queryCache.invalidateQueries({ key: dashboardKeys.root });
    },
  });
}
