import type { Todo, CreateTodoInput, UpdateTodoInput } from "../../../shared/schemas/todo.schema";
import { storage, DB_KEYS } from "../storage";

export class TodoRepository {
  private async getAllTodos(): Promise<Todo[]> {
    const todos = await storage.getItem<Todo[]>(DB_KEYS.todos);
    return todos ?? [];
  }

  private async saveTodos(todos: Todo[]): Promise<void> {
    await storage.setItem(DB_KEYS.todos, todos);
  }

  async findAll(): Promise<Todo[]> {
    return this.getAllTodos();
  }

  async findById(id: string): Promise<Todo | null> {
    const todos = await this.getAllTodos();
    return todos.find(todo => todo.id === id) ?? null;
  }

  async findByProjectId(projectId: string): Promise<Todo[]> {
    const todos = await this.getAllTodos();
    return todos.filter(todo => todo.projectId === projectId);
  }

  async findByTag(tag: string): Promise<Todo[]> {
    const todos = await this.getAllTodos();
    return todos.filter(todo => todo.tags.includes(tag));
  }

  async findArchived(): Promise<Todo[]> {
    const todos = await this.getAllTodos();
    return todos.filter(todo => todo.status === "archived");
  }

  async create(input: CreateTodoInput): Promise<Todo> {
    const todos = await this.getAllTodos();
    const now = new Date().toISOString();

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      ...input,
      createdAt: now,
      updatedAt: now,
    };

    todos.push(newTodo);
    await this.saveTodos(todos);

    return newTodo;
  }

  async update(id: string, input: UpdateTodoInput): Promise<Todo | null> {
    const todos = await this.getAllTodos();
    const index = todos.findIndex(todo => todo.id === id);

    if (index === -1) return null;

    const currentTodo = todos[index];
    if (!currentTodo) return null;

    const updatedTodo: Todo = {
      id: currentTodo.id,
      title: input.title ?? currentTodo.title,
      description: input.description ?? currentTodo.description,
      status: input.status ?? currentTodo.status,
      priority: input.priority ?? currentTodo.priority,
      dueDate: input.dueDate ?? currentTodo.dueDate,
      completedAt: input.completedAt ?? currentTodo.completedAt,
      projectId: input.projectId ?? currentTodo.projectId,
      tags: input.tags ?? currentTodo.tags,
      createdAt: currentTodo.createdAt,
      updatedAt: new Date().toISOString(),
      archivedAt: input.archivedAt ?? currentTodo.archivedAt,
    };

    todos[index] = updatedTodo;
    await this.saveTodos(todos);

    return updatedTodo;
  }

  async delete(id: string): Promise<boolean> {
    const todos = await this.getAllTodos();
    const filtered = todos.filter(todo => todo.id !== id);

    if (filtered.length === todos.length) return false;

    await this.saveTodos(filtered);
    return true;
  }

  async archive(id: string): Promise<Todo | null> {
    return this.update(id, {
      status: "archived",
      archivedAt: new Date().toISOString(),
    });
  }

  async restore(id: string): Promise<Todo | null> {
    return this.update(id, {
      status: "pending",
      archivedAt: undefined,
    });
  }

  async complete(id: string): Promise<Todo | null> {
    return this.update(id, {
      status: "completed",
      completedAt: new Date().toISOString(),
    });
  }
}

export const todoRepository = new TodoRepository();
