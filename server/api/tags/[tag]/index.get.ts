import { tagRepository } from "../../../db/repositories/tag.repository";
import { todoRepository } from "../../../db/repositories/todo.repository";

export default defineEventHandler(async (event) => {
  const tagId = getRouterParam(event, "tag");

  if (!tagId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Tag ID is required",
    });
  }

  const tag = await tagRepository.findById(tagId);

  if (!tag) {
    throw createError({
      statusCode: 404,
      statusMessage: "Tag not found",
    });
  }

  // Include todos with this tag
  const todos = await todoRepository.findByTag(tagId);

  return {
    ...tag,
    todos,
  };
});
