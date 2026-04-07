import { useState } from "react";

// =============================================
// EDITORIALS — Edit the array below
// =============================================
// ADD EDITORIALS HERE — copy this template:
// {
//   title: "Problem A - Problem Name",
//   contest: "CF Round #959",
//   platform: "Codeforces",   // "Codeforces" | "CodeChef" | "LeetCode" | "Club"
//   date: "April 3, 2026",
//   difficulty: "Easy",       // "Easy" | "Medium" | "Hard"
//   author: "Author Name",
//   link: "#",                // link to the editorial page or document
// },

interface Editorial {
  title: string;
  contest: string;
  platform: string;
  date: string;
  difficulty: string;
  author: string;
  link: string;
}

const editorials: Editorial[] = [
  // PASTE YOUR EDITORIALS BELOW:

];

function getDifficultyClass(d: string): string {
  switch (d) {
    case "Easy": return "text-green-600";
    case "Medium": return "text-amber-600";
    case "Hard": return "text-red-600";
    default: return "text-muted-foreground";
  }
}

const Editorials = () => {
  const [platformFilter, setPlatformFilter] = useState<string>("all");

  const platforms = ["all", "Codeforces", "CodeChef", "LeetCode", "Club"];
  const filtered = platformFilter === "all"
    ? editorials
    : editorials.filter((e) => e.platform === platformFilter);

  return (
    <article className="max-w-3xl">
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
                <tr key={i} className="border-b border-border">
                  <td className="py-2 pr-3">
                    <a href={e.link} className="font-medium">{e.title}</a>
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
        <p className="py-8 text-center text-muted-foreground text-sm">
          No editorials yet. Add them in <code>src/pages/Editorials.tsx</code>
        </p>
      )}
    </article>
  );
};

export default Editorials;
