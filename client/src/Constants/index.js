import { CgCodeSlash } from "react-icons/cg";
import {
  SiCodechef,
  SiCodeforces,
  SiGoogle,
  SiLeetcode,
  SiGeeksforgeeks,
} from "react-icons/si";

export const platformIcons = {
  LeetCode: SiLeetcode,
  CodeChef: SiCodechef,
  Codeforces: SiCodeforces,
  GeeksforGeeks: SiGeeksforgeeks,
  leetcode: SiLeetcode,
  codechef: SiCodechef,
  codeforces: SiCodeforces,
  gmeet: SiGoogle,
  others: CgCodeSlash,
};

export const platformColors = {
  leetcode: "#FFA116",
  hackerrank: "#00EA64",
  codechef: "#5B4638",
  codeforces: "#1F8ACB",
  geeksforgeeks: "#308d46",
};

// Sample resources data
export const resources = [
  {
    id: "75-leetcode", // String/Number - unique ID - used in routes
    title: "75 LeetCode Questions to Ace Your Interview",
    platforms: ["leetcode", "codechef", "codeforces"],
    count: 5,
    lastUpdated: "2025-02-10",
    description: "Curated list of interview-focused problems",
  },
  {
    id: "beginner-essentials",
    title: "Beginner's Essential Problems",
    platforms: ["leetcode", "codechef"],
    count: 50,
    lastUpdated: "2025-02-08",
    description: "Perfect starting point for competitive programming",
  },
  {
    id: 3,
    title: "SAMPLE SET 1 Problems",
    platforms: ["codeforces", "codechef"],
    count: 40,
    lastUpdated: "2025-02-08",
    description: "Perfect starting point for competitive programming",
  },
  {
    id: 4,
    title: "50 Creative Problems",
    platforms: ["leetcode", "codeforces"],
    count: 50,
    lastUpdated: "2025-02-08",
    description: "Perfect starting point for competitive programming",
  },
  {
    id: 5,
    title: "50 Creative Problems",
    platforms: ["leetcode", "codeforces"],
    count: 50,
    lastUpdated: "2025-02-08",
    description: "Perfect starting point for competitive programming",
  },
  {
    id: 6,
    title: "50 Creative Problems",
    platforms: ["leetcode", "codeforces"],
    count: 50,
    lastUpdated: "2025-02-08",
    description: "Perfect starting point for competitive programming",
  },
  {
    id: 7,
    title: "50 Creative Problems",
    platforms: ["leetcode", "codeforces"],
    count: 50,
    lastUpdated: "2025-02-08",
    description: "Perfect starting point for competitive programming",
  },
];
