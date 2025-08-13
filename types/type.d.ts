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

export interface Snippet {
  id: string;
  title: string;
  description: string;
  code: string;
  language: string;
  tags: string[];
  created_at: string;
  favorite: boolean;
  user_id: string;
}

export interface CheatSheetItem {
  id: string;
  cheatsheet_id: string;
  title: string;
  description: string;
  code: string;
  category: string;
  order_index: number;
  created_at: string;
}

export interface CheatSheet {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  favorite: boolean;
  created_at: string;
  updated_at: string;
  user_id: string;
  items?: CheatSheetItem[];
}
