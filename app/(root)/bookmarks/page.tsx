"use client";

import React, { useState } from "react";
import {
  Search,
  Plus,
  ExternalLink,
  Star,
  Tag,
  Calendar,
  Globe,
  Code,
  MessageSquare,
  BookOpen,
  Trash2,
  Edit,
  Copy,
  FolderOpen,
  Filter,
  Grid,
  List,
  Clock,
  Eye,
  Link2,
  Bookmark,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface BookmarkItem {
  id: string;
  title: string;
  url: string;
  description: string;
  category: string;
  type:
    | "website"
    | "article"
    | "stackoverflow"
    | "github"
    | "documentation"
    | "tool"
    | "video";
  tags: string[];
  dateAdded: string;
  lastVisited?: string;
  favorite: boolean;
  visits: number;
  domain: string;
  favicon?: string;
  screenshot?: string;
  notes?: string;
}

interface Folder {
  id: string;
  name: string;
  description: string;
  color: string;
  bookmarkIds: string[];
}

const BookmarksPage: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([
    {
      id: "1",
      title: "React useEffect Complete Guide",
      url: "https://overreacted.io/a-complete-guide-to-useeffect/",
      description:
        "Dan Abramov's comprehensive guide to understanding useEffect hook in React",
      category: "Learning",
      type: "article",
      tags: ["react", "hooks", "useeffect", "javascript"],
      dateAdded: "2024-08-05",
      lastVisited: "2024-08-07",
      favorite: true,
      visits: 12,
      domain: "overreacted.io",
      notes:
        "Excellent deep dive into useEffect. Reference for cleanup and dependency arrays.",
    },
    {
      id: "2",
      title: "Stack Overflow: How to center a div",
      url: "https://stackoverflow.com/questions/114543/how-to-center-a-div",
      description:
        "The eternal question - multiple ways to center elements in CSS",
      category: "Reference",
      type: "stackoverflow",
      tags: ["css", "layout", "centering", "flexbox"],
      dateAdded: "2024-08-04",
      lastVisited: "2024-08-06",
      favorite: false,
      visits: 8,
      domain: "stackoverflow.com",
      notes: "Bookmarked for the flexbox solution specifically.",
    },
    {
      id: "3",
      title: "GitHub - Awesome React Components",
      url: "https://github.com/brillout/awesome-react-components",
      description: "Curated list of React components & libraries",
      category: "Resources",
      type: "github",
      tags: ["react", "components", "library", "awesome"],
      dateAdded: "2024-08-03",
      favorite: true,
      visits: 15,
      domain: "github.com",
    },
    {
      id: "4",
      title: "Can I Use - CSS Grid",
      url: "https://caniuse.com/css-grid",
      description: "Browser compatibility table for CSS Grid Layout",
      category: "Tools",
      type: "tool",
      tags: ["css", "grid", "browser-support", "compatibility"],
      dateAdded: "2024-08-02",
      lastVisited: "2024-08-05",
      favorite: false,
      visits: 5,
      domain: "caniuse.com",
    },
    {
      id: "5",
      title: "TypeScript Deep Dive",
      url: "https://basarat.gitbook.io/typescript/",
      description: "The definitive guide to TypeScript - free online book",
      category: "Learning",
      type: "documentation",
      tags: ["typescript", "book", "guide", "free"],
      dateAdded: "2024-08-01",
      favorite: true,
      visits: 20,
      domain: "basarat.gitbook.io",
      notes:
        "Best TypeScript resource. Check advanced types section regularly.",
    },
    {
      id: "6",
      title: "Figma to React Components",
      url: "https://www.figma.com/community/plugin/959043969696347127",
      description: "Plugin to convert Figma designs to React components",
      category: "Tools",
      type: "tool",
      tags: ["figma", "react", "design-to-code", "plugin"],
      dateAdded: "2024-07-30",
      favorite: false,
      visits: 3,
      domain: "figma.com",
    },
    {
      id: "7",
      title: "Stack Overflow: Async/Await vs Promises",
      url: "https://stackoverflow.com/questions/34960886/are-there-still-reasons-to-use-promise-libraries",
      description:
        "Discussion on when to use async/await vs traditional promises",
      category: "Reference",
      type: "stackoverflow",
      tags: ["javascript", "async", "promises", "best-practices"],
      dateAdded: "2024-07-28",
      lastVisited: "2024-08-01",
      favorite: false,
      visits: 6,
      domain: "stackoverflow.com",
    },
    {
      id: "8",
      title: "CSS Tricks - Complete Guide to Flexbox",
      url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/",
      description: "Visual guide to all flexbox properties with examples",
      category: "Reference",
      type: "article",
      tags: ["css", "flexbox", "layout", "guide"],
      dateAdded: "2024-07-25",
      favorite: true,
      visits: 18,
      domain: "css-tricks.com",
      notes:
        "Great visual examples. Reference for justify-content vs align-items.",
    },
    {
      id: "9",
      title: "React Testing Library Docs",
      url: "https://testing-library.com/docs/react-testing-library/intro",
      description: "Official documentation for React Testing Library",
      category: "Learning",
      type: "documentation",
      tags: ["react", "testing", "documentation", "library"],
      dateAdded: "2024-07-20",
      favorite: false,
      visits: 9,
      domain: "testing-library.com",
    },
    {
      id: "10",
      title: "JavaScript Visualized - Event Loop",
      url: "https://dev.to/lydiahallie/javascript-visualized-event-loop-3dif",
      description:
        "Visual explanation of JavaScript event loop with animations",
      category: "Learning",
      type: "article",
      tags: ["javascript", "event-loop", "visualization", "concepts"],
      dateAdded: "2024-07-15",
      lastVisited: "2024-07-22",
      favorite: true,
      visits: 14,
      domain: "dev.to",
      notes: "Amazing visualizations! Share with junior developers.",
    },
  ]);

  const [folders, setFolders] = useState<Folder[]>([
    {
      id: "react-resources",
      name: "React Resources",
      description: "Everything React related",
      color: "bg-blue-100 text-blue-800",
      bookmarkIds: ["1", "3", "9"],
    },
    {
      id: "css-layout",
      name: "CSS & Layout",
      description: "CSS tricks and layout techniques",
      color: "bg-purple-100 text-purple-800",
      bookmarkIds: ["2", "4", "8"],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedFolder, setSelectedFolder] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("dateAdded");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBookmark, setEditingBookmark] = useState<BookmarkItem | null>(
    null
  );
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    description: "",
    category: "Learning",
    type: "website" as BookmarkItem["type"],
    tags: "",
    notes: "",
  });

  const categories = [
    "all",
    ...Array.from(new Set(bookmarks.map((b) => b.category))),
  ];
  const types = [
    "all",
    "website",
    "article",
    "stackoverflow",
    "github",
    "documentation",
    "tool",
    "video",
  ];

  const getTypeIcon = (type: string) => {
    const icons = {
      website: <Globe className="w-4 h-4" />,
      article: <BookOpen className="w-4 h-4" />,
      stackoverflow: <MessageSquare className="w-4 h-4" />,
      github: <Code className="w-4 h-4" />,
      documentation: <BookOpen className="w-4 h-4" />,
      tool: <Link2 className="w-4 h-4" />,
      video: <Eye className="w-4 h-4" />,
    };
    return icons[type as keyof typeof icons] || <Globe className="w-4 h-4" />;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      website: "bg-blue-100 text-blue-800",
      article: "bg-green-100 text-green-800",
      stackoverflow: "bg-orange-100 text-orange-800",
      github: "bg-gray-100 text-gray-800",
      documentation: "bg-purple-100 text-purple-800",
      tool: "bg-yellow-100 text-yellow-800",
      video: "bg-red-100 text-red-800",
    };
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  let filteredBookmarks = bookmarks.filter((bookmark) => {
    const matchesSearch =
      bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bookmark.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bookmark.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      bookmark.domain.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || bookmark.category === selectedCategory;
    const matchesType =
      selectedType === "all" || bookmark.type === selectedType;

    let matchesFolder = true;
    if (selectedFolder !== "all") {
      const folder = folders.find((f) => f.id === selectedFolder);
      matchesFolder = folder ? folder.bookmarkIds.includes(bookmark.id) : false;
    }

    return matchesSearch && matchesCategory && matchesType && matchesFolder;
  });

  // Sort bookmarks
  filteredBookmarks = [...filteredBookmarks].sort((a, b) => {
    switch (sortBy) {
      case "title":
        return a.title.localeCompare(b.title);
      case "dateAdded":
        return (
          new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
        );
      case "lastVisited":
        if (!a.lastVisited && !b.lastVisited) return 0;
        if (!a.lastVisited) return 1;
        if (!b.lastVisited) return -1;
        return (
          new Date(b.lastVisited).getTime() - new Date(a.lastVisited).getTime()
        );
      case "visits":
        return b.visits - a.visits;
      case "domain":
        return a.domain.localeCompare(b.domain);
      default:
        return 0;
    }
  });

  const favoriteBookmarks = bookmarks.filter((b) => b.favorite);

  const toggleFavorite = (bookmarkId: string) => {
    setBookmarks((prev) =>
      prev.map((b) =>
        b.id === bookmarkId ? { ...b, favorite: !b.favorite } : b
      )
    );
  };

  const handleEdit = (bookmark: BookmarkItem) => {
    setEditingBookmark(bookmark);
    setFormData({
      title: bookmark.title,
      url: bookmark.url,
      description: bookmark.description,
      category: bookmark.category,
      type: bookmark.type,
      tags: bookmark.tags.join(", "),
      notes: bookmark.notes || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (bookmarkId: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== bookmarkId));
  };

  const handleSubmit = () => {
    const bookmark: BookmarkItem = {
      id: editingBookmark?.id || Date.now().toString(),
      title: formData.title,
      url: formData.url,
      description: formData.description,
      category: formData.category,
      type: formData.type,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      dateAdded:
        editingBookmark?.dateAdded || new Date().toISOString().split("T")[0],
      lastVisited: editingBookmark?.lastVisited,
      favorite: editingBookmark?.favorite || false,
      visits: editingBookmark?.visits || 0,
      domain: new URL(formData.url).hostname,
      notes: formData.notes,
    };

    if (editingBookmark) {
      setBookmarks((prev) =>
        prev.map((b) => (b.id === editingBookmark.id ? bookmark : b))
      );
    } else {
      setBookmarks((prev) => [bookmark, ...prev]);
    }

    setIsDialogOpen(false);
    setEditingBookmark(null);
    setFormData({
      title: "",
      url: "",
      description: "",
      category: "Learning",
      type: "website",
      tags: "",
      notes: "",
    });
  };

  const openNewBookmarkDialog = () => {
    setEditingBookmark(null);
    setFormData({
      title: "",
      url: "",
      description: "",
      category: "Learning",
      type: "website",
      tags: "",
      notes: "",
    });
    setIsDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleCopyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const BookmarkCard: React.FC<{ bookmark: BookmarkItem }> = ({ bookmark }) => (
    <Card className="hover:shadow-lg transition-all duration-200 border-0 shadow-md h-full group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="flex-shrink-0 mt-1">
              <Avatar className="w-8 h-8 bg-gray-100">
                <AvatarFallback className="text-xs">
                  {bookmark.domain.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
                {bookmark.title}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <Badge className={`text-xs ${getTypeColor(bookmark.type)}`}>
                  <div className="flex items-center gap-1">
                    {getTypeIcon(bookmark.type)}
                    <span className="capitalize">{bookmark.type}</span>
                  </div>
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {bookmark.category}
                </Badge>
              </div>
              <p className="text-xs text-gray-500 mt-1 truncate">
                {bookmark.domain}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleFavorite(bookmark.id)}
            className="flex-shrink-0"
          >
            <Star
              className={`w-4 h-4 ${
                bookmark.favorite
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-400"
              }`}
            />
          </Button>
        </div>
        <CardDescription className="text-sm leading-relaxed line-clamp-2">
          {bookmark.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-1">
          {bookmark.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              <Tag className="w-2 h-2 mr-1" />
              {tag}
            </Badge>
          ))}
          {bookmark.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{bookmark.tags.length - 3}
            </Badge>
          )}
        </div>

        {bookmark.notes && (
          <div className="bg-blue-50 p-2 rounded-lg">
            <p className="text-xs text-blue-800 line-clamp-2">
              {bookmark.notes}
            </p>
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(bookmark.dateAdded)}
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {bookmark.visits}
            </div>
          </div>
          {bookmark.lastVisited && (
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatDate(bookmark.lastVisited)}
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            size="sm"
            className="flex-1 text-xs"
            onClick={() => window.open(bookmark.url, "_blank")}
          >
            Visit
            <ExternalLink className="w-3 h-3 ml-1" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleCopyUrl(bookmark.url)}
            className="text-xs"
          >
            <Copy className="w-3 h-3" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleEdit(bookmark)}
            className="text-xs"
          >
            <Edit className="w-3 h-3" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleDelete(bookmark.id)}
            className="text-xs text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const BookmarkListItem: React.FC<{ bookmark: BookmarkItem }> = ({
    bookmark,
  }) => (
    <Card className="hover:shadow-md transition-all duration-200">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <Avatar className="w-10 h-10 bg-gray-100">
            <AvatarFallback className="text-sm">
              {bookmark.domain.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3
                className="font-semibold text-gray-900 truncate hover:text-blue-600 transition-colors cursor-pointer"
                onClick={() => window.open(bookmark.url, "_blank")}
              >
                {bookmark.title}
              </h3>
              <Badge className={`text-xs ${getTypeColor(bookmark.type)}`}>
                {getTypeIcon(bookmark.type)}
                <span className="ml-1 capitalize">{bookmark.type}</span>
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleFavorite(bookmark.id)}
                className="ml-auto"
              >
                <Star
                  className={`w-4 h-4 ${
                    bookmark.favorite
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-400"
                  }`}
                />
              </Button>
            </div>

            <p className="text-sm text-gray-600 mb-2 line-clamp-1">
              {bookmark.description}
            </p>
            <p className="text-xs text-gray-500 mb-2">{bookmark.domain}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(bookmark.dateAdded)}
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {bookmark.visits} visits
                </div>
                {bookmark.lastVisited && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Last: {formatDate(bookmark.lastVisited)}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  className="text-xs"
                  onClick={() => window.open(bookmark.url, "_blank")}
                >
                  Visit
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(bookmark)}
                  className="text-xs"
                >
                  <Edit className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Bookmarks</h1>
            <p className="text-gray-600 mt-1">
              Save and organize your favorite websites, articles, and resources
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={openNewBookmarkDialog}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Bookmark
                </Button>
              </DialogTrigger>

              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingBookmark ? "Edit Bookmark" : "Add New Bookmark"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingBookmark
                      ? "Update your bookmark details"
                      : "Save a new bookmark to your collection"}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                        placeholder="Enter bookmark title"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        value={formData.category}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            category: e.target.value,
                          }))
                        }
                        placeholder="e.g. Learning, Tools, Reference"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="url">URL</Label>
                    <Input
                      id="url"
                      type="url"
                      value={formData.url}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          url: e.target.value,
                        }))
                      }
                      placeholder="https://example.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      placeholder="Brief description of the bookmark"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Type</Label>
                      <Select
                        value={formData.type}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            type: value as BookmarkItem["type"],
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {types
                            .filter((type) => type !== "all")
                            .map((type) => (
                              <SelectItem key={type} value={type}>
                                <div className="flex items-center gap-2">
                                  {getTypeIcon(type)}
                                  <span className="capitalize">{type}</span>
                                </div>
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tags">Tags (comma separated)</Label>
                      <Input
                        id="tags"
                        value={formData.tags}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            tags: e.target.value,
                          }))
                        }
                        placeholder="react, javascript, tutorial"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes (optional)</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          notes: e.target.value,
                        }))
                      }
                      placeholder="Any additional notes about this bookmark..."
                      className="min-h-[80px]"
                    />
                  </div>

                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="button" onClick={handleSubmit}>
                      {editingBookmark ? "Update" : "Add"} Bookmark
                    </Button>
                  </DialogFooter>
                </div>
              </DialogContent>
            </Dialog>

            <div className="flex items-center gap-1">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Folders Preview */}
        {folders.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <FolderOpen className="w-5 h-5" />
              Bookmark Folders
            </h3>
            <div className="flex gap-3 flex-wrap">
              {folders.map((folder) => (
                <Button
                  key={folder.id}
                  variant={selectedFolder === folder.id ? "default" : "outline"}
                  size="sm"
                  onClick={() =>
                    setSelectedFolder(
                      selectedFolder === folder.id ? "all" : folder.id
                    )
                  }
                  className="flex items-center gap-2"
                >
                  <div className={`w-3 h-3 rounded-full ${folder.color}`}></div>
                  <span>{folder.name}</span>
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {folder.bookmarkIds.length}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search bookmarks, URLs, tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      <div className="flex items-center gap-2">
                        {type !== "all" && getTypeIcon(type)}
                        <span>
                          {type === "all"
                            ? "All Types"
                            : type.charAt(0).toUpperCase() + type.slice(1)}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dateAdded">Recently Added</SelectItem>
                  <SelectItem value="lastVisited">Recently Visited</SelectItem>
                  <SelectItem value="title">Title A-Z</SelectItem>
                  <SelectItem value="visits">Most Visited</SelectItem>
                  <SelectItem value="domain">Domain</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:w-96">
            <TabsTrigger value="all">
              All Bookmarks ({filteredBookmarks.length})
            </TabsTrigger>
            <TabsTrigger value="favorites">
              <Star className="w-4 h-4 mr-1" />
              Favorites ({favoriteBookmarks.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6 mt-6">
            {filteredBookmarks.length === 0 ? (
              <Alert>
                <Bookmark className="h-4 w-4" />
                <AlertDescription>
                  No bookmarks found. Try adjusting your filters or add a new
                  bookmark.
                </AlertDescription>
              </Alert>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {filteredBookmarks.map((bookmark) =>
                  viewMode === "grid" ? (
                    <BookmarkCard key={bookmark.id} bookmark={bookmark} />
                  ) : (
                    <BookmarkListItem key={bookmark.id} bookmark={bookmark} />
                  )
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6 mt-6">
            {favoriteBookmarks.length === 0 ? (
              <Card className="p-8 text-center">
                <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No favorites yet
                </h3>
                <p className="text-gray-600">
                  Click the star icon on any bookmark to add it to your
                  favorites.
                </p>
              </Card>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {favoriteBookmarks.map((bookmark) =>
                  viewMode === "grid" ? (
                    <BookmarkCard key={bookmark.id} bookmark={bookmark} />
                  ) : (
                    <BookmarkListItem key={bookmark.id} bookmark={bookmark} />
                  )
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BookmarksPage;
