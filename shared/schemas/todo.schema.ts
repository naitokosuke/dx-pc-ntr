import { z } from "zod";

export const TodoStatusSchema = z.enum(["pending", "in_progress", "completed", "archived"]);
export const TodoPrioritySchema = z.enum(["low", "medium", "high"]);

export const TodoSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: TodoStatusSchema.default("pending"),
  priority: TodoPrioritySchema.default("medium"),
  dueDate: z.string().datetime().optional(),
  completedAt: z.string().datetime().optional(),
  projectId: z.string().optional(),
  tags: z.array(z.string()).default([]),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  archivedAt: z.string().datetime().optional(),
});

export const CreateTodoSchema = TodoSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  archivedAt: true,
  completedAt: true,
});

export const UpdateTodoSchema = TodoSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).partial();

export type Todo = z.infer<typeof TodoSchema>;
export type CreateTodoInput = z.infer<typeof CreateTodoSchema>;
export type UpdateTodoInput = z.infer<typeof UpdateTodoSchema>;
export type TodoStatus = z.infer<typeof TodoStatusSchema>;
export type TodoPriority = z.infer<typeof TodoPrioritySchema>;
