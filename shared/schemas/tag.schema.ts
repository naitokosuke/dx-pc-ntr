import { z } from "zod";

export const TagSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  color: z.string().optional(),
  description: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const CreateTagSchema = TagSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateTagSchema = CreateTagSchema.partial();

export type Tag = z.infer<typeof TagSchema>;
export type CreateTagInput = z.infer<typeof CreateTagSchema>;
export type UpdateTagInput = z.infer<typeof UpdateTagSchema>;
