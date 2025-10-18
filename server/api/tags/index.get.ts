import { tagRepository } from "../../db/repositories/tag.repository";
import { todoRepository } from "../../db/repositories/todo.repository";

export default defineEventHandler(async () => {
  const tags = await tagRepository.findAll();
  const todos = await todoRepository.findAll();

  // Add todo count for each tag
  return tags.map((tag) => {
    const todoCount = todos.filter(todo => todo.tags.includes(tag.id)).length;
    return {
      ...tag,
      todoCount,
    };
  });
});
