import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Archive,
  Bookmark,
  BookOpen,
  ChevronRight,
  Code,
  ExternalLink,
  FolderOpen,
  GitCommit,
  Github,
  Play,
  Zap,
} from "lucide-react";
import { Button } from "./ui/button";
import { getStatusColor } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import type { RecentActivity } from "@/types/type";

const recentActivity: RecentActivity[] = [
  {
    id: "1",
    type: "snippet",
    title: "React useCallback Hook",
    action: "Created new snippet",
    timestamp: "2 hours ago",
    icon: <Code className="w-4 h-4" />,
  },
  {
    id: "2",
    type: "project",
    title: "E-Commerce Platform",
    action: "Updated progress to 75%",
    timestamp: "4 hours ago",
    icon: <FolderOpen className="w-4 h-4" />,
  },
  {
    id: "3",
    type: "bookmark",
    title: "TypeScript Deep Dive",
    action: "Added to favorites",
    timestamp: "6 hours ago",
    icon: <Bookmark className="w-4 h-4" />,
  },
  {
    id: "4",
    type: "documentation",
    title: "GraphQL API Guide",
    action: "Viewed documentation",
    timestamp: "1 day ago",
    icon: <BookOpen className="w-4 h-4" />,
  },
  {
    id: "5",
    type: "snippet",
    title: "CSS Grid Layout",
    action: "Copied snippet",
    timestamp: "1 day ago",
    icon: <Code className="w-4 h-4" />,
  },
  {
    id: "6",
    type: "project",
    title: "Weather Dashboard",
    action: "Committed to repository",
    timestamp: "2 days ago",
    icon: <GitCommit className="w-4 h-4" />,
  },
];

const activeProjects: Project[] = [
  {
    id: "1",
    name: "E-Commerce Platform",
    status: "active",
    progress: 75,
    tech: ["React", "Node.js", "MongoDB"],
    lastCommit: "2 hours ago",
    repository: "https://github.com/user/ecommerce",
  },
  {
    id: "2",
    name: "Task Manager Mobile",
    status: "active",
    progress: 45,
    tech: ["React Native", "Firebase"],
    lastCommit: "1 day ago",
    repository: "https://github.com/user/task-manager",
  },
  {
    id: "3",
    name: "Weather Dashboard",
    status: "active",
    progress: 60,
    tech: ["Vue.js", "D3.js"],
    lastCommit: "3 days ago",
    repository: "https://github.com/user/weather-dash",
  },
  {
    id: "4",
    name: "Portfolio Website",
    status: "completed",
    progress: 100,
    tech: ["Next.js", "Tailwind"],
    lastCommit: "1 week ago",
    repository: "https://github.com/user/portfolio",
  },
];

const RecentActivity = () => {
  const getStatusIcon = (status: string) => {
    const icons = {
      active: <Play className="w-4 h-4 text-green-600" />,
      completed: <Zap className="w-4 h-4 text-blue-600" />,
      paused: <Archive className="w-4 h-4 text-yellow-600" />,
    };
    return icons[status as keyof typeof icons];
  };

  return (
    <div className="lg:col-span-2 space-y-6 w-full">
      <Card className="border-0 shadow-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl">Active Projects</CardTitle>
            <CardDescription>Your current development projects</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            View All
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {activeProjects.slice(0, 4).map((project) => (
            <div
              key={project.id}
              className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-gray-900">
                    {project.name}
                  </h3>
                  <Badge
                    className={`text-xs ${getStatusColor(project.status)}`}
                  >
                    <div className="flex items-center gap-1">
                      {getStatusIcon(project.status)}
                      <span className="capitalize">{project.status}</span>
                    </div>
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  {project.repository && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => window.open(project.repository!, "_blank")}
                    >
                      <Github className="w-4 h-4" />
                    </Button>
                  )}
                  <Button size="sm" variant="ghost">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />

                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {project.tech.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.tech.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.tech.length - 3}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <GitCommit className="w-3 h-3" />
                    {project.lastCommit}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">Recent Activity</CardTitle>
          <CardDescription>
            Your latest actions across all tools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="p-2 bg-gray-100 rounded-lg">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-600">{activity.title}</p>
                </div>
                <div className="text-xs text-gray-500">
                  {activity.timestamp}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecentActivity;
