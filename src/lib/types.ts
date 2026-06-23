export type Category = "hardware" | "software";

export type Stage =
  | "idea"
  | "mockup"
  | "prototype"
  | "in_progress"
  | "completed";

export interface ProjectDTO {
  id: string;
  title: string;
  summary: string;
  description: string;
  category: Category;
  stage: Stage;
  imageUrl: string | null;
  demoUrl: string | null;
  tags: string[];
  featured: boolean;
  voteCount: number;
  createdAt: string;
  hasVoted?: boolean;
}

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: "hardware", label: "Hardware" },
  { value: "software", label: "Software" },
];

export const STAGES: {
  value: Stage;
  label: string;
  description: string;
}[] = [
  { value: "idea", label: "Idea", description: "A concept on paper" },
  { value: "mockup", label: "Mockup", description: "Visual / design mockup" },
  {
    value: "prototype",
    label: "Prototype",
    description: "Early working prototype",
  },
  {
    value: "in_progress",
    label: "In Progress",
    description: "Actively being built",
  },
  {
    value: "completed",
    label: "Completed",
    description: "Shipped and done",
  },
];

export const STAGE_META: Record<
  Stage,
  { label: string; classes: string }
> = {
  idea: {
    label: "Idea",
    classes: "bg-slate-500/15 text-slate-300 ring-slate-400/30",
  },
  mockup: {
    label: "Mockup",
    classes: "bg-amber-500/15 text-amber-300 ring-amber-400/30",
  },
  prototype: {
    label: "Prototype",
    classes: "bg-sky-500/15 text-sky-300 ring-sky-400/30",
  },
  in_progress: {
    label: "In Progress",
    classes: "bg-violet-500/15 text-violet-300 ring-violet-400/30",
  },
  completed: {
    label: "Completed",
    classes: "bg-emerald-500/15 text-emerald-300 ring-emerald-400/30",
  },
};

export function isValidCategory(value: unknown): value is Category {
  return value === "hardware" || value === "software";
}

export function isValidStage(value: unknown): value is Stage {
  return (
    value === "idea" ||
    value === "mockup" ||
    value === "prototype" ||
    value === "in_progress" ||
    value === "completed"
  );
}

export function parseTags(tags: string): string[] {
  return tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}
