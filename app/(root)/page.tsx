"use client";

import { BarChart, Bar, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const chartData = [
  { name: "Snippets", records: 25 },
  { name: "Cheat Sheets", records: 15 },
  { name: "Docs", records: 30 },
  { name: "Bookmarks", records: 12 },
  { name: "Projects", records: 7 },
  { name: "Roadmap", records: 10 },
  { name: "Tips", records: 18 },
];

const summaryData = [
  { title: "Snippets", value: 25 },
  { title: "Cheat Sheets", value: 15 },
  { title: "Docs", value: 30 },
  { title: "Bookmarks", value: 12 },
  { title: "Projects", value: 7 },
  { title: "Roadmap", value: 10 },
  { title: "Tips", value: 18 },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-0">
      {/* Hero Section */}
      <div className="relative px-6 pt-10 pb-6 flex flex-col items-center text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-center mb-4">
          <svg
            width="48"
            height="48"
            fill="none"
            viewBox="0 0 24 24"
            className="text-white drop-shadow-lg"
          >
            <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.2" />
            <path
              d="M7 12h10M12 7v10"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
          Developer Dashboard
        </h1>
        <p className="mt-2 text-lg text-white/80 max-w-xl mx-auto">
          A modern overview of your dev resources, analytics, and productivity.
        </p>
        <div className="mt-6 flex items-center gap-3">
          <Button variant="secondary" className="bg-white/90 hover:bg-white">
            View All Resources
          </Button>
          <Button
            variant="outline"
            className="bg-transparent text-white border-white hover:bg-white/20"
          >
            Documentation
          </Button>
        </div>
      </div>

      <div className="px-6 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Resource Overview</h2>
                <p className="text-muted-foreground">
                  Your development resources at a glance
                </p>
              </div>
              <Button variant="outline">Export Report</Button>
            </div>

            <Separator className="my-4" />

            {/* Summary Cards */}
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {summaryData.map((item, idx) => (
                <Card
                  key={item.title}
                  className="transition-transform hover:scale-105 hover:shadow-xl border-0 bg-white/90 backdrop-blur-lg relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-tr from-indigo-400 via-purple-400 to-pink-400 opacity-20 rounded-bl-3xl" />
                  <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <div>
                      <Badge variant="secondary" className="mb-2">
                        {item.title}
                      </Badge>
                      <CardTitle className="text-3xl font-bold text-gray-900">
                        {item.value}
                      </CardTitle>
                    </div>
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 text-white shadow-lg">
                      {/* Card Icons */}
                      {idx === 0 && (
                        <svg
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <rect
                            x="4"
                            y="6"
                            width="16"
                            height="12"
                            rx="2"
                            fill="currentColor"
                            opacity="0.2"
                          />
                          <path
                            d="M8 10h8M8 14h5"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      )}
                      {idx === 1 && (
                        <svg
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <rect
                            x="3"
                            y="5"
                            width="18"
                            height="14"
                            rx="2"
                            fill="currentColor"
                            opacity="0.2"
                          />
                          <path
                            d="M7 9h10M7 13h7"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      )}
                      {idx === 2 && (
                        <svg
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <rect
                            x="5"
                            y="4"
                            width="14"
                            height="16"
                            rx="2"
                            fill="currentColor"
                            opacity="0.2"
                          />
                          <path
                            d="M9 8h6M9 12h4"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      )}
                      {idx === 3 && (
                        <svg
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M6 7h12M6 11h8M6 15h5"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <rect
                            x="4"
                            y="5"
                            width="16"
                            height="14"
                            rx="2"
                            fill="currentColor"
                            opacity="0.2"
                          />
                        </svg>
                      )}
                      {idx === 4 && (
                        <svg
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M7 17l5-5 5 5"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <rect
                            x="4"
                            y="5"
                            width="16"
                            height="14"
                            rx="2"
                            fill="currentColor"
                            opacity="0.2"
                          />
                        </svg>
                      )}
                      {idx === 5 && (
                        <svg
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            fill="currentColor"
                            opacity="0.2"
                          />
                          <path
                            d="M12 8v4l3 3"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      )}
                      {idx === 6 && (
                        <svg
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <rect
                            x="6"
                            y="6"
                            width="12"
                            height="12"
                            rx="2"
                            fill="currentColor"
                            opacity="0.2"
                          />
                          <path
                            d="M9 9h6v6H9V9z"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      )}
                    </span>
                  </CardHeader>
                </Card>
              ))}
            </div>

            {/* Chart */}
            <Card className="mt-6 shadow-xl border-0 bg-white/95 backdrop-blur-lg">
              <CardHeader className="flex flex-col items-start gap-2">
                <Badge variant="outline" className="mb-2">
                  Analytics
                </Badge>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Records Overview
                </CardTitle>
                <CardDescription className="text-gray-600">
                  A breakdown of your stored resources and activity.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    records: {
                      label: "Records",
                      color: "url(#barGradient)",
                    },
                  }}
                  className="h-[300px] w-full"
                >
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" stroke="#888" />
                    <YAxis stroke="#888" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="records"
                      fill="url(#barGradient)"
                      radius={[8, 8, 0, 0]}
                    />
                    <defs>
                      <linearGradient
                        id="barGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Analytics</CardTitle>
                <CardDescription>Coming soon...</CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Coming soon...</CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
