import { NextRequest, NextResponse } from "next/server";
import { fetchPortfolioRepos } from "@/lib/github";

export const dynamic = "force-dynamic";

// GET /api/github/repos?limit=12 — normalized portfolio repositories.
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limitParam = Number(searchParams.get("limit"));
  const limit =
    Number.isFinite(limitParam) && limitParam > 0
      ? Math.min(Math.floor(limitParam), 30)
      : 12;

  const result = await fetchPortfolioRepos(limit);
  return NextResponse.json(result);
}
