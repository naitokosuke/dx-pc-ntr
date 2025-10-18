import { todoRepository } from "../../../db/repositories/todo.repository";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID is required",
    });
  }

  const todo = await todoRepository.restore(id);

  if (!todo) {
    throw createError({
      statusCode: 404,
      statusMessage: "Todo not found",
    });
  }

  return todo;
});
