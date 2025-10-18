import { todoRepository } from "../../db/repositories/todo.repository";
import { projectRepository } from "../../db/repositories/project.repository";
import { tagRepository } from "../../db/repositories/tag.repository";

export default defineEventHandler(async () => {
  const [allTodos, allProjects, allTags] = await Promise.all([
    todoRepository.findAll(),
    projectRepository.findAll(),
    tagRepository.findAll(),
  ]);

  const todosByStatus = {
    pending: allTodos.filter(todo => todo.status === "pending").length,
    in_progress: allTodos.filter(todo => todo.status === "in_progress").length,
    completed: allTodos.filter(todo => todo.status === "completed").length,
    archived: allTodos.filter(todo => todo.status === "archived").length,
  };

  const todosByPriority = {
    low: allTodos.filter(todo => todo.priority === "low").length,
    medium: allTodos.filter(todo => todo.priority === "medium").length,
    high: allTodos.filter(todo => todo.priority === "high").length,
  };

  const recentTodos = allTodos
    .filter(todo => todo.status !== "archived")
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const upcomingTodos = allTodos
    .filter(todo => todo.status !== "completed" && todo.status !== "archived" && todo.dueDate)
    .sort((a, b) => {
      if (!a.dueDate || !b.dueDate) return 0;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    })
    .slice(0, 5);

  return {
    summary: {
      totalTodos: allTodos.length,
      totalProjects: allProjects.length,
      totalTags: allTags.length,
    },
    todosByStatus,
    todosByPriority,
    recentTodos,
    upcomingTodos,
  };
});
