import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { getCfColorClass, getCfRankFromRating } from "@/lib/codeforces";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const ProfilePage = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [cfUsername, setCfUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [cfRating, setCfRating] = useState<number | null>(null);
  const [cfRank, setCfRank] = useState("Unrated");
  const [saving, setSaving] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (data) {
      setDisplayName(data.display_name || "");
      setCfUsername(data.codeforces_username || "");
      setCfRating(data.cf_rating);
      setCfRank(data.cf_rank || "Unrated");
    }
    setProfileLoading(false);
  };

  const fetchCfRating = async () => {
    if (!cfUsername.trim()) {
      toast.error("Enter a Codeforces username first");
      return;
    }

    setFetching(true);
    try {
      const res = await fetch(
        `https://codeforces.com/api/user.info?handles=${encodeURIComponent(cfUsername.trim())}`
      );
      const data = await res.json();

      if (data.status !== "OK" || !data.result?.length) {
        toast.error("Codeforces user not found");
        return;
      }

      const cfUser = data.result[0];
      const rating = cfUser.rating || 0;
      const maxRating = cfUser.maxRating || 0;
      const rank = cfUser.rank || getCfRankFromRating(rating);
      const maxRank = cfUser.maxRank || getCfRankFromRating(maxRating);

      setCfRating(rating);
      setCfRank(rank);

      // Save to database
      if (user) {
        const { error } = await supabase
          .from("profiles")
          .update({
            codeforces_username: cfUsername.trim(),
            cf_rating: rating,
            cf_rank: rank,
            cf_max_rating: maxRating,
            cf_max_rank: maxRank,
          })
          .eq("user_id", user.id);

        if (error) throw error;
        toast.success(`Rating fetched: ${rating} (${rank})`);
      }
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Failed to fetch rating";
      toast.error(msg);
    } finally {
      setFetching(false);
    }
  };

  const saveProfile = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ display_name: displayName })
        .eq("user_id", user.id);

      if (error) throw error;
      toast.success("Profile saved!");
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Failed to save";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={24} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16 px-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-xl font-bold text-foreground mb-6">Your Profile</h1>

        <div className="bg-card border border-border rounded-md p-5 space-y-4">
          <div>
            <label className="text-xs font-medium text-foreground block mb-1">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full bg-muted border border-border rounded px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-foreground block mb-1">Codeforces Username</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={cfUsername}
                onChange={(e) => setCfUsername(e.target.value)}
                placeholder="tourist"
                className="flex-1 bg-muted border border-border rounded px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <button
                onClick={fetchCfRating}
                disabled={fetching}
                className="bg-primary text-primary-foreground px-3 py-2 rounded text-xs font-medium hover:opacity-90 transition-opacity disabled:opacity-50 shrink-0"
              >
                {fetching ? "Fetching..." : "Fetch Rating"}
              </button>
            </div>
          </div>

          {cfRating !== null && cfRating > 0 && (
            <div className="bg-muted rounded p-3 flex items-center justify-between">
              <div>
                <div className="text-[11px] text-muted-foreground">Current Rating</div>
                <div className={`text-lg font-bold font-mono ${getCfColorClass(cfRating)}`}>
                  {cfRating}
                </div>
              </div>
              <div className="text-right">
                <div className="text-[11px] text-muted-foreground">Rank</div>
                <div className={`text-sm font-medium ${getCfColorClass(cfRating)}`}>
                  {cfRank}
                </div>
              </div>
            </div>
          )}

          <button
            onClick={saveProfile}
            disabled={saving}
            className="w-full bg-primary text-primary-foreground py-2 rounded text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
