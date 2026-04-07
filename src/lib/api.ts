import type { MemberData, MemberWithRatings } from "@/data/types";

// Codeforces API — batch fetch ratings
export async function fetchCodeforcesRatings(handles: string[]): Promise<Record<string, number>> {
  if (handles.length === 0) return {};
  try {
    const res = await fetch(
      `https://codeforces.com/api/user.info?handles=${handles.join(";")}`
    );
    const data = await res.json();
    if (data.status !== "OK") return {};
    const map: Record<string, number> = {};
    for (const user of data.result) {
      map[user.handle.toLowerCase()] = user.rating ?? 0;
    }
    return map;
  } catch {
    return {};
  }
}

// Fetch ratings for all members (CF only — CC/LC don't have reliable free APIs)
export async function fetchAllRatings(members: MemberData[]): Promise<MemberWithRatings[]> {
  const cfHandles = members
    .filter((m) => m.codeforces)
    .map((m) => m.codeforces);

  const cfRatings = await fetchCodeforcesRatings(cfHandles);

  return members.map((m) => ({
    ...m,
    cfRating: m.codeforces
      ? cfRatings[m.codeforces.toLowerCase()] ?? null
      : null,
    ccRating: null, // No reliable free API — profile linked instead
    lcRating: null, // No reliable free API — profile linked instead
  }));
}
