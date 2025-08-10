"use client";

import React, { useState } from "react";
import {
  Search,
  Code,
  BookOpen,
  Bookmark,
  FolderOpen,
  Github,
  ExternalLink,
  Star,
  TrendingUp,
  Clock,
  Activity,
  Users,
  GitCommit,
  Plus,
  Calendar,
  Zap,
  Play,
  Archive,
  Globe,
  Smartphone,
  Database,
  Cloud,
  Tag,
  FileText,
  MessageSquare,
  Eye,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuickStats from "@/components/QuickStats";
import RecentActivity from "@/components/RecentActivity";
import QuickActions from "@/components/QuickActions";

interface Project {
  id: string;
  name: string;
  status: "active" | "completed" | "paused";
  progress: number;
  tech: string[];
  lastCommit: string;
  repository?: string;
}

interface PopularItem {
  id: string;
  title: string;
  type: "snippet" | "cheatsheet" | "bookmark" | "doc";
  category: string;
  views: number;
  icon: React.ReactNode;
}

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [timeRange, setTimeRange] = useState("7d");

  // Popular Items Data
  const popularItems: PopularItem[] = [
    {
      id: "1",
      title: "React useState Hook",
      type: "snippet",
      category: "React",
      views: 342,
      icon: <Code className="w-4 h-4" />,
    },
    {
      id: "2",
      title: "JavaScript Array Methods",
      type: "cheatsheet",
      category: "JavaScript",
      views: 289,
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: "3",
      title: "Stack Overflow: Async/Await",
      type: "bookmark",
      category: "Reference",
      views: 156,
      icon: <MessageSquare className="w-4 h-4" />,
    },
    {
      id: "4",
      title: "REST API Guidelines",
      type: "doc",
      category: "Backend",
      views: 134,
      icon: <BookOpen className="w-4 h-4" />,
    },
    {
      id: "5",
      title: "CSS Flexbox Guide",
      type: "cheatsheet",
      category: "CSS",
      views: 98,
      icon: <FileText className="w-4 h-4" />,
    },
  ];

  const getTypeColor = (type: string) => {
    const colors = {
      snippet: "bg-blue-100 text-blue-800",
      cheatsheet: "bg-purple-100 text-purple-800",
      bookmark: "bg-green-100 text-green-800",
      doc: "bg-orange-100 text-orange-800",
    };
    return colors[type as keyof typeof colors];
  };

  const actions = [
    { icon: Code, label: "New Code Snippet" },
    { icon: FolderOpen, label: "Create Project" },
    { icon: Bookmark, label: "Save Bookmark" },
    { icon: BookOpen, label: "Add Documentation" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Welcome back! Here&apos;s what&apos;s happening with your projects
              and resources.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Quick search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Quick Add
            </Button>
          </div>
        </div>

        <QuickStats />

        {/* Main Content Grid */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Active Projects */}
          <RecentActivity />
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <QuickActions title="Quick Actions" actions={actions} />

            {/* Popular This Week */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Popular This Week
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {popularItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-center w-6 h-6 bg-gray-100 rounded text-xs font-medium">
                      {index + 1}
                    </div>
                    <div className="p-1.5 bg-gray-100 rounded">{item.icon}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.title}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge className={`text-xs ${getTypeColor(item.type)}`}>
                          {item.type}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Eye className="w-3 h-3" />
                          {item.views}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Today's Focus */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Today&apos;s Focus
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-sm font-medium text-blue-900">
                      E-Commerce Platform
                    </span>
                  </div>
                  <p className="text-xs text-blue-700">
                    Complete payment integration and testing
                  </p>
                </div>

                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span className="text-sm font-medium text-green-900">
                      Code Review
                    </span>
                  </div>
                  <p className="text-xs text-green-700">
                    Review 3 pending pull requests
                  </p>
                </div>

                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span className="text-sm font-medium text-purple-900">
                      Documentation
                    </span>
                  </div>
                  <p className="text-xs text-purple-700">
                    Update API documentation
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Access Tabs */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">Quick Access</CardTitle>
            <CardDescription>Jump to your most used resources</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="snippets" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="snippets">Snippets</TabsTrigger>
                <TabsTrigger value="cheatsheets">Cheat Sheets</TabsTrigger>
                <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
                <TabsTrigger value="docs">Documentation</TabsTrigger>
              </TabsList>

              <TabsContent value="snippets" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      title: "React useState",
                      language: "JavaScript",
                      uses: 45,
                    },
                    { title: "CSS Flexbox Center", language: "CSS", uses: 32 },
                    { title: "Python List Comp", language: "Python", uses: 28 },
                    { title: "SQL Join Query", language: "SQL", uses: 23 },
                    {
                      title: "TypeScript Interface",
                      language: "TypeScript",
                      uses: 19,
                    },
                    { title: "Docker Compose", language: "YAML", uses: 15 },
                  ].map((snippet, index) => (
                    <div
                      key={index}
                      className="p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm text-gray-900">
                          {snippet.title}
                        </h4>
                        <Badge variant="secondary" className="text-xs">
                          {snippet.language}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Activity className="w-3 h-3" />
                        Used {snippet.uses} times
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="cheatsheets" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      title: "React Hooks",
                      category: "Frontend",
                      lastViewed: "2 hours ago",
                    },
                    {
                      title: "JavaScript ES6+",
                      category: "Language",
                      lastViewed: "1 day ago",
                    },
                    {
                      title: "CSS Grid & Flexbox",
                      category: "Frontend",
                      lastViewed: "2 days ago",
                    },
                    {
                      title: "Python Built-ins",
                      category: "Language",
                      lastViewed: "3 days ago",
                    },
                    {
                      title: "SQL Commands",
                      category: "Database",
                      lastViewed: "1 week ago",
                    },
                    {
                      title: "Git Commands",
                      category: "DevOps",
                      lastViewed: "1 week ago",
                    },
                  ].map((sheet, index) => (
                    <div
                      key={index}
                      className="p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm text-gray-900">
                          {sheet.title}
                        </h4>
                        <Badge variant="outline" className="text-xs">
                          {sheet.category}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        {sheet.lastViewed}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="bookmarks" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      title: "React useEffect Guide",
                      domain: "overreacted.io",
                      type: "article",
                    },
                    {
                      title: "Stack Overflow: Center Div",
                      domain: "stackoverflow.com",
                      type: "stackoverflow",
                    },
                    {
                      title: "Awesome React Components",
                      domain: "github.com",
                      type: "github",
                    },
                    {
                      title: "TypeScript Deep Dive",
                      domain: "basarat.gitbook.io",
                      type: "documentation",
                    },
                    {
                      title: "CSS Tricks Flexbox",
                      domain: "css-tricks.com",
                      type: "article",
                    },
                    {
                      title: "Can I Use - CSS Grid",
                      domain: "caniuse.com",
                      type: "tool",
                    },
                  ].map((bookmark, index) => (
                    <div
                      key={index}
                      className="p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-sm text-gray-900 line-clamp-1">
                          {bookmark.title}
                        </h4>
                        <ExternalLink className="w-3 h-3 text-gray-400 flex-shrink-0 ml-2" />
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-500 truncate">
                          {bookmark.domain}
                        </p>
                        <Badge
                          className={`text-xs ${getTypeColor(bookmark.type)}`}
                        >
                          {bookmark.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="docs" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      title: "React Hooks Guide",
                      category: "Frontend",
                      readTime: "45 min",
                    },
                    {
                      title: "REST API Guidelines",
                      category: "Backend",
                      readTime: "30 min",
                    },
                    {
                      title: "Docker Tutorial",
                      category: "DevOps",
                      readTime: "60 min",
                    },
                    {
                      title: "TypeScript Patterns",
                      category: "Language",
                      readTime: "90 min",
                    },
                    {
                      title: "Database Optimization",
                      category: "Database",
                      readTime: "75 min",
                    },
                    {
                      title: "AWS Deployment",
                      category: "Cloud",
                      readTime: "120 min",
                    },
                  ].map((doc, index) => (
                    <div
                      key={index}
                      className="p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm text-gray-900">
                          {doc.title}
                        </h4>
                        <Badge variant="outline" className="text-xs">
                          {doc.category}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        {doc.readTime} read
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Productivity Chart */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">This Week's Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { day: "Mon", commits: 8, snippets: 3 },
                { day: "Tue", commits: 12, snippets: 5 },
                { day: "Wed", commits: 6, snippets: 2 },
                { day: "Thu", commits: 15, snippets: 7 },
                { day: "Fri", commits: 10, snippets: 4 },
                { day: "Sat", commits: 4, snippets: 1 },
                { day: "Sun", commits: 2, snippets: 0 },
              ].map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 w-8">{data.day}</span>
                  <div className="flex-1 mx-3">
                    <div className="flex items-center gap-1">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(data.commits / 15) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 w-12 text-right">
                    {data.commits} commits
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Technology Stack */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Tech Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "React", percentage: 85, color: "bg-blue-500" },
                { name: "TypeScript", percentage: 78, color: "bg-blue-600" },
                { name: "Node.js", percentage: 72, color: "bg-green-500" },
                { name: "Python", percentage: 65, color: "bg-yellow-500" },
                { name: "Docker", percentage: 58, color: "bg-purple-500" },
                { name: "AWS", percentage: 45, color: "bg-orange-500" },
              ].map((tech, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">{tech.name}</span>
                    <span className="text-gray-500">{tech.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${tech.color}`}
                      style={{ width: `${tech.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Commits */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <GitCommit className="w-5 h-5" />
              Recent Commits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  project: "E-Commerce Platform",
                  message: "Add payment gateway integration",
                  time: "2 hours ago",
                  hash: "a1b2c3d",
                },
                {
                  project: "Task Manager Mobile",
                  message: "Fix authentication bug",
                  time: "1 day ago",
                  hash: "e4f5g6h",
                },
                {
                  project: "Weather Dashboard",
                  message: "Update weather API endpoints",
                  time: "2 days ago",
                  hash: "i7j8k9l",
                },
                {
                  project: "Portfolio Website",
                  message: "Optimize image loading",
                  time: "1 week ago",
                  hash: "m1n2o3p",
                },
              ].map((commit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Avatar className="w-6 h-6 bg-gray-200 flex-shrink-0">
                    <AvatarFallback className="text-xs">
                      {commit.hash.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-900 truncate">
                      {commit.message}
                    </p>
                    <p className="text-xs text-gray-500">{commit.project}</p>
                    <p className="text-xs text-gray-400">{commit.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Code Snippets",
            description: "Manage your code snippets",
            icon: <Code className="w-8 h-8" />,
            count: "127 snippets",
            color: "bg-blue-500",
            href: "/snippets",
          },
          {
            title: "Cheat Sheets",
            description: "Quick reference guides",
            icon: <FileText className="w-8 h-8" />,
            count: "15 cheat sheets",
            color: "bg-purple-500",
            href: "/cheatsheets",
          },
          {
            title: "Bookmarks",
            description: "Saved links and articles",
            icon: <Bookmark className="w-8 h-8" />,
            count: "234 bookmarks",
            color: "bg-green-500",
            href: "/bookmarks",
          },
          {
            title: "Documentation",
            description: "Technical documentation hub",
            icon: <BookOpen className="w-8 h-8" />,
            count: "45 documents",
            color: "bg-orange-500",
            href: "/documentation",
          },
        ].map((nav, index) => (
          <Card
            key={index}
            className="border-0 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer group"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-3 rounded-lg ${nav.color} text-white group-hover:scale-110 transition-transform`}
                >
                  {nav.icon}
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {nav.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{nav.description}</p>
                <p className="text-xs text-gray-500">{nav.count}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer Stats */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-2xl font-bold text-gray-900">2,847</p>
              <p className="text-sm text-gray-600">Total Views</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">156</p>
              <p className="text-sm text-gray-600">GitHub Stars</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">89</p>
              <p className="text-sm text-gray-600">Days Streak</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">423</p>
              <p className="text-sm text-gray-600">Code Commits</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
