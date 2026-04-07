// =============================================
// README FOR DATA FILES
// =============================================
// All site content is stored in this folder as JSON files.
// Edit these files and push to GitHub — the site updates automatically.
//
// FILES:
//
// 1. members.json — Club members for the leaderboard
//    Format: Array of objects
//    [
//      {
//        "name": "Full Name",
//        "codeforces": "cf_handle",    ← leave "" if no account
//        "codechef": "cc_handle",      ← leave "" if no account
//        "leetcode": "lc_handle",      ← leave "" if no account
//        "isAlumni": false,            ← true if graduated
//        "isActive": true              ← true if currently active
//      }
//    ]
//    If a username is provided, LIVE ratings are fetched from the API.
//
// 2. contests.json — Contest calendar
//    Format: { "upcoming": [...], "past": [...] }
//    Each contest:
//    {
//      "date": "April 10, 2026",
//      "name": "Codeforces Round #960",
//      "platform": "Codeforces",      ← Codeforces | CodeChef | LeetCode | AtCoder | Club
//      "link": "https://codeforces.com/contest/960",
//      "duration": "2h"
//    }
//
// 3. editorials.json — Problem editorials
//    Format: Array of objects
//    [
//      {
//        "title": "Problem A - XOR Queries",
//        "contest": "CF Round #959",
//        "platform": "Codeforces",    ← Codeforces | CodeChef | LeetCode | Club
//        "date": "April 3, 2026",
//        "difficulty": "Easy",        ← Easy | Medium | Hard
//        "author": "Author Name",
//        "link": "https://..."
//      }
//    ]
//
// 4. announcements.json — Home page announcements
//    Format: Array of objects (newest first)
//    [
//      { "date": "April 5, 2026", "text": "Weekly Contest #42 results are out!" }
//    ]
//
// 5. config.json — Site configuration
//    {
//      "clubName": "CP Club",
//      "description": "A community of competitive programmers.",
//      "stats": { "activeMembers": 42, "alumni": 86, "contestsHosted": 42 }
//    }
