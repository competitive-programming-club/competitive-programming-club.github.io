import { useState } from "react";
import editorialsData from "@/data/editorials.json";
import type { Editorial } from "@/data/types";

const allEditorials = editorialsData as Editorial[];

function getDifficultyClass(d: string): string {
  switch (d) {
    case "Easy": return "text-green-600 dark:text-green-400";
    case "Medium": return "text-amber-600 dark:text-amber-400";
    case "Hard": return "text-red-600 dark:text-red-400";
    default: return "text-muted-foreground";
  }
}

const Editorials = () => {
  const [platformFilter, setPlatformFilter] = useState<string>("all");

  const platforms = ["all", "Codeforces", "CodeChef", "LeetCode", "Club"];
  const filtered = platformFilter === "all"
    ? allEditorials
    : allEditorials.filter((e) => e.platform === platformFilter);

  return (
    <article>
      <h1 className="text-2xl mb-4 pb-2 border-b border-border">Editorials</h1>

      <p className="mb-4 text-foreground leading-relaxed">
        Problem editorials and solutions written by club members.
      </p>

      <div className="flex flex-wrap gap-1 mb-6">
        {platforms.map((p) => (
          <button
            key={p}
            onClick={() => setPlatformFilter(p)}
            className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors ${
              platformFilter === p
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {p === "all" ? "All" : p}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="py-2 pr-3 font-semibold">Title</th>
                <th className="py-2 pr-3 font-semibold">Contest</th>
                <th className="py-2 pr-3 font-semibold">Difficulty</th>
                <th className="py-2 pr-3 font-semibold">Author</th>
                <th className="py-2 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e, i) => (
                <tr key={i} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-2 pr-3">
                    <a href={e.link} target="_blank" rel="noreferrer" className="font-medium">{e.title}</a>
                  </td>
                  <td className="py-2 pr-3 text-muted-foreground">{e.contest}</td>
                  <td className="py-2 pr-3">
                    <span className={`font-medium ${getDifficultyClass(e.difficulty)}`}>{e.difficulty}</span>
                  </td>
                  <td className="py-2 pr-3">{e.author}</td>
                  <td className="py-2 text-muted-foreground whitespace-nowrap">{e.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="py-12 text-center text-muted-foreground text-sm border border-dashed border-border rounded-sm">
          <p>No editorials yet.</p>
          <p className="mt-1 text-xs">
            Add them in <code className="bg-muted px-1 py-0.5 rounded text-xs">src/data/editorials.json</code>
          </p>
        </div>
      )}
    </article>
  );
};

export default Editorials;
