import { useState, useEffect, useMemo } from "react";
import membersData from "@/data/members.json";
import { fetchAllRatings } from "@/lib/api";
import type { MemberData, MemberWithRatings } from "@/data/types";
import { ExternalLink } from "lucide-react";

type Platform = "all" | "codeforces" | "codechef" | "leetcode";
type StatusFilter = "active" | "all_members";

function getCfRankColor(rating: number): string {
  if (rating >= 2400) return "#ff0000";
  if (rating >= 2100) return "#ff8c00";
  if (rating >= 1900) return "#aa00aa";
  if (rating >= 1600) return "#0000ff";
  if (rating >= 1400) return "#03a89e";
  if (rating >= 1200) return "#008000";
  return "#808080";
}

const ProfileLink = ({ url, label }: { url: string; label: string }) => (
  <a
    href={url}
    target="_blank"
    rel="noreferrer"
    className="inline-flex items-center gap-1 text-primary hover:underline"
  >
    {label}
    <ExternalLink className="w-3 h-3" />
  </a>
);

const Leaderboard = () => {
  const [platform, setPlatform] = useState<Platform>("all");
  const [status, setStatus] = useState<StatusFilter>("active");
  const [includeAlumni, setIncludeAlumni] = useState(false);
  const [members, setMembers] = useState<MemberWithRatings[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = membersData as MemberData[];
    if (raw.length === 0) {
      setMembers([]);
      setLoading(false);
      return;
    }
    fetchAllRatings(raw).then((result) => {
      setMembers(result);
      setLoading(false);
    });
  }, []);

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
      const getRating = (m: MemberWithRatings) => {
        switch (platform) {
          case "codeforces": return m.cfRating || 0;
          case "codechef": return m.ccRating || 0;
          case "leetcode": return m.lcRating || 0;
          default: return m.cfRating || 0;
        }
      };
      return getRating(b) - getRating(a);
    });

    return result;
  }, [platform, status, includeAlumni, members]);

  const platformTabs: { key: Platform; label: string }[] = [
    { key: "all", label: "ALL" },
    { key: "codeforces", label: "Codeforces" },
    { key: "codechef", label: "CodeChef" },
    { key: "leetcode", label: "LeetCode" },
  ];

  return (
    <article>
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
      {loading ? (
        <div className="py-12 text-center text-muted-foreground text-sm">
          <div className="inline-block w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin mb-2" />
          <p>Fetching live ratings...</p>
        </div>
      ) : members.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground text-sm border border-dashed border-border rounded-sm">
          <p>No members added yet.</p>
          <p className="mt-1 text-xs">
            Add members in <code className="bg-muted px-1 py-0.5 rounded text-xs">src/data/members.json</code>
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="py-2 pr-3 font-semibold">#</th>
                <th className="py-2 pr-3 font-semibold">Name</th>
                {(platform === "all" || platform === "codeforces") && <th className="py-2 pr-3 font-semibold">Codeforces</th>}
                {(platform === "all" || platform === "codechef") && <th className="py-2 pr-3 font-semibold">CodeChef</th>}
                {(platform === "all" || platform === "leetcode") && <th className="py-2 pr-3 font-semibold">LeetCode</th>}
                <th className="py-2 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((member, i) => (
                <tr key={member.name} className={`border-b border-border hover:bg-muted/50 transition-colors ${member.isAlumni ? "opacity-70" : ""}`}>
                  <td className="py-2 pr-3 text-muted-foreground">{i + 1}</td>
                  <td className="py-2 pr-3 font-medium">{member.name}</td>

                  {/* Codeforces — live rating */}
                  {(platform === "all" || platform === "codeforces") && (
                    <td className="py-2 pr-3">
                      {member.codeforces ? (
                        <a
                          href={`https://codeforces.com/profile/${member.codeforces}`}
                          target="_blank"
                          rel="noreferrer"
                          style={member.cfRating ? { color: getCfRankColor(member.cfRating), fontWeight: 600 } : undefined}
                          className={!member.cfRating ? "text-muted-foreground" : ""}
                        >
                          {member.cfRating ?? "—"} ↗
                        </a>
                      ) : <span className="text-muted-foreground">—</span>}
                    </td>
                  )}

                  {/* CodeChef — profile link only */}
                  {(platform === "all" || platform === "codechef") && (
                    <td className="py-2 pr-3">
                      {member.codechef ? (
                        <ProfileLink url={`https://www.codechef.com/users/${member.codechef}`} label={member.codechef} />
                      ) : <span className="text-muted-foreground">—</span>}
                    </td>
                  )}

                  {/* LeetCode — profile link only */}
                  {(platform === "all" || platform === "leetcode") && (
                    <td className="py-2 pr-3">
                      {member.leetcode ? (
                        <ProfileLink url={`https://leetcode.com/u/${member.leetcode}`} label={member.leetcode} />
                      ) : <span className="text-muted-foreground">—</span>}
                    </td>
                  )}

                  <td className="py-2">
                    {member.isAlumni ? (
                      <span className="inline-block px-1.5 py-0.5 text-[10px] bg-muted text-muted-foreground rounded-sm">Alumni</span>
                    ) : member.isActive ? (
                      <span className="inline-block px-1.5 py-0.5 text-[10px] bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-sm">Active</span>
                    ) : (
                      <span className="inline-block px-1.5 py-0.5 text-[10px] bg-muted text-muted-foreground rounded-sm">Inactive</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && members.length > 0 && filtered.length === 0 && (
        <p className="py-8 text-center text-muted-foreground text-sm">
          No members match the current filters.
        </p>
      )}
    </article>
  );
};

export default Leaderboard;
