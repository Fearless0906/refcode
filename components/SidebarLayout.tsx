"use client";

import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Home,
  ChevronLeft,
  ChevronRight,
  User,
  BookMarked,
  Code2,
  FileText,
  Bookmark,
  FolderGit2,
  Map,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
}

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home, current: true },
  { name: "Snippets", href: "/snippet", icon: Code2, current: false },
  {
    name: "Cheat Sheets",
    href: "/cheatsheet",
    icon: BookMarked,
    current: false,
  },
  {
    name: "Documentations",
    href: "/documentations",
    icon: FileText, // better match than File
    current: false,
  },
  {
    name: "Bookmarks",
    href: "/bookmarks",
    icon: Bookmark, // single bookmark icon
    current: false,
  },
  {
    name: "Projects",
    href: "/projects",
    icon: FolderGit2, // folder + git repo look
    current: false,
  },
  {
    name: "Roadmap",
    href: "/roadmap",
    icon: Map, // roadmap/map metaphor
    current: false,
  },
  {
    name: "Tips & Tricks",
    href: "/tips&tricks",
    icon: Lightbulb, // "idea" visual
    current: false,
  },
];

const SidebarLayout = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col border-r bg-white transition-all duration-300",
          sidebarOpen ? "w-64" : "w-16"
        )}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b">
          {sidebarOpen ? (
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                R
              </div>
              <span className="text-xl font-semibold">RefCode</span>
            </div>
          ) : null}

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-2 py-4">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </ScrollArea>

        {/* Footer */}
        <div className="border-t p-3 flex items-center">
          <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-gray-600" />
          </div>
          {sidebarOpen && (
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">John Doe</p>
              <p className="text-xs text-gray-500">john@example.com</p>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <ChevronRight className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <div className="h-16 border-b flex items-center px-4">
            <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
              A
            </div>
            <span className="ml-2 text-xl font-semibold">Acme Inc</span>
          </div>
          <ScrollArea className="h-[calc(100vh-4rem)] px-2 py-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    item.current
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </a>
              );
            })}
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default SidebarLayout;
