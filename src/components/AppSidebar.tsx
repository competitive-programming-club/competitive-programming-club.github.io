import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavItem {
  label: string;
  path?: string;
  children?: NavItem[];
}

const navigation: NavItem[] = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Leaderboard",
    path: "/leaderboard",
  },
  {
    label: "Contest Calendar",
    path: "/contests",
  },
  {
    label: "Editorials",
    path: "/editorials",
    children: [
      { label: "Codeforces", path: "/editorials?platform=codeforces" },
      { label: "CodeChef", path: "/editorials?platform=codechef" },
      { label: "LeetCode", path: "/editorials?platform=leetcode" },
    ],
  },
  {
    label: "Algebra",
    children: [
      { label: "Binary Exponentiation" },
      { label: "Euclidean Algorithm" },
      { label: "Sieve of Eratosthenes" },
      { label: "Modular Arithmetic" },
    ],
  },
  {
    label: "Data Structures",
    children: [
      { label: "Segment Tree" },
      { label: "Fenwick Tree" },
      { label: "Disjoint Set Union" },
      { label: "Sparse Table" },
    ],
  },
  {
    label: "Dynamic Programming",
    children: [
      { label: "Knapsack Problem" },
      { label: "Longest Increasing Subsequence" },
      { label: "Bitmask DP" },
      { label: "Digit DP" },
    ],
  },
  {
    label: "Graph Algorithms",
    children: [
      { label: "BFS & DFS" },
      { label: "Dijkstra's Algorithm" },
      { label: "Bellman-Ford" },
      { label: "Minimum Spanning Tree" },
      { label: "Topological Sort" },
    ],
  },
  {
    label: "String Processing",
    children: [
      { label: "KMP Algorithm" },
      { label: "Z-Function" },
      { label: "Suffix Array" },
      { label: "Aho-Corasick" },
    ],
  },
];

interface AppSidebarProps {
  open: boolean;
}

const AppSidebar = ({ open }: AppSidebarProps) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const location = useLocation();

  const toggle = (label: string) => {
    setExpanded((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <aside
      className={`fixed top-[var(--nav-height)] left-0 bottom-0 w-60 bg-sidebar border-r border-sidebar-border overflow-y-auto transition-transform duration-200 z-40 ${
        open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      <nav className="py-3 px-2 text-[0.7rem]">
        {navigation.map((item) => (
          <div key={item.label} className="mb-0.5">
            {item.children ? (
              <>
                <button
                  onClick={() => toggle(item.label)}
                  className="w-full flex items-center justify-between px-3 py-1.5 text-sidebar-foreground hover:bg-sidebar-accent rounded-sm transition-colors font-medium"
                >
                  <span>{item.label}</span>
                  <ChevronRight
                    size={12}
                    className={`transition-transform duration-150 opacity-60 ${
                      expanded[item.label] ? "rotate-90" : ""
                    }`}
                  />
                </button>
                {expanded[item.label] && (
                  <div className="ml-3 border-l border-sidebar-border pl-0">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.path || "#"}
                        className={`block px-3 py-1 text-sidebar-foreground hover:bg-sidebar-accent rounded-sm transition-colors no-underline hover:no-underline ${
                          child.path && location.pathname + location.search === child.path
                            ? "text-sidebar-accent-foreground bg-sidebar-accent font-medium"
                            : ""
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                to={item.path || "#"}
                className={`block px-3 py-1.5 rounded-sm transition-colors no-underline hover:no-underline font-medium ${
                  location.pathname === item.path
                    ? "text-sidebar-accent-foreground bg-sidebar-accent"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                }`}
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default AppSidebar;
