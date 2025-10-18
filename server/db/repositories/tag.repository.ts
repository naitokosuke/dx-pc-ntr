import type { Tag, CreateTagInput, UpdateTagInput } from "../../../shared/schemas/tag.schema";
import { storage, DB_KEYS } from "../storage";

export class TagRepository {
  private async getAllTags(): Promise<Tag[]> {
    const tags = await storage.getItem<Tag[]>(DB_KEYS.tags);
    return tags ?? [];
  }

  private async saveTags(tags: Tag[]): Promise<void> {
    await storage.setItem(DB_KEYS.tags, tags);
  }

  async findAll(): Promise<Tag[]> {
    return this.getAllTags();
  }

  async findById(id: string): Promise<Tag | null> {
    const tags = await this.getAllTags();
    return tags.find(tag => tag.id === id) ?? null;
  }

  async findByName(name: string): Promise<Tag | null> {
    const tags = await this.getAllTags();
    return tags.find(tag => tag.name === name) ?? null;
  }

  async create(input: CreateTagInput): Promise<Tag> {
    const tags = await this.getAllTags();
    const now = new Date().toISOString();

    const newTag: Tag = {
      id: crypto.randomUUID(),
      ...input,
      createdAt: now,
      updatedAt: now,
    };

    tags.push(newTag);
    await this.saveTags(tags);

    return newTag;
  }

  async update(id: string, input: UpdateTagInput): Promise<Tag | null> {
    const tags = await this.getAllTags();
    const index = tags.findIndex(tag => tag.id === id);

    if (index === -1) return null;

    const currentTag = tags[index];
    if (!currentTag) return null;

    const updatedTag: Tag = {
      id: currentTag.id,
      name: input.name ?? currentTag.name,
      description: input.description ?? currentTag.description,
      color: input.color ?? currentTag.color,
      createdAt: currentTag.createdAt,
      updatedAt: new Date().toISOString(),
    };

    tags[index] = updatedTag;
    await this.saveTags(tags);

    return updatedTag;
  }

  async delete(id: string): Promise<boolean> {
    const tags = await this.getAllTags();
    const filtered = tags.filter(tag => tag.id !== id);

    if (filtered.length === tags.length) return false;

    await this.saveTags(filtered);
    return true;
  }
}

export const tagRepository = new TagRepository();
