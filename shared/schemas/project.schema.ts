import { z } from "zod";

export const ProjectNotificationSettingsSchema = z.object({
  enableNotifications: z.boolean().default(true),
  emailNotifications: z.boolean().default(false),
  pushNotifications: z.boolean().default(false),
});

export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  color: z.string().optional(),
  sortOrder: z.number().default(0),
  notificationSettings: ProjectNotificationSettingsSchema.default({
    enableNotifications: true,
    emailNotifications: false,
    pushNotifications: false,
  }),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const CreateProjectSchema = ProjectSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateProjectSchema = CreateProjectSchema.partial();

export type Project = z.infer<typeof ProjectSchema>;
export type CreateProjectInput = z.infer<typeof CreateProjectSchema>;
export type UpdateProjectInput = z.infer<typeof UpdateProjectSchema>;
export type ProjectNotificationSettings = z.infer<typeof ProjectNotificationSettingsSchema>;
