import { CreateTagSchema } from "../../../shared/schemas/tag.schema";
import { tagRepository } from "../../db/repositories/tag.repository";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const result = CreateTagSchema.safeParse(body);

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Validation failed",
      data: result.error.format(),
    });
  }

  const tag = await tagRepository.create(result.data);

  setResponseStatus(event, 201);
  return tag;
});
