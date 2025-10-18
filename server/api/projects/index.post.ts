import { CreateProjectSchema } from "../../../shared/schemas/project.schema";
import { projectRepository } from "../../db/repositories/project.repository";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const result = CreateProjectSchema.safeParse(body);

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Validation failed",
      data: result.error.format(),
    });
  }

  const project = await projectRepository.create(result.data);

  setResponseStatus(event, 201);
  return project;
});
