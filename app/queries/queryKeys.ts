export const dashboardKeys = {
  root: ["dashboard"] as const,
};

export const todosKeys = {
  root: ["todos"] as const,
  withFilters: (filters: Record<string, string> = {}) => [...todosKeys.root, filters] as const,
  byId: (id: string) => [...todosKeys.root, id] as const,
};
