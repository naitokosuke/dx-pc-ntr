import { todoRepository } from "../db/repositories/todo.repository";
import { projectRepository } from "../db/repositories/project.repository";
import { tagRepository } from "../db/repositories/tag.repository";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const searchTerm = query.q?.toString() || "";

  if (!searchTerm) {
    return {
      todos: [],
      projects: [],
      tags: [],
    };
  }

  const [allTodos, allProjects, allTags] = await Promise.all([
    todoRepository.findAll(),
    projectRepository.findAll(),
    tagRepository.findAll(),
  ]);

  const lowerSearchTerm = searchTerm.toLowerCase();

  const todos = allTodos.filter(
    todo =>
      todo.title.toLowerCase().includes(lowerSearchTerm)
      || todo.description?.toLowerCase().includes(lowerSearchTerm),
  );

  const projects = allProjects.filter(
    project =>
      project.name.toLowerCase().includes(lowerSearchTerm)
      || project.description?.toLowerCase().includes(lowerSearchTerm),
  );

  const tags = allTags.filter(tag =>
    tag.name.toLowerCase().includes(lowerSearchTerm),
  );

  return {
    todos,
    projects,
    tags,
  };
});
