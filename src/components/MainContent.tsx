import { BookOpen, Users, Code2, Trophy, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  { title: "Algebra", count: 12, icon: "∑" },
  { title: "Data Structures", count: 18, icon: "🌲" },
  { title: "Dynamic Programming", count: 15, icon: "📊" },
  { title: "Graph Algorithms", count: 22, icon: "🔗" },
  { title: "String Processing", count: 10, icon: "📝" },
  { title: "Geometry", count: 8, icon: "📐" },
];

const recentArticles = [
  { title: "Digit DP", category: "Dynamic Programming", date: "Apr 2, 2026" },
  { title: "Centroid Decomposition", category: "Graph Algorithms", date: "Mar 28, 2026" },
  { title: "FFT & NTT", category: "Algebra", date: "Mar 20, 2026" },
  { title: "Persistent Segment Tree", category: "Data Structures", date: "Mar 15, 2026" },
];

const MainContent = () => {
  return (
    <main className="pt-[var(--nav-height)] lg:pl-60">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Hero */}
        <div className="mb-10 pb-6 border-b border-border">
          <p className="text-xs text-muted-foreground mb-2 font-mono">Last update: April 7, 2026</p>
          <h1 className="text-2xl font-bold text-foreground mb-2 tracking-tight">
            Algorithms for Competitive Programming
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
            A curated collection of algorithms and data structures maintained by CP Club members.
            Learn, practice, and climb the{" "}
            <Link to="/leaderboard" className="text-primary hover:underline">leaderboard</Link>.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {[
            { icon: BookOpen, label: "Articles", value: "85+" },
            { icon: Users, label: "Members", value: "42" },
            { icon: Code2, label: "Solutions", value: "300+" },
            { icon: Trophy, label: "Contests", value: "12" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-card border border-border rounded p-3 flex items-center gap-3">
              <Icon size={16} className="text-primary shrink-0" />
              <div>
                <div className="text-base font-bold font-mono text-foreground">{value}</div>
                <div className="text-[11px] text-muted-foreground">{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Categories */}
        <section className="mb-10">
          <h2 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
            <span>Browse by Topic</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {categories.map((cat) => (
              <button
                key={cat.title}
                className="group bg-card border border-border rounded p-3 text-left hover:border-primary/40 hover:shadow-sm transition-all duration-150"
              >
                <span className="text-lg mb-1 block">{cat.icon}</span>
                <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {cat.title}
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">
                  {cat.count} articles
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Recent */}
        <section className="mb-10">
          <h2 className="text-base font-semibold text-foreground mb-3">
            Recently Added
          </h2>
          <div className="bg-card border border-border rounded divide-y divide-border">
            {recentArticles.map((article) => (
              <button
                key={article.title}
                className="group w-full flex items-center justify-between px-4 py-2.5 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <ArrowRight size={12} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  <div className="text-left">
                    <div className="text-sm text-foreground group-hover:text-primary transition-colors">
                      {article.title}
                    </div>
                    <div className="text-[11px] text-muted-foreground">
                      {article.category}
                    </div>
                  </div>
                </div>
                <span className="text-[11px] text-muted-foreground">{article.date}</span>
              </button>
            ))}
          </div>
        </section>

        <footer className="border-t border-border pt-4 pb-8 text-center text-[11px] text-muted-foreground">
          CP Club © 2026 · Built with ❤ by club members
        </footer>
      </div>
    </main>
  );
};

export default MainContent;
