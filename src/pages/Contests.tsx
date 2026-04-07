interface Contest {
  date: string;
  name: string;
  platform: string;
  link: string;
  duration: string;
}

const upcoming: Contest[] = [
  { date: "April 10, 2026", name: "Codeforces Round #960 (Div. 2)", platform: "Codeforces", link: "#", duration: "2h" },
  { date: "April 12, 2026", name: "CP Club Weekly Contest #43", platform: "Club", link: "#", duration: "2h 30m" },
  { date: "April 13, 2026", name: "CodeChef Starters 180", platform: "CodeChef", link: "#", duration: "2h" },
  { date: "April 15, 2026", name: "LeetCode Weekly Contest 442", platform: "LeetCode", link: "#", duration: "1h 30m" },
  { date: "April 17, 2026", name: "Codeforces Round #961 (Div. 1+2)", platform: "Codeforces", link: "#", duration: "2h 30m" },
  { date: "April 19, 2026", name: "CP Club Weekly Contest #44", platform: "Club", link: "#", duration: "2h 30m" },
  { date: "April 20, 2026", name: "AtCoder Beginner Contest 400", platform: "AtCoder", link: "#", duration: "1h 40m" },
];

const past: Contest[] = [
  { date: "April 5, 2026", name: "CP Club Weekly Contest #42", platform: "Club", link: "#", duration: "2h 30m" },
  { date: "April 3, 2026", name: "Codeforces Round #959 (Div. 2)", platform: "Codeforces", link: "#", duration: "2h" },
  { date: "March 30, 2026", name: "CodeChef Starters 179", platform: "CodeChef", link: "#", duration: "2h" },
  { date: "March 29, 2026", name: "CP Club Weekly Contest #41", platform: "Club", link: "#", duration: "2h 30m" },
];

function getPlatformBadgeClass(platform: string): string {
  switch (platform) {
    case "Codeforces": return "bg-blue-100 text-blue-700";
    case "CodeChef": return "bg-amber-100 text-amber-700";
    case "LeetCode": return "bg-orange-100 text-orange-700";
    case "AtCoder": return "bg-gray-200 text-gray-700";
    case "Club": return "bg-purple-100 text-purple-700";
    default: return "bg-muted text-muted-foreground";
  }
}

const ContestTable = ({ contests, title }: { contests: Contest[]; title: string }) => (
  <>
    <h2 className="text-lg mb-3 mt-8 pb-1 border-b border-border">{title}</h2>
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
            <tr key={i} className="border-b border-border">
              <td className="py-2 pr-3 text-muted-foreground whitespace-nowrap">{c.date}</td>
              <td className="py-2 pr-3">
                <a href={c.link}>{c.name}</a>
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
  </>
);

const Contests = () => {
  return (
    <article className="max-w-3xl">
      <h1 className="text-2xl mb-4 pb-2 border-b border-border">Contest Calendar</h1>
      <p className="mb-4 text-foreground leading-relaxed">
        Stay up to date with upcoming competitive programming contests. We host weekly club contests
        and track major platform contests.
      </p>
      <ContestTable contests={upcoming} title="Upcoming Contests" />
      <ContestTable contests={past} title="Past Contests" />
    </article>
  );
};

export default Contests;
