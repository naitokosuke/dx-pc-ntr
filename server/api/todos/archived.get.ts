import { todoRepository } from "../../db/repositories/todo.repository";

export default defineEventHandler(async () => {
  const todos = await todoRepository.findArchived();
  return todos;
});
