import { prisma } from "./prisma";

// Read a setting from the DB, falling back to an environment variable and then
// to a provided default. DB values take precedence so they can be changed at
// runtime from the admin dashboard without a redeploy.
export async function getSetting(
  key: string,
  envFallback?: string,
): Promise<string | null> {
  try {
    const row = await prisma.setting.findUnique({ where: { key } });
    if (row?.value) return row.value;
  } catch {
    // Table may not exist yet (pre-migration); fall through to env.
  }
  const env = envFallback ? process.env[envFallback] : undefined;
  return env && env.trim() ? env.trim() : null;
}

export async function setSetting(key: string, value: string): Promise<void> {
  await prisma.setting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
}

export const GITHUB_USERNAME_KEY = "github_username";
