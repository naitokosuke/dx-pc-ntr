import { UpdateTodoSchema } from "../../../../shared/schemas/todo.schema";
import { todoRepository } from "../../../db/repositories/todo.repository";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID is required",
    });
  }

  const body = await readBody(event);
  const result = UpdateTodoSchema.safeParse(body);

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Validation failed",
      data: result.error.format(),
    });
  }

  const todo = await todoRepository.update(id, result.data);

  if (!todo) {
    throw createError({
      statusCode: 404,
      statusMessage: "Todo not found",
    });
  }

  return todo;
});
