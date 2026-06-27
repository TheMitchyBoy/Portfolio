"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function GithubSettings() {
  const [username, setUsername] = useState("");
  const [initial, setInitial] = useState("");
  const [hasToken, setHasToken] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/settings/github", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (!active) return;
        setUsername(d.username ?? "");
        setInitial(d.username ?? "");
        setHasToken(!!d.hasToken);
        setLoading(false);
      })
      .catch(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/settings/github", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage({ kind: "err", text: data.error ?? "Could not save." });
        return;
      }
      setInitial(data.username);
      setMessage({
        kind: "ok",
        text: "Saved. Your live work will sync from this account.",
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="glass-strong rounded-3xl p-6 sm:p-8">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor">
            <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
          </svg>
        </span>
        <div>
          <h2 className="text-xl font-bold tracking-tight">GitHub sync</h2>
          <p className="text-sm text-white/50">
            Auto-build your portfolio from a GitHub account.
          </p>
        </div>
      </div>

      <form onSubmit={save} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-white/70">
            GitHub username
          </label>
          <div className="flex items-center rounded-xl border border-white/10 bg-black/30 px-3 focus-within:border-fuchsia-400/50">
            <span className="text-white/40">@</span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="octocat"
              disabled={loading}
              className="w-full bg-transparent px-2 py-2.5 text-sm text-white placeholder-white/30 outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 ring-1 ${
              hasToken
                ? "bg-emerald-500/15 text-emerald-300 ring-emerald-400/30"
                : "bg-amber-500/15 text-amber-300 ring-amber-400/30"
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${hasToken ? "bg-emerald-400" : "bg-amber-400"}`} />
            {hasToken ? "Token configured" : "No token (60 req/hr limit)"}
          </span>
        </div>

        {message && (
          <p
            className={`rounded-lg px-3 py-2 text-sm ring-1 ${
              message.kind === "ok"
                ? "bg-emerald-500/10 text-emerald-300 ring-emerald-400/20"
                : "bg-red-500/10 text-red-300 ring-red-400/20"
            }`}
          >
            {message.text}
          </p>
        )}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving || loading || !username || username === initial}
            className="rounded-xl bg-gradient-to-r from-sky-500 via-cyan-400 to-teal-300 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/25 transition hover:shadow-cyan-500/40 disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save & sync"}
          </button>
          {initial && (
            <Link
              href="/github"
              className="text-sm font-medium text-white/60 transition hover:text-white"
            >
              View live work →
            </Link>
          )}
        </div>
        <p className="text-xs text-white/35">
          For private repos, more deployment detail and a higher rate limit, set
          a <code className="text-white/55">GITHUB_TOKEN</code> environment
          variable.
        </p>
      </form>
    </div>
  );
}
