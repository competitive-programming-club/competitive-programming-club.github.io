// =============================================
// HOME PAGE — Edit the data below to update
// =============================================

// ADD ANNOUNCEMENTS HERE:
// Copy this template and paste inside the array:
// { date: "April 10, 2026", text: "Your announcement text here" },
const announcements: { date: string; text: string }[] = [
  // { date: "April 10, 2026", text: "Weekly Contest #43 registrations open!" },
  // { date: "April 5, 2026", text: "Weekly Contest #42 results are out!" },
];

// EDIT CLUB STATS HERE:
const stats = {
  activeMembers: 0,
  alumni: 0,
  contestsHosted: 0,
};

const Home = () => {
  return (
    <article className="max-w-3xl">
      <h1 className="text-2xl mb-4 pb-2 border-b border-border">CP Club</h1>

      <p className="mb-4 text-foreground leading-relaxed">
        Welcome to the <strong>CP Club</strong> — a community of competitive programmers.
      </p>

      <h2 className="text-lg mb-3 mt-8 pb-1 border-b border-border">Quick Links</h2>
      <ul className="list-disc pl-6 space-y-1.5 mb-8 text-foreground">
        <li><a href="/leaderboard">Leaderboard</a> — Member rankings across platforms</li>
        <li><a href="/contests">Contest Calendar</a> — Upcoming contests and events</li>
        <li><a href="/editorials">Editorials</a> — Solutions and explanations</li>
      </ul>

      {announcements.length > 0 && (
        <>
          <h2 className="text-lg mb-3 mt-8 pb-1 border-b border-border">Announcements</h2>
          <ul className="space-y-2 mb-8 text-foreground">
            {announcements.map((a, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-muted-foreground shrink-0">({a.date})</span>
                <span>{a.text}</span>
              </li>
            ))}
          </ul>
        </>
      )}

      <h2 className="text-lg mb-3 mt-8 pb-1 border-b border-border">Statistics</h2>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-left border-collapse">
          <tbody>
            <tr className="border-b border-border">
              <td className="py-2 pr-6 font-medium">Active Members</td>
              <td className="py-2">{stats.activeMembers}</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-6 font-medium">Alumni</td>
              <td className="py-2">{stats.alumni}</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-6 font-medium">Contests Hosted</td>
              <td className="py-2">{stats.contestsHosted}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>
  );
};

export default Home;
