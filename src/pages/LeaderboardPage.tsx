import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getCfColorClass } from "@/lib/codeforces";
import { Trophy, RefreshCw, ArrowUp, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";

interface LeaderboardEntry {
  id: string;
  display_name: string | null;
  codeforces_username: string | null;
  cf_rating: number | null;
  cf_rank: string | null;
  cf_max_rating: number | null;
  cf_max_rank: string | null;
}

type SortField = "cf_rating" | "cf_max_rating";

const LeaderboardPage = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState<SortField>("cf_rating");
  const [sortAsc, setSortAsc] = useState(false);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("profiles")
      .select("id, display_name, codeforces_username, cf_rating, cf_rank, cf_max_rating, cf_max_rank")
      .not("codeforces_username", "is", null)
      .gt("cf_rating", 0);

    if (data) {
      setEntries(data);
    }
    setLoading(false);
  };

  const sorted = [...entries].sort((a, b) => {
    const aVal = a[sortField] || 0;
    const bVal = b[sortField] || 0;
    return sortAsc ? aVal - bVal : bVal - aVal;
  });

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortAsc ? <ArrowUp size={12} /> : <ArrowDown size={12} />;
  };

  return (
    <div className="min-h-screen bg-background pt-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Trophy size={20} className="text-accent" />
            <h1 className="text-xl font-bold text-foreground">College Leaderboard</h1>
          </div>
          <button
            onClick={loadLeaderboard}
            disabled={loading}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 border border-border rounded"
          >
            <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground text-sm">Loading leaderboard...</div>
        ) : sorted.length === 0 ? (
          <div className="bg-card border border-border rounded p-8 text-center">
            <p className="text-muted-foreground text-sm mb-2">No members on the leaderboard yet.</p>
            <Link to="/auth" className="text-primary text-sm hover:underline">
              Sign up and link your Codeforces account →
            </Link>
          </div>
        ) : (
          <div className="bg-card border border-border rounded overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50 text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-2 text-left w-12">#</th>
                  <th className="px-4 py-2 text-left">Member</th>
                  <th className="px-4 py-2 text-left">CF Handle</th>
                  <th
                    className="px-4 py-2 text-right cursor-pointer hover:text-foreground select-none"
                    onClick={() => toggleSort("cf_rating")}
                  >
                    <span className="inline-flex items-center gap-1">
                      Rating <SortIcon field="cf_rating" />
                    </span>
                  </th>
                  <th
                    className="px-4 py-2 text-right cursor-pointer hover:text-foreground select-none hidden sm:table-cell"
                    onClick={() => toggleSort("cf_max_rating")}
                  >
                    <span className="inline-flex items-center gap-1">
                      Max <SortIcon field="cf_max_rating" />
                    </span>
                  </th>
                  <th className="px-4 py-2 text-left hidden md:table-cell">Rank</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((entry, index) => (
                  <tr
                    key={entry.id}
                    className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-4 py-2.5 font-mono text-muted-foreground text-xs">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2.5 font-medium text-foreground">
                      {entry.display_name || "—"}
                    </td>
                    <td className="px-4 py-2.5">
                      <a
                        href={`https://codeforces.com/profile/${entry.codeforces_username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`font-mono font-medium hover:underline ${getCfColorClass(entry.cf_rating)}`}
                      >
                        {entry.codeforces_username}
                      </a>
                    </td>
                    <td className={`px-4 py-2.5 text-right font-mono font-bold ${getCfColorClass(entry.cf_rating)}`}>
                      {entry.cf_rating || "—"}
                    </td>
                    <td className={`px-4 py-2.5 text-right font-mono hidden sm:table-cell ${getCfColorClass(entry.cf_max_rating)}`}>
                      {entry.cf_max_rating || "—"}
                    </td>
                    <td className={`px-4 py-2.5 text-xs hidden md:table-cell ${getCfColorClass(entry.cf_rating)}`}>
                      {entry.cf_rank || "Unrated"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="text-center text-[11px] text-muted-foreground mt-4">
          Ratings are fetched from the Codeforces API when members update their profiles.
        </p>
      </div>
    </div>
  );
};

export default LeaderboardPage;
