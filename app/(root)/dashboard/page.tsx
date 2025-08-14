"use client";

import React, { useState } from "react";
import {
  Search,
  Code,
  BookOpen,
  Bookmark,
  FolderOpen,
  TrendingUp,
  Plus,
  FileText,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import QuickStats from "@/components/QuickStats";
import RecentActivity from "@/components/RecentActivity";
import QuickActions from "@/components/QuickActions";
import { useSelector } from "react-redux";
import { State } from "@/store/store";
import { AuthLoading } from "@/components/AuthLoading";

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { loading, user } = useSelector((state: State) => state.auth);

  if (loading) {
    return <AuthLoading />;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Please log in to view the dashboard.
        </h1>
      </div>
    );
  }

  const actions = [
    {
      icon: Code,
      label: "New Code Snippet",
      onClick: () => console.log("New Code Snippet"),
    },
    {
      icon: FolderOpen,
      label: "Create Project",
      onClick: () => console.log("Create Project"),
    },
    {
      icon: Bookmark,
      label: "Save Bookmark",
      onClick: () => console.log("Save Bookmark"),
    },
    {
      icon: BookOpen,
      label: "Add Documentation",
      onClick: () => console.log("Add Documentation"),
    },
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
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-sm font-medium text-blue-900">
                      React useState Hook
                    </span>
                  </div>
                  <p className="text-xs text-blue-700">
                    Most viewed code snippet this week
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
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
                  <p className="text-sm text-gray-600 mb-2">
                    {nav.description}
                  </p>
                  <p className="text-xs text-gray-500">{nav.count}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
