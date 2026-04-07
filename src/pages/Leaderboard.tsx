import { useState, useMemo } from "react";

type Platform = "all" | "codeforces" | "codechef" | "leetcode";
type StatusFilter = "active" | "all_members";

// =============================================
// LEADERBOARD — Edit the members array below
// =============================================
// ADD MEMBERS HERE — copy this template:
// {
//   name: "Full Name",
//   cfRating: 1500,       // Codeforces rating (or null)
//   cfHandle: "cf_handle", // Codeforces handle (or null)
//   ccRating: 1500,       // CodeChef rating (or null)
//   ccHandle: "cc_handle", // CodeChef handle (or null)
//   lcRating: 1500,       // LeetCode rating (or null)
//   lcHandle: "lc_handle", // LeetCode handle (or null)
//   isAlumni: false,      // true if graduated
//   isActive: true,       // true if currently active
// },

interface Member {
  name: string;
  cfRating: number | null;
  cfHandle: string | null;
  ccRating: number | null;
  ccHandle: string | null;
  lcRating: number | null;
  lcHandle: string | null;
  isAlumni: boolean;
  isActive: boolean;
}

const members: Member[] = [
  // PASTE YOUR MEMBERS BELOW THIS LINE:

];

function getCfRankColor(rating: number): string {
  if (rating >= 2400) return "#ff0000";
  if (rating >= 2100) return "#ff8c00";
  if (rating >= 1900) return "#aa00aa";
  if (rating >= 1600) return "#0000ff";
  if (rating >= 1400) return "#03a89e";
  if (rating >= 1200) return "#008000";
  return "#808080";
}

const Leaderboard = () => {
  const [platform, setPlatform] = useState<Platform>("all");
  const [status, setStatus] = useState<StatusFilter>("active");
  const [includeAlumni, setIncludeAlumni] = useState(false);

  const filtered = useMemo(() => {
    let result = [...members];

    if (status === "active") {
      result = result.filter((m) => m.isActive || (includeAlumni && m.isAlumni));
    } else {
      if (!includeAlumni) {
        result = result.filter((m) => !m.isAlumni);
      }
    }

    result.sort((a, b) => {
      const getRating = (m: Member) => {
        switch (platform) {
          case "codeforces": return m.cfRating || 0;
          case "codechef": return m.ccRating || 0;
          case "leetcode": return m.lcRating || 0;
          default: return Math.max(m.cfRating || 0, m.ccRating || 0, m.lcRating || 0);
        }
      };
      return getRating(b) - getRating(a);
    });

    return result;
  }, [platform, status, includeAlumni]);

  const platformTabs: { key: Platform; label: string }[] = [
    { key: "all", label: "ALL" },
    { key: "codeforces", label: "Codeforces" },
    { key: "codechef", label: "CodeChef" },
    { key: "leetcode", label: "LeetCode" },
  ];

  return (
    <article className="max-w-4xl">
      <h1 className="text-2xl mb-4 pb-2 border-b border-border">Leaderboard</h1>

      {/* Platform filter tabs */}
      <div className="flex flex-wrap gap-1 mb-4">
        {platformTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setPlatform(tab.key)}
            className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors ${
              platform === tab.key
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Status filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6 text-xs">
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input type="radio" name="status" checked={status === "active"} onChange={() => setStatus("active")} className="accent-primary" />
          <span>Active</span>
        </label>
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input type="radio" name="status" checked={status === "all_members"} onChange={() => setStatus("all_members")} className="accent-primary" />
          <span>All Members</span>
        </label>
        <span className="w-px h-4 bg-border" />
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input type="checkbox" checked={includeAlumni} onChange={(e) => setIncludeAlumni(e.target.checked)} className="accent-primary" />
          <span>Include Alumni</span>
        </label>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b-2 border-border">
              <th className="py-2 pr-3 font-semibold">#</th>
              <th className="py-2 pr-3 font-semibold">Name</th>
              {(platform === "all" || platform === "codeforces") && <th className="py-2 pr-3 font-semibold">CF Rating</th>}
              {(platform === "all" || platform === "codechef") && <th className="py-2 pr-3 font-semibold">CC Rating</th>}
              {(platform === "all" || platform === "leetcode") && <th className="py-2 pr-3 font-semibold">LC Rating</th>}
              <th className="py-2 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((member, i) => (
              <tr key={member.name} className={`border-b border-border ${member.isAlumni ? "opacity-70" : ""}`}>
                <td className="py-2 pr-3 text-muted-foreground">{i + 1}</td>
                <td className="py-2 pr-3 font-medium">{member.name}</td>
                {(platform === "all" || platform === "codeforces") && (
                  <td className="py-2 pr-3">
                    {member.cfRating ? (
                      <a href={`https://codeforces.com/profile/${member.cfHandle}`} target="_blank" rel="noreferrer" style={{ color: getCfRankColor(member.cfRating), fontWeight: 500 }}>
                        {member.cfRating}
                      </a>
                    ) : <span className="text-muted-foreground">—</span>}
                  </td>
                )}
                {(platform === "all" || platform === "codechef") && (
                  <td className="py-2 pr-3">
                    {member.ccRating ? (
                      <a href={`https://www.codechef.com/users/${member.ccHandle}`} target="_blank" rel="noreferrer" className="font-medium">
                        {member.ccRating}
                      </a>
                    ) : <span className="text-muted-foreground">—</span>}
                  </td>
                )}
                {(platform === "all" || platform === "leetcode") && (
                  <td className="py-2 pr-3">
                    {member.lcRating ? (
                      <a href={`https://leetcode.com/u/${member.lcHandle}`} target="_blank" rel="noreferrer" className="font-medium">
                        {member.lcRating}
                      </a>
                    ) : <span className="text-muted-foreground">—</span>}
                  </td>
                )}
                <td className="py-2">
                  {member.isAlumni ? (
                    <span className="inline-block px-1.5 py-0.5 text-[10px] bg-muted text-muted-foreground rounded-sm">Alumni</span>
                  ) : member.isActive ? (
                    <span className="inline-block px-1.5 py-0.5 text-[10px] bg-green-100 text-green-700 rounded-sm">Active</span>
                  ) : (
                    <span className="inline-block px-1.5 py-0.5 text-[10px] bg-muted text-muted-foreground rounded-sm">Inactive</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <p className="py-8 text-center text-muted-foreground text-sm">
          No members yet. Add members in <code>src/pages/Leaderboard.tsx</code>
        </p>
      )}
    </article>
  );
};

export default Leaderboard;
