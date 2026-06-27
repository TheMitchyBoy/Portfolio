import Link from "next/link";
import { fetchPortfolioRepos } from "@/lib/github";
import { RepoCard } from "@/components/RepoCard";

// Server component: renders the top few GitHub repos on the landing page.
// Renders nothing if GitHub isn't configured or reachable so the page stays clean.
export async function GithubHighlights() {
  const { username, repos, error } = await fetchPortfolioRepos(3);
  if (error || repos.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium text-white/60">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Auto-synced from GitHub{username ? ` · @${username}` : ""}
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Fresh from the <span className="text-gradient">workbench</span>
          </h2>
          <p className="mt-2 max-w-xl text-white/55">
            My latest public repositories, with generated cover art and live
            deployment links — updated automatically.
          </p>
        </div>
        <Link
          href="/github"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl glass px-5 py-2.5 text-sm font-medium text-white/80 transition hover:text-white"
        >
          View all work
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </section>
  );
}
