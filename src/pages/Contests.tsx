// =============================================
// CONTEST CALENDAR — Edit the arrays below
// =============================================
// ADD CONTESTS HERE — copy this template:
// { date: "April 10, 2026", name: "Contest Name", platform: "Codeforces", link: "https://...", duration: "2h" },
//
// Supported platforms for badge colors: "Codeforces", "CodeChef", "LeetCode", "AtCoder", "Club"

interface Contest {
  date: string;
  name: string;
  platform: string;
  link: string;
  duration: string;
}

const upcoming: Contest[] = [
  // PASTE UPCOMING CONTESTS BELOW:

];

const past: Contest[] = [
  // PASTE PAST CONTESTS BELOW:

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
    {contests.length === 0 ? (
      <p className="text-muted-foreground text-sm mb-6">No contests yet.</p>
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
              <tr key={i} className="border-b border-border">
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

const Contests = () => {
  return (
    <article className="max-w-3xl">
      <h1 className="text-2xl mb-4 pb-2 border-b border-border">Contest Calendar</h1>
      <p className="mb-4 text-foreground leading-relaxed">
        Upcoming and past competitive programming contests.
      </p>
      <ContestTable contests={upcoming} title="Upcoming Contests" />
      <ContestTable contests={past} title="Past Contests" />
    </article>
  );
};

export default Contests;
