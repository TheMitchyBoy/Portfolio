import type { Project } from "@prisma/client";
import type { Category, ProjectDTO, Stage } from "./types";
import { parseTags } from "./types";

export function serializeProject(
  project: Project,
  hasVoted = false,
): ProjectDTO {
  return {
    id: project.id,
    title: project.title,
    summary: project.summary,
    description: project.description,
    category: project.category as Category,
    stage: project.stage as Stage,
    imageUrl: project.imageUrl,
    demoUrl: project.demoUrl,
    tags: parseTags(project.tags),
    featured: project.featured,
    voteCount: project.voteCount,
    createdAt: project.createdAt.toISOString(),
    hasVoted,
  };
}
