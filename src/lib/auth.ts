import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "admin_session";

function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? "changeme";
}

// Derive a deterministic token from the admin password so the raw password is
// never stored in the browser cookie.
export function adminToken(): string {
  return createHmac("sha256", getAdminPassword())
    .update("portfolio-admin")
    .digest("hex");
}

export function verifyPassword(candidate: string): boolean {
  const expected = Buffer.from(getAdminPassword());
  const provided = Buffer.from(candidate);
  if (expected.length !== provided.length) return false;
  return timingSafeEqual(expected, provided);
}

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE)?.value;
  if (!token) return false;
  const expected = adminToken();
  if (token.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(token), Buffer.from(expected));
}
