import type { Project, CreateProjectInput, UpdateProjectInput } from "../../../shared/schemas/project.schema";
import { storage, DB_KEYS } from "../storage";

export class ProjectRepository {
  private async getAllProjects(): Promise<Project[]> {
    const projects = await storage.getItem<Project[]>(DB_KEYS.projects);
    return projects ?? [];
  }

  private async saveProjects(projects: Project[]): Promise<void> {
    await storage.setItem(DB_KEYS.projects, projects);
  }

  async findAll(): Promise<Project[]> {
    return this.getAllProjects();
  }

  async findById(id: string): Promise<Project | null> {
    const projects = await this.getAllProjects();
    return projects.find(project => project.id === id) ?? null;
  }

  async create(input: CreateProjectInput): Promise<Project> {
    const projects = await this.getAllProjects();
    const now = new Date().toISOString();

    const newProject: Project = {
      id: crypto.randomUUID(),
      ...input,
      createdAt: now,
      updatedAt: now,
    };

    projects.push(newProject);
    await this.saveProjects(projects);

    return newProject;
  }

  async update(id: string, input: UpdateProjectInput): Promise<Project | null> {
    const projects = await this.getAllProjects();
    const index = projects.findIndex(project => project.id === id);

    if (index === -1) return null;

    const currentProject = projects[index];
    if (!currentProject) return null;

    const updatedProject: Project = {
      id: currentProject.id,
      name: input.name ?? currentProject.name,
      description: input.description ?? currentProject.description,
      color: input.color ?? currentProject.color,
      sortOrder: input.sortOrder ?? currentProject.sortOrder,
      notificationSettings: input.notificationSettings ?? currentProject.notificationSettings,
      createdAt: currentProject.createdAt,
      updatedAt: new Date().toISOString(),
    };

    projects[index] = updatedProject;
    await this.saveProjects(projects);

    return updatedProject;
  }

  async delete(id: string): Promise<boolean> {
    const projects = await this.getAllProjects();
    const filtered = projects.filter(project => project.id !== id);

    if (filtered.length === projects.length) return false;

    await this.saveProjects(filtered);
    return true;
  }
}

export const projectRepository = new ProjectRepository();
