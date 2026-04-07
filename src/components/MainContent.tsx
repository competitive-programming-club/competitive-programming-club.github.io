import { BookOpen, Users, Code2, Trophy, ArrowRight } from "lucide-react";

const categories = [
  { title: "Algebra", count: 12, color: "hsl(174 72% 56%)" },
  { title: "Data Structures", count: 18, color: "hsl(45 93% 58%)" },
  { title: "Dynamic Programming", count: 15, color: "hsl(280 68% 60%)" },
  { title: "Graph Algorithms", count: 22, color: "hsl(340 72% 60%)" },
  { title: "String Processing", count: 10, color: "hsl(200 72% 56%)" },
  { title: "Geometry", count: 8, color: "hsl(120 50% 50%)" },
];

const recentArticles = [
  { title: "Digit DP", category: "Dynamic Programming", date: "Apr 2, 2026" },
  { title: "Centroid Decomposition", category: "Graph Algorithms", date: "Mar 28, 2026" },
  { title: "FFT & NTT", category: "Algebra", date: "Mar 20, 2026" },
  { title: "Persistent Segment Tree", category: "Data Structures", date: "Mar 15, 2026" },
];

const MainContent = () => {
  return (
    <main className="pt-[var(--nav-height)] lg:pl-64">
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Hero */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-3 tracking-tight">
            CP Club<span className="text-primary">_</span>
          </h1>
          <p className="text-muted-foreground leading-relaxed max-w-2xl">
            A curated collection of algorithms and data structures for competitive programming.
            Written by club members, for club members. Learn, practice, and compete.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {[
            { icon: BookOpen, label: "Articles", value: "85+" },
            { icon: Users, label: "Members", value: "42" },
            { icon: Code2, label: "Solutions", value: "300+" },
            { icon: Trophy, label: "Contests", value: "12" },
          ].map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="bg-card border border-border rounded-md p-4 text-center"
            >
              <Icon size={18} className="mx-auto mb-2 text-primary" />
              <div className="text-lg font-bold font-mono text-foreground">{value}</div>
              <div className="text-xs text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>

        {/* Categories */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Browse by Topic
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.title}
                className="group bg-card border border-border rounded-md p-4 text-left hover:border-primary/30 transition-all duration-200"
              >
                <div
                  className="w-2 h-2 rounded-full mb-3"
                  style={{ backgroundColor: cat.color }}
                />
                <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {cat.title}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {cat.count} articles
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Recent */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Recently Added
          </h2>
          <div className="space-y-1">
            {recentArticles.map((article) => (
              <button
                key={article.title}
                className="group w-full flex items-center justify-between bg-card/50 hover:bg-card border border-transparent hover:border-border rounded-md px-4 py-3 transition-all"
              >
                <div className="flex items-center gap-3">
                  <ArrowRight size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  <div className="text-left">
                    <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {article.title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {article.category}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{article.date}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border pt-6 text-center text-xs text-muted-foreground">
          <p>CP Club © 2026 · Built with ❤ by club members</p>
        </footer>
      </div>
    </main>
  );
};

export default MainContent;
