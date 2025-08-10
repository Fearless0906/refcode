import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowUpRight,
  Bookmark,
  BookOpen,
  Code,
  FolderOpen,
} from "lucide-react";
import { QuickStat } from "@/types/type";

const QuickStats = () => {
  // Quick Stats Data
  const quickStats: QuickStat[] = [
    {
      title: "Code Snippets",
      value: "127",
      change: "+12 this week",
      trend: "up",
      icon: <Code className="w-5 h-5" />,
      color: "bg-blue-500",
    },
    {
      title: "Active Projects",
      value: "8",
      change: "+2 this month",
      trend: "up",
      icon: <FolderOpen className="w-5 h-5" />,
      color: "bg-green-500",
    },
    {
      title: "Bookmarks",
      value: "234",
      change: "+18 this week",
      trend: "up",
      icon: <Bookmark className="w-5 h-5" />,
      color: "bg-purple-500",
    },
    {
      title: "Documentation",
      value: "45",
      change: "+3 this week",
      trend: "up",
      icon: <BookOpen className="w-5 h-5" />,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {quickStats.map((stat, index) => (
        <Card
          key={index}
          className="border-0 shadow-md hover:shadow-lg transition-shadow"
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stat.value}
                </p>
                <p
                  className={`text-xs mt-2 flex items-center gap-1 ${
                    stat.trend === "up"
                      ? "text-green-600"
                      : stat.trend === "down"
                      ? "text-red-600"
                      : "text-gray-600"
                  }`}
                >
                  {stat.trend === "up" && <ArrowUpRight className="w-3 h-3" />}
                  {stat.change}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                {stat.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuickStats;
