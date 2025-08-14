"use client";

import React, { useState, useEffect } from "react";
import { Snippet } from "@/types/type";
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
  Loader2,
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
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, State } from "@/store/store";
import {
  createSnippet,
  updateSnippet,
  fetchSnippetList,
} from "@/slices/snippetSlice";
import { snippetService } from "@/services/snippetService";

const SnippetPage: React.FC = () => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const dispatch = useDispatch<Dispatch>();

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

  const {
    loading,
    error: snippetError,
    snippet: snippetList,
  } = useSelector((state: State) => state.snippet);
  const { user, token } = useSelector((state: State) => state.auth);

  // Filter snippets based on search, language, and tab
  const filteredSnippets = snippetList.filter((snippet) => {
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

  const handleDelete = async (id: string) => {
    try {
      // await snippetService.deleteSnippet(id);
      setSnippets((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      setLocalError("Failed to delete snippet");
      console.error("Error deleting snippet:", err);
    }
  };

  const toggleFavorite = async (id: string, currentFavorite: boolean) => {
    if (!user) return;

    try {
      // No toggleFavorite method in snippetService, using updateSnippet instead
      await snippetService.updateSnippet(token!, parseInt(id), {
        favorite: !currentFavorite,
      });
      setSnippets((prev) =>
        prev.map((s) => (s.id === id ? { ...s, favorite: !s.favorite } : s))
      );
    } catch (err) {
      setLocalError("Failed to update favorite status");
      console.error("Error toggling favorite:", err);
    }
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setLocalError("Title is required");
      return false;
    }
    if (!formData.code.trim()) {
      setLocalError("Code is required");
      return false;
    }
    if (!formData.description.trim()) {
      setLocalError("Description is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user || !token) {
      setLocalError("You must be logged in to create snippets");
      return;
    }
    if (isSubmitting) return; // Prevent multiple submissions
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      setLocalError(null);

      const snippetData: Omit<Snippet, "id" | "created_at"> = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        code: formData.code.trim(),
        language: formData.language,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        favorite: editingSnippet?.favorite || false,
        user_id: user.id.toString(),
      };

      let result;
      if (editingSnippet) {
        result = await dispatch(
          updateSnippet({
            token,
            id: parseInt(editingSnippet.id),
            snippet: snippetData,
          })
        ).unwrap();
      } else {
        result = await dispatch(
          createSnippet({
            token,
            snippet: snippetData,
          })
        ).unwrap();
      }

      if (result) {
        // Refresh the snippets list only after successful create/update
        await dispatch(fetchSnippetList(token));
        setIsDialogOpen(false);
        setEditingSnippet(null);
        setFormData({
          title: "",
          description: "",
          code: "",
          language: "javascript",
          tags: "",
        });
      }
    } catch (err) {
      setLocalError("Failed to save snippet");
      console.error("Error saving snippet:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const loadSnippets = () => {
    if (token) {
      dispatch(fetchSnippetList(token!));
    }
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

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading snippets...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (localError || snippetError) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="w-full mx-auto max-w-2xl">
          <Alert className="border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">
              {localError || snippetError}
            </AlertDescription>
          </Alert>
          <Button
            onClick={() => loadSnippets()}
            className="mt-4"
            variant="outline"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

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
            {snippets.length === 0 && (
              <p className="text-blue-600 mt-2 text-sm">
                ✨ Ready to start? Create your first snippet below!
              </p>
            )}
          </div>

          <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => {
              if (!isSubmitting) {
                setIsDialogOpen(open);
              }
            }}
          >
            <DialogTrigger asChild>
              <Button
                onClick={openNewSnippetDialog}
                className="bg-blue-600 hover:bg-blue-700"
                disabled={isSubmitting}
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

              {localError && (
                <Alert className="border-red-200 bg-red-50 mb-4">
                  <AlertDescription className="text-red-800">
                    {localError}
                  </AlertDescription>
                </Alert>
              )}

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
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select
                      value={formData.language}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, language: value }))
                      }
                      disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
                  />
                </div>

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {editingSnippet ? "Updating..." : "Creating..."}
                      </>
                    ) : (
                      `${editingSnippet ? "Update" : "Create"} Snippet`
                    )}
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
              <div className="text-center py-12">
                {snippets.length === 0 ? (
                  // No snippets at all - show create first snippet option
                  <div className="space-y-4">
                    <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                      <Code className="w-12 h-12 text-gray-400" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        No snippets yet
                      </h3>
                      <p className="text-gray-600 max-w-md mx-auto">
                        Start building your code collection by adding your first
                        snippet. Organize your favorite code examples,
                        solutions, and reusable components.
                      </p>
                    </div>
                    <Button
                      onClick={openNewSnippetDialog}
                      className="bg-blue-600 hover:bg-blue-700"
                      size="lg"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Create Your First Snippet
                    </Button>
                  </div>
                ) : (
                  // No snippets match the current filters
                  <Alert>
                    <Code className="h-4 w-4" />
                    <AlertDescription>
                      No snippets found matching your current filters. Try
                      adjusting your search terms, language selection, or create
                      a new snippet.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
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
                          onClick={() =>
                            toggleFavorite(snippet.id, snippet.favorite)
                          }
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
                          {new Date(snippet.created_at).toLocaleDateString()}
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
