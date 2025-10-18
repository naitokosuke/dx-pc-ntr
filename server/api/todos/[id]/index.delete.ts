import { todoRepository } from "../../../db/repositories/todo.repository";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID is required",
    });
  }

  const deleted = await todoRepository.delete(id);

  if (!deleted) {
    throw createError({
      statusCode: 404,
      statusMessage: "Todo not found",
    });
  }

  setResponseStatus(event, 204);
  return null;
});
