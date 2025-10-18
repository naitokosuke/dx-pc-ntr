import { createStorage } from "unstorage";
import fsDriver from "unstorage/drivers/fs";

// Development: use filesystem storage
// Production: can be switched to other drivers (redis, cloudflare-kv, etc.)
export const storage = createStorage({
  driver: fsDriver({ base: "./.data" }),
});

export const DB_KEYS = {
  todos: "todos",
  projects: "projects",
  tags: "tags",
} as const;
