import config from "@/data/config.json";
import announcements from "@/data/announcements.json";
import type { Announcement, SiteConfig } from "@/data/types";

const siteConfig = config as SiteConfig;
const announcementList = announcements as Announcement[];

const Home = () => {
  return (
    <article>
      <h1 className="text-2xl mb-4 pb-2 border-b border-border">{siteConfig.clubName}</h1>

      <p className="mb-6 text-foreground leading-relaxed">
        Welcome to <strong>{siteConfig.clubName}</strong> — {siteConfig.description}
      </p>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-card border border-border rounded-sm p-4 text-center">
          <div className="text-2xl font-bold text-primary">{siteConfig.stats.activeMembers}</div>
          <div className="text-xs text-muted-foreground mt-1">Active Members</div>
        </div>
        <div className="bg-card border border-border rounded-sm p-4 text-center">
          <div className="text-2xl font-bold text-primary">{siteConfig.stats.alumni}</div>
          <div className="text-xs text-muted-foreground mt-1">Alumni</div>
        </div>
        <div className="bg-card border border-border rounded-sm p-4 text-center">
          <div className="text-2xl font-bold text-primary">{siteConfig.stats.contestsHosted}</div>
          <div className="text-xs text-muted-foreground mt-1">Contests Hosted</div>
        </div>
      </div>

      <h2 className="text-lg mb-3 mt-8 pb-1 border-b border-border">Quick Links</h2>
      <ul className="list-disc pl-6 space-y-1.5 mb-8 text-foreground">
        <li><a href="#/leaderboard">Leaderboard</a> — Member rankings across platforms</li>
        <li><a href="#/contests">Contest Calendar</a> — Upcoming contests and events</li>
        <li><a href="#/editorials">Editorials</a> — Solutions and explanations</li>
      </ul>

      {announcementList.length > 0 && (
        <>
          <h2 className="text-lg mb-3 mt-8 pb-1 border-b border-border">Announcements</h2>
          <ul className="space-y-2 mb-8 text-foreground">
            {announcementList.map((a, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-muted-foreground shrink-0">({a.date})</span>
                <span>{a.text}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </article>
  );
};

export default Home;
