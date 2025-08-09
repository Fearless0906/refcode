"use client";

import React, { useState } from "react";
import {
  Search,
  BookOpen,
  Code,
  Globe,
  Database,
  Smartphone,
  Cloud,
  Shield,
  Zap,
  ExternalLink,
  Star,
  Clock,
  Users,
  FileText,
  Bookmark,
  Filter,
  Grid,
  List,
  ChevronRight,
  Play,
  Download,
  Eye,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Documentation {
  id: string;
  title: string;
  description: string;
  category: string;
  type: "guide" | "api" | "tutorial" | "reference" | "video" | "pdf";
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: string;
  lastUpdated: string;
  author: string;
  tags: string[];
  favorite: boolean;
  views: number;
  url?: string;
  internal: boolean;
  featured: boolean;
}

const DocumentationHub: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("updated");
  const [favorites, setFavorites] = useState<string[]>([
    "react-hooks",
    "rest-api",
    "docker-guide",
  ]);

  const documentations: Documentation[] = [
    {
      id: "react-hooks",
      title: "Complete Guide to React Hooks",
      description:
        "Comprehensive documentation covering all React hooks with practical examples and best practices",
      category: "Frontend",
      type: "guide",
      difficulty: "intermediate",
      estimatedTime: "45 min",
      lastUpdated: "2024-08-05",
      author: "React Team",
      tags: ["react", "hooks", "javascript", "frontend"],
      favorite: true,
      views: 2847,
      internal: true,
      featured: true,
    },
    {
      id: "rest-api",
      title: "REST API Design Guidelines",
      description:
        "Best practices for designing scalable and maintainable REST APIs with authentication and error handling",
      category: "Backend",
      type: "reference",
      difficulty: "intermediate",
      estimatedTime: "30 min",
      lastUpdated: "2024-08-03",
      author: "API Team",
      tags: ["api", "rest", "backend", "http"],
      favorite: true,
      views: 1923,
      internal: true,
      featured: true,
    },
    {
      id: "docker-guide",
      title: "Docker Containerization Tutorial",
      description:
        "Step-by-step guide to containerizing applications with Docker, including multi-stage builds and orchestration",
      category: "DevOps",
      type: "tutorial",
      difficulty: "beginner",
      estimatedTime: "60 min",
      lastUpdated: "2024-08-01",
      author: "DevOps Team",
      tags: ["docker", "containers", "devops", "deployment"],
      favorite: true,
      views: 3156,
      internal: true,
      featured: false,
    },
    {
      id: "typescript-advanced",
      title: "Advanced TypeScript Patterns",
      description:
        "Deep dive into advanced TypeScript features including generics, conditional types, and utility types",
      category: "Language",
      type: "guide",
      difficulty: "advanced",
      estimatedTime: "90 min",
      lastUpdated: "2024-07-28",
      author: "Frontend Team",
      tags: ["typescript", "patterns", "types", "advanced"],
      favorite: false,
      views: 1567,
      internal: true,
      featured: false,
    },
    {
      id: "database-optimization",
      title: "Database Performance Optimization",
      description:
        "Techniques for optimizing database queries, indexing strategies, and performance monitoring",
      category: "Database",
      type: "reference",
      difficulty: "advanced",
      estimatedTime: "75 min",
      lastUpdated: "2024-07-25",
      author: "Database Team",
      tags: ["database", "optimization", "performance", "sql"],
      favorite: false,
      views: 892,
      internal: true,
      featured: false,
    },
    {
      id: "aws-deployment",
      title: "AWS Deployment Strategies",
      description:
        "Complete guide to deploying applications on AWS with CI/CD pipelines and infrastructure as code",
      category: "Cloud",
      type: "tutorial",
      difficulty: "intermediate",
      estimatedTime: "120 min",
      lastUpdated: "2024-07-20",
      author: "Cloud Team",
      tags: ["aws", "cloud", "deployment", "cicd"],
      favorite: false,
      views: 2341,
      internal: true,
      featured: true,
    },
    {
      id: "security-best-practices",
      title: "Web Security Best Practices",
      description:
        "Essential security practices for web applications including OWASP guidelines and vulnerability prevention",
      category: "Security",
      type: "guide",
      difficulty: "intermediate",
      estimatedTime: "50 min",
      lastUpdated: "2024-07-18",
      author: "Security Team",
      tags: ["security", "web", "owasp", "vulnerabilities"],
      favorite: false,
      views: 1678,
      internal: true,
      featured: false,
    },
    {
      id: "mobile-development",
      title: "React Native Development Guide",
      description:
        "Comprehensive guide to building cross-platform mobile apps with React Native and best practices",
      category: "Mobile",
      type: "guide",
      difficulty: "intermediate",
      estimatedTime: "95 min",
      lastUpdated: "2024-07-15",
      author: "Mobile Team",
      tags: ["react-native", "mobile", "cross-platform", "ios", "android"],
      favorite: false,
      views: 1234,
      internal: true,
      featured: false,
    },
    {
      id: "graphql-intro",
      title: "GraphQL API Introduction",
      description:
        "Learn GraphQL fundamentals, schema design, and implementation with real-world examples",
      category: "Backend",
      type: "tutorial",
      difficulty: "beginner",
      estimatedTime: "40 min",
      lastUpdated: "2024-07-10",
      author: "API Team",
      tags: ["graphql", "api", "backend", "schema"],
      favorite: false,
      views: 987,
      internal: true,
      featured: false,
    },
    {
      id: "testing-strategies",
      title: "Testing Strategies & Best Practices",
      description:
        "Complete testing guide covering unit tests, integration tests, e2e testing, and TDD methodologies",
      category: "Testing",
      type: "reference",
      difficulty: "intermediate",
      estimatedTime: "65 min",
      lastUpdated: "2024-07-05",
      author: "QA Team",
      tags: ["testing", "unit-tests", "e2e", "tdd", "quality"],
      favorite: false,
      views: 1456,
      internal: true,
      featured: false,
    },
  ];

  const categories = [
    "all",
    ...Array.from(new Set(documentations.map((doc) => doc.category))),
  ];
  const types = [
    "all",
    "guide",
    "api",
    "tutorial",
    "reference",
    "video",
    "pdf",
  ];
  const difficulties = ["all", "beginner", "intermediate", "advanced"];

  const getTypeIcon = (type: string) => {
    const icons = {
      guide: <BookOpen className="w-4 h-4" />,
      api: <Code className="w-4 h-4" />,
      tutorial: <Play className="w-4 h-4" />,
      reference: <FileText className="w-4 h-4" />,
      video: <Play className="w-4 h-4" />,
      pdf: <Download className="w-4 h-4" />,
    };
    return (
      icons[type as keyof typeof icons] || <FileText className="w-4 h-4" />
    );
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      Frontend: <Globe className="w-5 h-5" />,
      Backend: <Database className="w-5 h-5" />,
      DevOps: <Cloud className="w-5 h-5" />,
      Language: <Code className="w-5 h-5" />,
      Database: <Database className="w-5 h-5" />,
      Cloud: <Cloud className="w-5 h-5" />,
      Security: <Shield className="w-5 h-5" />,
      Mobile: <Smartphone className="w-5 h-5" />,
      Testing: <Zap className="w-5 h-5" />,
    };
    return (
      icons[category as keyof typeof icons] || <FileText className="w-5 h-5" />
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      beginner: "bg-green-100 text-green-800",
      intermediate: "bg-yellow-100 text-yellow-800",
      advanced: "bg-red-100 text-red-800",
    };
    return (
      colors[difficulty as keyof typeof colors] || "bg-gray-100 text-gray-800"
    );
  };

  let filteredDocs = documentations.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "all" || doc.category === selectedCategory;
    const matchesType = selectedType === "all" || doc.type === selectedType;
    const matchesDifficulty =
      selectedDifficulty === "all" || doc.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesType && matchesDifficulty;
  });

  // Sort documents
  filteredDocs = [...filteredDocs].sort((a, b) => {
    switch (sortBy) {
      case "title":
        return a.title.localeCompare(b.title);
      case "updated":
        return (
          new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
        );
      case "views":
        return b.views - a.views;
      case "difficulty":
        const difficultyOrder = { beginner: 0, intermediate: 1, advanced: 2 };
        return (
          difficultyOrder[a.difficulty as keyof typeof difficultyOrder] -
          difficultyOrder[b.difficulty as keyof typeof difficultyOrder]
        );
      default:
        return 0;
    }
  });

  const featuredDocs = documentations.filter((doc) => doc.featured);
  const favoriteDocs = documentations.filter((doc) =>
    favorites.includes(doc.id)
  );

  const toggleFavorite = (docId: string) => {
    setFavorites((prev) =>
      prev.includes(docId)
        ? prev.filter((id) => id !== docId)
        : [...prev, docId]
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const DocumentCard: React.FC<{ doc: Documentation }> = ({ doc }) => (
    <Card className="hover:shadow-lg transition-all duration-200 border-0 shadow-md h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div
              className={`p-2 rounded-lg ${
                doc.featured
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {getCategoryIcon(doc.category)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <CardTitle className="text-lg leading-tight">
                  {doc.title}
                </CardTitle>
                {doc.featured && (
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-800 text-xs"
                  >
                    Featured
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className="text-xs">
                  {doc.category}
                </Badge>
                <div className="flex items-center gap-1">
                  {getTypeIcon(doc.type)}
                  <span className="text-xs text-gray-600 capitalize">
                    {doc.type}
                  </span>
                </div>
                <Badge
                  className={`text-xs ${getDifficultyColor(doc.difficulty)}`}
                >
                  {doc.difficulty}
                </Badge>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleFavorite(doc.id)}
          >
            <Star
              className={`w-4 h-4 ${
                favorites.includes(doc.id)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-400"
              }`}
            />
          </Button>
        </div>
        <CardDescription className="text-sm leading-relaxed">
          {doc.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-1">
          {doc.tags.slice(0, 4).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {doc.tags.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{doc.tags.length - 4} more
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {doc.estimatedTime}
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {doc.views.toLocaleString()}
            </div>
          </div>
          <div className="text-xs">Updated {formatDate(doc.lastUpdated)}</div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarFallback className="text-xs bg-gray-200">
                {doc.author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-gray-600">{doc.author}</span>
          </div>

          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="text-xs">
              <Bookmark className="w-3 h-3 mr-1" />
              Save
            </Button>
            <Button size="sm" className="text-xs">
              Read
              <ChevronRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const DocumentListItem: React.FC<{ doc: Documentation }> = ({ doc }) => (
    <Card className="hover:shadow-md transition-all duration-200">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div
            className={`p-2 rounded-lg ${
              doc.featured
                ? "bg-blue-100 text-blue-600"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {getCategoryIcon(doc.category)}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-900 truncate">
                {doc.title}
              </h3>
              {doc.featured && (
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-800 text-xs"
                >
                  Featured
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleFavorite(doc.id)}
                className="ml-auto"
              >
                <Star
                  className={`w-4 h-4 ${
                    favorites.includes(doc.id)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-400"
                  }`}
                />
              </Button>
            </div>

            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              {doc.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  {getTypeIcon(doc.type)}
                  <span className="capitalize">{doc.type}</span>
                </div>
                <Badge
                  className={`text-xs ${getDifficultyColor(doc.difficulty)}`}
                >
                  {doc.difficulty}
                </Badge>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {doc.estimatedTime}
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {doc.views.toLocaleString()}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">
                  Updated {formatDate(doc.lastUpdated)}
                </span>
                <Button size="sm" className="text-xs">
                  Read
                  <ChevronRight className="w-3 h-3 ml-1" />
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
            <h1 className="text-3xl font-bold text-gray-900">
              Documentation Hub
            </h1>
            <p className="text-gray-600 mt-1">
              Centralized access to all your technical documentation and guides
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {filteredDocs.length} docs available
            </Badge>
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

        {/* Featured Section */}
        {featuredDocs.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <h2 className="text-xl font-semibold text-gray-900">
                Featured Documentation
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredDocs.slice(0, 3).map((doc) => (
                <DocumentCard key={doc.id} doc={doc} />
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
                placeholder="Search documentation, guides, tutorials..."
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
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type === "all"
                        ? "All Types"
                        : type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedDifficulty}
                onValueChange={setSelectedDifficulty}
              >
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map((difficulty) => (
                    <SelectItem key={difficulty} value={difficulty}>
                      {difficulty === "all"
                        ? "All Levels"
                        : difficulty.charAt(0).toUpperCase() +
                          difficulty.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="updated">Recently Updated</SelectItem>
                  <SelectItem value="title">Title A-Z</SelectItem>
                  <SelectItem value="views">Most Viewed</SelectItem>
                  <SelectItem value="difficulty">Difficulty</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:w-96">
            <TabsTrigger value="all">All Documentation</TabsTrigger>
            <TabsTrigger value="favorites">
              <Star className="w-4 h-4 mr-1" />
              My Favorites ({favorites.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6 mt-6">
            {filteredDocs.length === 0 ? (
              <Card className="p-8 text-center">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No documentation found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search terms or filters.
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
                {filteredDocs.map((doc) =>
                  viewMode === "grid" ? (
                    <DocumentCard key={doc.id} doc={doc} />
                  ) : (
                    <DocumentListItem key={doc.id} doc={doc} />
                  )
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6 mt-6">
            {favoriteDocs.length === 0 ? (
              <Card className="p-8 text-center">
                <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No favorites yet
                </h3>
                <p className="text-gray-600">
                  Click the star icon on any documentation to add it to your
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
                {favoriteDocs.map((doc) =>
                  viewMode === "grid" ? (
                    <DocumentCard key={doc.id} doc={doc} />
                  ) : (
                    <DocumentListItem key={doc.id} doc={doc} />
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

export default DocumentationHub;
