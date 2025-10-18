import { projectRepository } from "../../../db/repositories/project.repository";

export default defineEventHandler(async (event) => {
  const projectId = getRouterParam(event, "projectId");

  if (!projectId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Project ID is required",
    });
  }

  const deleted = await projectRepository.delete(projectId);

  if (!deleted) {
    throw createError({
      statusCode: 404,
      statusMessage: "Project not found",
    });
  }

  setResponseStatus(event, 204);
  return null;
});
