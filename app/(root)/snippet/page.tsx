"use client";

import React, { useState } from "react";
import {
  Search,
  Plus,
  Copy,
  Edit,
  Trash2,
  Code,
  Tag,
  Calendar,
  Star,
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

interface Snippet {
  id: string;
  title: string;
  description: string;
  code: string;
  language: string;
  tags: string[];
  createdAt: string;
  favorite: boolean;
}

const SnippetPage: React.FC = () => {
  const [snippets, setSnippets] = useState<Snippet[]>([
    {
      id: "1",
      title: "React useState Hook",
      description: "Basic useState implementation for state management",
      code: `const [count, setCount] = useState(0);

const increment = () => {
  setCount(prev => prev + 1);
};`,
      language: "javascript",
      tags: ["react", "hooks", "state"],
      createdAt: "2024-01-15",
      favorite: true,
    },
    {
      id: "2",
      title: "CSS Flexbox Center",
      description: "Perfect centering with flexbox",
      code: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}`,
      language: "css",
      tags: ["css", "flexbox", "layout"],
      createdAt: "2024-01-14",
      favorite: false,
    },
    {
      id: "3",
      title: "Python List Comprehension",
      description: "Filter and transform lists efficiently",
      code: `# Filter even numbers and square them
squares = [x**2 for x in range(10) if x % 2 == 0]
print(squares)  # [0, 4, 16, 36, 64]`,
      language: "python",
      tags: ["python", "list-comprehension", "functional"],
      createdAt: "2024-01-13",
      favorite: true,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState<Snippet | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    code: "",
    language: "javascript",
    tags: "",
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const languages = [
    "all",
    "javascript",
    "typescript",
    "python",
    "css",
    "html",
    "java",
    "go",
    "rust",
  ];

  const filteredSnippets = snippets.filter((snippet) => {
    const matchesSearch =
      snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesLanguage =
      selectedLanguage === "all" || snippet.language === selectedLanguage;

    const matchesTab =
      activeTab === "all" || (activeTab === "favorites" && snippet.favorite);

    return matchesSearch && matchesLanguage && matchesTab;
  });

  const handleCopy = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleEdit = (snippet: Snippet) => {
    setEditingSnippet(snippet);
    setFormData({
      title: snippet.title,
      description: snippet.description,
      code: snippet.code,
      language: snippet.language,
      tags: snippet.tags.join(", "),
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setSnippets((prev) => prev.filter((s) => s.id !== id));
  };

  const toggleFavorite = (id: string) => {
    setSnippets((prev) =>
      prev.map((s) => (s.id === id ? { ...s, favorite: !s.favorite } : s))
    );
  };

  const handleSubmit = () => {
    const snippet: Snippet = {
      id: editingSnippet?.id || Date.now().toString(),
      title: formData.title,
      description: formData.description,
      code: formData.code,
      language: formData.language,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      createdAt:
        editingSnippet?.createdAt || new Date().toISOString().split("T")[0],
      favorite: editingSnippet?.favorite || false,
    };

    if (editingSnippet) {
      setSnippets((prev) =>
        prev.map((s) => (s.id === editingSnippet.id ? snippet : s))
      );
    } else {
      setSnippets((prev) => [snippet, ...prev]);
    }

    setIsDialogOpen(false);
    setEditingSnippet(null);
    setFormData({
      title: "",
      description: "",
      code: "",
      language: "javascript",
      tags: "",
    });
  };

  const openNewSnippetDialog = () => {
    setEditingSnippet(null);
    setFormData({
      title: "",
      description: "",
      code: "",
      language: "javascript",
      tags: "",
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Code Snippets</h1>
            <p className="text-gray-600 mt-1">
              Organize and manage your code snippets
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={openNewSnippetDialog}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Snippet
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingSnippet ? "Edit Snippet" : "Create New Snippet"}
                </DialogTitle>
                <DialogDescription>
                  {editingSnippet
                    ? "Update your code snippet"
                    : "Add a new code snippet to your collection"}
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
                      placeholder="Enter snippet title"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select
                      value={formData.language}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, language: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {languages
                          .filter((lang) => lang !== "all")
                          .map((lang) => (
                            <SelectItem key={lang} value={lang}>
                              {lang.charAt(0).toUpperCase() + lang.slice(1)}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
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
                    placeholder="Brief description of the snippet"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, tags: e.target.value }))
                    }
                    placeholder="react, hooks, state"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="code">Code</Label>
                  <Textarea
                    id="code"
                    value={formData.code}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, code: e.target.value }))
                    }
                    placeholder="Paste your code here..."
                    className="font-mono text-sm min-h-[200px]"
                    required
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
                    {editingSnippet ? "Update" : "Create"} Snippet
                  </Button>
                </DialogFooter>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search snippets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang === "all"
                    ? "All Languages"
                    : lang.charAt(0).toUpperCase() + lang.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">
              All Snippets ({snippets.length})
            </TabsTrigger>
            <TabsTrigger value="favorites">
              <Star className="w-4 h-4 mr-1" />
              Favorites ({snippets.filter((s) => s.favorite).length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {filteredSnippets.length === 0 ? (
              <Alert>
                <Code className="h-4 w-4" />
                <AlertDescription>
                  No snippets found. Try adjusting your filters or create a new
                  snippet.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredSnippets.map((snippet) => (
                  <Card
                    key={snippet.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">
                            {snippet.title}
                          </CardTitle>
                          <CardDescription className="mt-1">
                            {snippet.description}
                          </CardDescription>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFavorite(snippet.id)}
                          className="ml-2"
                        >
                          <Star
                            className={`w-4 h-4 ${
                              snippet.favorite
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-400"
                            }`}
                          />
                        </Button>
                      </div>

                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className="text-xs">
                          {snippet.language}
                        </Badge>
                        <div className="flex items-center text-xs text-gray-500 gap-1">
                          <Calendar className="w-3 h-3" />
                          {snippet.createdAt}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="bg-gray-900 rounded-lg p-4 relative group">
                        <pre className="text-sm text-gray-100 overflow-x-auto">
                          <code>{snippet.code}</code>
                        </pre>

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleCopy(snippet.code, snippet.id)}
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-100"
                        >
                          {copiedId === snippet.id ? (
                            <span className="text-green-400 text-xs">
                              Copied!
                            </span>
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {snippet.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs"
                          >
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(snippet)}
                          className="flex-1"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(snippet.id)}
                          className="text-red-600 hover:text-red-700 hover:border-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SnippetPage;
