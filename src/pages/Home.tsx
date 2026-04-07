const Home = () => {
  return (
    <article className="max-w-3xl">
      <h1 className="text-2xl mb-4 pb-2 border-b border-border">
        CP Club
      </h1>

      <p className="mb-4 text-foreground leading-relaxed">
        Welcome to the <strong>CP Club</strong> — a community of competitive programmers. 
        We provide curated algorithm resources, host weekly contests, and maintain a comprehensive 
        leaderboard tracking members across multiple platforms.
      </p>

      <p className="mb-6 text-foreground leading-relaxed">
        Our goal is to help members improve their problem-solving skills through structured practice, 
        editorial discussions, and collaborative learning.
      </p>

      <h2 className="text-lg mb-3 mt-8 pb-1 border-b border-border">Quick Links</h2>
      <ul className="list-disc pl-6 space-y-1.5 mb-8 text-foreground">
        <li><a href="/leaderboard">Leaderboard</a> — See how members rank across Codeforces, CodeChef, and LeetCode</li>
        <li><a href="/contests">Contest Calendar</a> — Upcoming contests and events</li>
        <li><a href="/editorials">Editorials</a> — Solutions and explanations for contest problems</li>
      </ul>

      <h2 className="text-lg mb-3 mt-8 pb-1 border-b border-border">Announcements</h2>
      <ul className="space-y-2 mb-8 text-foreground">
        <li className="flex gap-2">
          <span className="text-muted-foreground shrink-0">(April 5, 2026)</span>
          <span>Weekly Contest #42 results are out! Check the <a href="/leaderboard">leaderboard</a>.</span>
        </li>
        <li className="flex gap-2">
          <span className="text-muted-foreground shrink-0">(March 30, 2026)</span>
          <span>New editorials added for Codeforces Round #950.</span>
        </li>
        <li className="flex gap-2">
          <span className="text-muted-foreground shrink-0">(March 22, 2026)</span>
          <span>Club registration open for Spring 2026 semester.</span>
        </li>
        <li className="flex gap-2">
          <span className="text-muted-foreground shrink-0">(March 15, 2026)</span>
          <span>Added LeetCode rating tracking to the leaderboard.</span>
        </li>
      </ul>

      <h2 className="text-lg mb-3 mt-8 pb-1 border-b border-border">Statistics</h2>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-left border-collapse">
          <tbody>
            <tr className="border-b border-border">
              <td className="py-2 pr-6 font-medium">Active Members</td>
              <td className="py-2">42</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-6 font-medium">Alumni</td>
              <td className="py-2">86</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-6 font-medium">Articles</td>
              <td className="py-2">85+</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-6 font-medium">Contests Hosted</td>
              <td className="py-2">42</td>
            </tr>
          </tbody>
        </table>
      </div>

      <hr className="border-border my-6" />
      <p className="text-muted-foreground text-xs">
        CP Club © 2026 · Built by club members
      </p>
    </article>
  );
};

export default Home;
