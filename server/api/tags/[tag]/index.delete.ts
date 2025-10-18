import { tagRepository } from "../../../db/repositories/tag.repository";

export default defineEventHandler(async (event) => {
  const tagId = getRouterParam(event, "tag");

  if (!tagId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Tag ID is required",
    });
  }

  const deleted = await tagRepository.delete(tagId);

  if (!deleted) {
    throw createError({
      statusCode: 404,
      statusMessage: "Tag not found",
    });
  }

  setResponseStatus(event, 204);
  return null;
});
