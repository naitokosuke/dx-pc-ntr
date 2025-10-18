import { UpdateProjectSchema } from "../../../../shared/schemas/project.schema";
import { projectRepository } from "../../../db/repositories/project.repository";

export default defineEventHandler(async (event) => {
  const projectId = getRouterParam(event, "projectId");

  if (!projectId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Project ID is required",
    });
  }

  const body = await readBody(event);
  const result = UpdateProjectSchema.safeParse(body);

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Validation failed",
      data: result.error.format(),
    });
  }

  const project = await projectRepository.update(projectId, result.data);

  if (!project) {
    throw createError({
      statusCode: 404,
      statusMessage: "Project not found",
    });
  }

  return project;
});
