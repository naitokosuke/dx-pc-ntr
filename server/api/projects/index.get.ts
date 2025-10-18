import { projectRepository } from "../../db/repositories/project.repository";

export default defineEventHandler(async () => {
  return await projectRepository.findAll();
});
