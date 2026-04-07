// =============================================
// DATA TYPES — shared across the app
// =============================================

export interface MemberData {
  name: string;
  codeforces: string;  // Codeforces handle (leave "" if none)
  codechef: string;    // CodeChef handle (leave "" if none)
  leetcode: string;    // LeetCode handle (leave "" if none)
  isAlumni: boolean;   // true = graduated member
  isActive: boolean;   // true = currently participating
}

export interface MemberWithRatings extends MemberData {
  cfRating: number | null;
  ccRating: number | null;
  lcRating: number | null;
}

export interface Contest {
  date: string;
  name: string;
  platform: string;  // "Codeforces" | "CodeChef" | "LeetCode" | "AtCoder" | "Club"
  link: string;
  duration: string;
}

export interface Editorial {
  title: string;
  contest: string;
  platform: string;  // "Codeforces" | "CodeChef" | "LeetCode" | "Club"
  date: string;
  difficulty: string; // "Easy" | "Medium" | "Hard"
  author: string;
  link: string;
}

export interface Announcement {
  date: string;
  text: string;
}

export interface SiteConfig {
  clubName: string;
  description: string;
  stats: {
    activeMembers: number;
    alumni: number;
    contestsHosted: number;
  };
}
