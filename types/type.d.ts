export interface QuickStat {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: React.ReactNode;
  color: string;
}

export interface RecentActivity {
  id: string;
  type: "snippet" | "bookmark" | "project" | "documentation";
  title: string;
  action: string;
  timestamp: string;
  icon: React.ReactNode;
}

export interface Project {
  id: string;
  name: string;
  status: "active" | "completed" | "paused";
  progress: number;
  tech: string[];
  lastCommit: string;
  repository?: string;
}

export interface PopularItem {
  id: string;
  title: string;
  type: "snippet" | "cheatsheet" | "bookmark" | "doc";
  category: string;
  views: number;
  icon: React.ReactNode;
}
