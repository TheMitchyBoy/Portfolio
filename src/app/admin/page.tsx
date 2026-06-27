"use client";

import { useCallback, useEffect, useState } from "react";
import { AdminLogin } from "@/components/AdminLogin";
import { ProjectForm } from "@/components/ProjectForm";
import { GithubSettings } from "@/components/GithubSettings";
import { STAGE_META, type ProjectDTO } from "@/lib/types";

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [projects, setProjects] = useState<ProjectDTO[]>([]);

  const loadProjects = useCallback(async () => {
    const res = await fetch("/api/projects?sort=new", { cache: "no-store" });
    const data = await res.json();
    setProjects(data.projects ?? []);
  }, []);

  const checkSession = useCallback(async () => {
    const res = await fetch("/api/admin/session", { cache: "no-store" });
    const data = await res.json();
    setAuthed(!!data.authenticated);
    if (data.authenticated) loadProjects();
  }, [loadProjects]);

  useEffect(() => {
    // checkSession only updates state after an awaited fetch, not synchronously.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    checkSession();
  }, [checkSession]);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
  }

  async function remove(id: string) {
    if (!confirm("Delete this project permanently?")) return;
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (res.ok) setProjects((prev) => prev.filter((p) => p.id !== id));
  }

  if (authed === null) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white/80" />
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-20">
        <AdminLogin onSuccess={checkSession} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Admin <span className="text-gradient">dashboard</span>
          </h1>
          <p className="mt-1 text-white/50">
            Upload new ideas and manage what&apos;s live.
          </p>
        </div>
        <button
          onClick={logout}
          className="rounded-xl glass px-4 py-2 text-sm font-medium text-white/70 transition hover:text-white"
        >
          Log out
        </button>
      </div>

      <div className="mb-8">
        <GithubSettings />
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <ProjectForm
          onCreated={(p) => setProjects((prev) => [p, ...prev])}
        />

        <div>
          <h2 className="mb-4 text-lg font-semibold">
            Live projects{" "}
            <span className="text-white/40">({projects.length})</span>
          </h2>
          {projects.length === 0 ? (
            <div className="glass rounded-2xl p-8 text-center text-sm text-white/45">
              No projects yet. Create one with the form.
            </div>
          ) : (
            <ul className="space-y-3">
              {projects.map((p) => (
                <li
                  key={p.id}
                  className="glass flex items-center gap-3 rounded-2xl p-3"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate font-medium text-white">
                        {p.title}
                      </span>
                      <span
                        className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ${STAGE_META[p.stage].classes}`}
                      >
                        {STAGE_META[p.stage].label}
                      </span>
                    </div>
                    <div className="mt-0.5 truncate text-xs text-white/45">
                      {p.category} · {p.voteCount} votes
                    </div>
                  </div>
                  <button
                    onClick={() => remove(p.id)}
                    className="shrink-0 rounded-lg border border-white/10 p-2 text-white/50 transition hover:border-red-400/40 hover:bg-red-500/10 hover:text-red-300"
                    aria-label={`Delete ${p.title}`}
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M4 7h16M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2m-9 0 1 13a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2l1-13" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
