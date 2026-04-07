import { useState, useMemo } from "react";
import contestsData from "@/data/contests.json";
import type { Contest } from "@/data/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

const data = contestsData as { upcoming: Contest[]; past: Contest[] };

function getPlatformBadgeClass(platform: string): string {
  switch (platform) {
    case "Codeforces": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
    case "CodeChef": return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
    case "LeetCode": return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
    case "AtCoder": return "bg-gray-200 text-gray-700 dark:bg-gray-700/30 dark:text-gray-400";
    case "Club": return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
    default: return "bg-muted text-muted-foreground";
  }
}

function getPlatformDotColor(platform: string): string {
  switch (platform) {
    case "Codeforces": return "bg-blue-500";
    case "CodeChef": return "bg-amber-500";
    case "LeetCode": return "bg-orange-500";
    case "AtCoder": return "bg-gray-500";
    case "Club": return "bg-purple-500";
    default: return "bg-muted-foreground";
  }
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Parse "YYYY-MM-DD" to Date
function parseDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

const MonthlyCalendar = ({ contests }: { contests: Contest[] }) => {
  const [currentDate, setCurrentDate] = useState(() => new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToday = () => setCurrentDate(new Date());

  // Map contests by "YYYY-MM-DD" key
  const contestsByDate = useMemo(() => {
    const map: Record<string, Contest[]> = {};
    for (const c of contests) {
      if (!c.date) continue;
      if (!map[c.date]) map[c.date] = [];
      map[c.date].push(c);
    }
    return map;
  }, [contests]);

  // Build calendar grid
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="mb-8">
      {/* Calendar header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button onClick={prevMonth} className="p-1 hover:bg-muted rounded-sm transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <h2 className="text-lg font-semibold min-w-[180px] text-center">
            {MONTHS[month]} {year}
          </h2>
          <button onClick={nextMonth} className="p-1 hover:bg-muted rounded-sm transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <button onClick={goToday} className="px-2 py-1 text-xs bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-sm transition-colors">
          Today
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 text-center text-xs text-muted-foreground font-medium mb-1">
        {DAYS.map((d) => (
          <div key={d} className="py-1">{d}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 border-t border-l border-border">
        {cells.map((day, i) => {
          const dateStr = day
            ? `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
            : "";
          const dayContests = dateStr ? (contestsByDate[dateStr] || []) : [];
          const isToday = dateStr === todayStr;

          return (
            <div
              key={i}
              className={`min-h-[72px] border-r border-b border-border p-1 text-xs ${
                day ? "bg-background" : "bg-muted/30"
              } ${isToday ? "ring-1 ring-inset ring-primary" : ""}`}
            >
              {day && (
                <>
                  <div className={`text-right text-[11px] mb-0.5 ${isToday ? "text-primary font-bold" : "text-muted-foreground"}`}>
                    {day}
                  </div>
                  {dayContests.map((c, j) => (
                    <a
                      key={j}
                      href={c.link}
                      target="_blank"
                      rel="noreferrer"
                      className="block truncate text-[10px] leading-tight mb-0.5 px-1 py-0.5 rounded-sm hover:bg-muted transition-colors"
                      title={`${c.name} (${c.platform}) — ${c.duration}`}
                    >
                      <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1 ${getPlatformDotColor(c.platform)}`} />
                      {c.name}
                    </a>
                  ))}
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-3 text-[10px] text-muted-foreground">
        {["Codeforces", "CodeChef", "LeetCode", "AtCoder", "Club"].map((p) => (
          <span key={p} className="flex items-center gap-1">
            <span className={`inline-block w-2 h-2 rounded-full ${getPlatformDotColor(p)}`} />
            {p}
          </span>
        ))}
      </div>
    </div>
  );
};

const ContestTable = ({ contests, title }: { contests: Contest[]; title: string }) => (
  <>
    <h2 className="text-lg mb-3 mt-8 pb-1 border-b border-border">{title}</h2>
    {contests.length === 0 ? (
      <div className="py-6 text-center text-muted-foreground text-sm border border-dashed border-border rounded-sm mb-6">
        No contests yet. Add them in <code className="bg-muted px-1 py-0.5 rounded text-xs">src/data/contests.json</code>
      </div>
    ) : (
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b-2 border-border">
              <th className="py-2 pr-3 font-semibold">Date</th>
              <th className="py-2 pr-3 font-semibold">Contest</th>
              <th className="py-2 pr-3 font-semibold">Platform</th>
              <th className="py-2 font-semibold">Duration</th>
            </tr>
          </thead>
          <tbody>
            {contests.map((c, i) => (
              <tr key={i} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="py-2 pr-3 text-muted-foreground whitespace-nowrap">{c.date}</td>
                <td className="py-2 pr-3">
                  <a href={c.link} target="_blank" rel="noreferrer">{c.name}</a>
                </td>
                <td className="py-2 pr-3">
                  <span className={`inline-block px-1.5 py-0.5 text-[10px] rounded-sm font-medium ${getPlatformBadgeClass(c.platform)}`}>
                    {c.platform}
                  </span>
                </td>
                <td className="py-2 text-muted-foreground">{c.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </>
);

const allContests = [...data.upcoming, ...data.past];

const Contests = () => {
  return (
    <article>
      <h1 className="text-2xl mb-4 pb-2 border-b border-border">Contest Calendar</h1>

      {/* Monthly calendar view */}
      <MonthlyCalendar contests={allContests} />

      {/* Tables below */}
      <ContestTable contests={data.upcoming} title="Upcoming Contests" />
      <ContestTable contests={data.past} title="Past Contests" />
    </article>
  );
};

export default Contests;
