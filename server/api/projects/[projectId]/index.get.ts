import { projectRepository } from "../../../db/repositories/project.repository";
import { todoRepository } from "../../../db/repositories/todo.repository";

export default defineEventHandler(async (event) => {
  const projectId = getRouterParam(event, "projectId");

  if (!projectId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Project ID is required",
    });
  }

  const project = await projectRepository.findById(projectId);

  if (!project) {
    throw createError({
      statusCode: 404,
      statusMessage: "Project not found",
    });
  }

  // Include todos in the project
  const todos = await todoRepository.findByProjectId(projectId);

  return {
    ...project,
    todos,
  };
});
