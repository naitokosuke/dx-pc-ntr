import { todoRepository } from "../../db/repositories/todo.repository";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  let todos = await todoRepository.findAll();

  // Filter by status
  if (query.status && typeof query.status === "string") {
    todos = todos.filter(todo => todo.status === query.status);
  }

  // Filter by priority
  if (query.priority && typeof query.priority === "string") {
    todos = todos.filter(todo => todo.priority === query.priority);
  }

  // Filter by projectId
  if (query.projectId && typeof query.projectId === "string") {
    todos = todos.filter(todo => todo.projectId === query.projectId);
  }

  // Filter by tag
  if (query.tag && typeof query.tag === "string") {
    todos = todos.filter(todo => todo.tags.includes(query.tag as string));
  }

  // Search by title/description
  if (query.search && typeof query.search === "string") {
    const searchTerm = query.search.toLowerCase();
    todos = todos.filter(
      todo =>
        todo.title.toLowerCase().includes(searchTerm)
        || todo.description?.toLowerCase().includes(searchTerm),
    );
  }

  // Exclude archived by default
  if (query.includeArchived !== "true") {
    todos = todos.filter(todo => todo.status !== "archived");
  }

  return todos;
});
