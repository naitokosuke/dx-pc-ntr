import { UpdateTagSchema } from "../../../../shared/schemas/tag.schema";
import { tagRepository } from "../../../db/repositories/tag.repository";

export default defineEventHandler(async (event) => {
  const tagId = getRouterParam(event, "tag");

  if (!tagId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Tag ID is required",
    });
  }

  const body = await readBody(event);
  const result = UpdateTagSchema.safeParse(body);

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Validation failed",
      data: result.error.format(),
    });
  }

  const tag = await tagRepository.update(tagId, result.data);

  if (!tag) {
    throw createError({
      statusCode: 404,
      statusMessage: "Tag not found",
    });
  }

  return tag;
});
