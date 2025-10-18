import { CreateTodoSchema } from "../../../shared/schemas/todo.schema";
import { todoRepository } from "../../db/repositories/todo.repository";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const result = CreateTodoSchema.safeParse(body);

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Validation failed",
      data: result.error.format(),
    });
  }

  const todo = await todoRepository.create(result.data);

  setResponseStatus(event, 201);
  return todo;
});
