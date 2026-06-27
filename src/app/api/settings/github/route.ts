import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import {
  getSetting,
  setSetting,
  GITHUB_USERNAME_KEY,
} from "@/lib/settings";

export const dynamic = "force-dynamic";

// GET — current configured GitHub username (and whether a token is present).
export async function GET() {
  const username = await getSetting(GITHUB_USERNAME_KEY, "GITHUB_USERNAME");
  return NextResponse.json({
    username: username ?? "",
    hasToken: !!process.env.GITHUB_TOKEN?.trim(),
    source: (await getSetting(GITHUB_USERNAME_KEY)) ? "database" : "env",
  });
}

// POST — set the GitHub username (admin only).
export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    body = {};
  }
  const raw = (body as Record<string, unknown>)?.username;
  const username = typeof raw === "string" ? raw.trim().replace(/^@/, "") : "";

  if (!/^[a-zA-Z0-9-]{1,39}$/.test(username)) {
    return NextResponse.json(
      { error: "Enter a valid GitHub username." },
      { status: 400 },
    );
  }

  await setSetting(GITHUB_USERNAME_KEY, username);

  // The /github and home pages render dynamically and resolve the username on
  // each request, so the new account surfaces immediately — no cache busting
  // needed (GitHub responses are keyed by username at the fetch layer).
  return NextResponse.json({ ok: true, username });
}
