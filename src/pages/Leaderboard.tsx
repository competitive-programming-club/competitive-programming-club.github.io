import { useState, useMemo } from "react";

type Platform = "all" | "codeforces" | "codechef" | "leetcode";
type StatusFilter = "active" | "all_members";

interface Member {
  rank: number;
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
  { rank: 1, name: "Arjun Sharma", cfRating: 2100, cfHandle: "arjun_cp", ccRating: 2200, ccHandle: "arjun_cc", lcRating: 2400, lcHandle: "arjun_lc", isAlumni: false, isActive: true },
  { rank: 2, name: "Priya Patel", cfRating: 1950, cfHandle: "priya_cf", ccRating: 2050, ccHandle: "priya_cc", lcRating: 2300, lcHandle: "priya_lc", isAlumni: false, isActive: true },
  { rank: 3, name: "Rahul Verma", cfRating: 1850, cfHandle: "rahul_v", ccRating: 1900, ccHandle: "rahul_cc", lcRating: 2100, lcHandle: "rahul_lc", isAlumni: false, isActive: true },
  { rank: 4, name: "Sneha Gupta", cfRating: 1780, cfHandle: "sneha_g", ccRating: 1800, ccHandle: "sneha_cc", lcRating: 2050, lcHandle: "sneha_lc", isAlumni: false, isActive: true },
  { rank: 5, name: "Vikram Singh", cfRating: 2300, cfHandle: "vikram_s", ccRating: 2400, ccHandle: "vikram_cc", lcRating: 2600, lcHandle: "vikram_lc", isAlumni: true, isActive: false },
  { rank: 6, name: "Ananya Reddy", cfRating: 1700, cfHandle: "ananya_r", ccRating: 1750, ccHandle: "ananya_cc", lcRating: 1950, lcHandle: "ananya_lc", isAlumni: false, isActive: true },
  { rank: 7, name: "Karan Mehta", cfRating: 1650, cfHandle: "karan_m", ccRating: 1680, ccHandle: "karan_cc", lcRating: 1900, lcHandle: "karan_lc", isAlumni: false, isActive: true },
  { rank: 8, name: "Deepak Kumar", cfRating: 2050, cfHandle: "deepak_k", ccRating: 2100, ccHandle: "deepak_cc", lcRating: 2350, lcHandle: "deepak_lc", isAlumni: true, isActive: false },
  { rank: 9, name: "Meera Iyer", cfRating: 1600, cfHandle: "meera_i", ccRating: 1650, ccHandle: "meera_cc", lcRating: 1850, lcHandle: "meera_lc", isAlumni: false, isActive: true },
  { rank: 10, name: "Aditya Joshi", cfRating: 1550, cfHandle: "aditya_j", ccRating: 1580, ccHandle: "aditya_cc", lcRating: 1800, lcHandle: "aditya_lc", isAlumni: false, isActive: false },
  { rank: 11, name: "Nisha Thakur", cfRating: 1900, cfHandle: "nisha_t", ccRating: 1950, ccHandle: "nisha_cc", lcRating: 2200, lcHandle: "nisha_lc", isAlumni: true, isActive: false },
  { rank: 12, name: "Rohan Das", cfRating: 1500, cfHandle: "rohan_d", ccRating: 1520, ccHandle: "rohan_cc", lcRating: 1750, lcHandle: "rohan_lc", isAlumni: false, isActive: true },
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

    // Status filter
    if (status === "active") {
      result = result.filter((m) => m.isActive || (includeAlumni && m.isAlumni));
    } else {
      if (!includeAlumni) {
        result = result.filter((m) => !m.isAlumni);
      }
    }

    // Sort by selected platform rating
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
          <input
            type="radio"
            name="status"
            checked={status === "active"}
            onChange={() => setStatus("active")}
            className="accent-primary"
          />
          <span>Active</span>
        </label>
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input
            type="radio"
            name="status"
            checked={status === "all_members"}
            onChange={() => setStatus("all_members")}
            className="accent-primary"
          />
          <span>All Members</span>
        </label>
        <span className="w-px h-4 bg-border" />
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input
            type="checkbox"
            checked={includeAlumni}
            onChange={(e) => setIncludeAlumni(e.target.checked)}
            className="accent-primary"
          />
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
              {(platform === "all" || platform === "codeforces") && (
                <th className="py-2 pr-3 font-semibold">CF Rating</th>
              )}
              {(platform === "all" || platform === "codechef") && (
                <th className="py-2 pr-3 font-semibold">CC Rating</th>
              )}
              {(platform === "all" || platform === "leetcode") && (
                <th className="py-2 pr-3 font-semibold">LC Rating</th>
              )}
              <th className="py-2 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((member, i) => (
              <tr
                key={member.name}
                className={`border-b border-border ${
                  member.isAlumni ? "opacity-70" : ""
                }`}
              >
                <td className="py-2 pr-3 text-muted-foreground">{i + 1}</td>
                <td className="py-2 pr-3 font-medium">{member.name}</td>
                {(platform === "all" || platform === "codeforces") && (
                  <td className="py-2 pr-3">
                    {member.cfRating ? (
                      <span style={{ color: getCfRankColor(member.cfRating), fontWeight: 500 }}>
                        {member.cfRating}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                )}
                {(platform === "all" || platform === "codechef") && (
                  <td className="py-2 pr-3">
                    {member.ccRating ? (
                      <span className="font-medium">{member.ccRating}</span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                )}
                {(platform === "all" || platform === "leetcode") && (
                  <td className="py-2 pr-3">
                    {member.lcRating ? (
                      <span className="font-medium">{member.lcRating}</span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                )}
                <td className="py-2">
                  {member.isAlumni ? (
                    <span className="inline-block px-1.5 py-0.5 text-[10px] bg-muted text-muted-foreground rounded-sm">
                      Alumni
                    </span>
                  ) : member.isActive ? (
                    <span className="inline-block px-1.5 py-0.5 text-[10px] bg-green-100 text-green-700 rounded-sm">
                      Active
                    </span>
                  ) : (
                    <span className="inline-block px-1.5 py-0.5 text-[10px] bg-muted text-muted-foreground rounded-sm">
                      Inactive
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <p className="py-8 text-center text-muted-foreground text-sm">
          No members match the current filters.
        </p>
      )}
    </article>
  );
};

export default Leaderboard;
