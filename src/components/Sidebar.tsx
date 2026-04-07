import { ChevronRight } from "lucide-react";
import { useState } from "react";

interface SidebarSection {
  title: string;
  items: { label: string; badge?: string }[];
}

const sections: SidebarSection[] = [
  {
    title: "Getting Started",
    items: [
      { label: "Welcome" },
      { label: "How to Contribute" },
      { label: "Resources & Links" },
    ],
  },
  {
    title: "Algebra",
    items: [
      { label: "Binary Exponentiation" },
      { label: "Euclidean Algorithm" },
      { label: "Sieve of Eratosthenes" },
      { label: "Modular Arithmetic" },
    ],
  },
  {
    title: "Data Structures",
    items: [
      { label: "Segment Tree", badge: "popular" },
      { label: "Fenwick Tree" },
      { label: "Disjoint Set Union" },
      { label: "Sparse Table" },
    ],
  },
  {
    title: "Dynamic Programming",
    items: [
      { label: "Knapsack Problem" },
      { label: "Longest Increasing Subsequence" },
      { label: "Bitmask DP" },
      { label: "Digit DP", badge: "new" },
    ],
  },
  {
    title: "Graph Algorithms",
    items: [
      { label: "BFS & DFS" },
      { label: "Dijkstra's Algorithm", badge: "popular" },
      { label: "Bellman-Ford" },
      { label: "Minimum Spanning Tree" },
      { label: "Topological Sort" },
      { label: "Strongly Connected Components" },
    ],
  },
  {
    title: "String Processing",
    items: [
      { label: "KMP Algorithm" },
      { label: "Z-Function" },
      { label: "Suffix Array" },
      { label: "Aho-Corasick" },
    ],
  },
  {
    title: "Geometry",
    items: [
      { label: "Convex Hull" },
      { label: "Line Intersection" },
      { label: "Point in Polygon" },
    ],
  },
  {
    title: "Combinatorics",
    items: [
      { label: "Binomial Coefficients" },
      { label: "Catalan Numbers" },
      { label: "Inclusion-Exclusion" },
    ],
  },
];

interface SidebarProps {
  open: boolean;
}

const Sidebar = ({ open }: SidebarProps) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    "Getting Started": true,
    "Data Structures": true,
    "Graph Algorithms": true,
  });
  const [activeItem, setActiveItem] = useState("Welcome");

  const toggle = (title: string) => {
    setExpanded((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <aside
      className={`fixed top-[var(--nav-height)] left-0 bottom-0 w-64 bg-sidebar border-r border-sidebar-border overflow-y-auto transition-transform duration-200 z-40 ${
        open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      <nav className="py-4 px-3 space-y-1">
        {sections.map((section) => (
          <div key={section.title}>
            <button
              onClick={() => toggle(section.title)}
              className="w-full flex items-center justify-between px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>{section.title}</span>
              <ChevronRight
                size={14}
                className={`transition-transform duration-150 ${
                  expanded[section.title] ? "rotate-90" : ""
                }`}
              />
            </button>
            {expanded[section.title] && (
              <div className="ml-2 border-l border-sidebar-border pl-2 space-y-0.5 mb-2">
                {section.items.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setActiveItem(item.label)}
                    className={`w-full text-left px-2 py-1 text-sm rounded-sm transition-colors flex items-center gap-2 ${
                      activeItem === item.label
                        ? "text-sidebar-primary bg-sidebar-accent"
                        : "text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent/50"
                    }`}
                  >
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium shrink-0 ${
                          item.badge === "new"
                            ? "bg-primary/15 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
