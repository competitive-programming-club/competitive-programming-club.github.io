import type { MemberData, MemberWithRatings } from "@/data/types";

// =============================================
// API FETCHERS — fetch live ratings from platforms
// =============================================

// Codeforces: https://codeforces.com/apiHelp/methods#user.info
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

// CodeChef: public API
export async function fetchCodeChefRating(handle: string): Promise<number | null> {
  if (!handle) return null;
  try {
    const res = await fetch(`https://codechef-api.vercel.app/handle/${handle}`);
    const data = await res.json();
    return data.currentRating ?? null;
  } catch {
    return null;
  }
}

// LeetCode: using public contest ranking API
export async function fetchLeetCodeRating(handle: string): Promise<number | null> {
  if (!handle) return null;
  try {
    const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${handle}`);
    const data = await res.json();
    // This API may not have rating; fallback
    return data.totalSolved ? null : null;
  } catch {
    return null;
  }
}

// Fetch all ratings for a list of members
export async function fetchAllRatings(members: MemberData[]): Promise<MemberWithRatings[]> {
  // Batch Codeforces calls (supports multiple handles in one request)
  const cfHandles = members
    .filter((m) => m.codeforces)
    .map((m) => m.codeforces);
  
  const cfRatings = await fetchCodeforcesRatings(cfHandles);

  // CodeChef: fetch individually (no batch API)
  const ccPromises = members.map((m) =>
    m.codechef ? fetchCodeChefRating(m.codechef) : Promise.resolve(null)
  );
  const ccResults = await Promise.all(ccPromises);

  return members.map((m, i) => ({
    ...m,
    cfRating: m.codeforces
      ? cfRatings[m.codeforces.toLowerCase()] ?? null
      : null,
    ccRating: ccResults[i],
    lcRating: null, // LeetCode doesn't have a reliable free rating API
  }));
}
