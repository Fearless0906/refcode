"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Copy,
  Star,
  Edit,
  Trash2,
  Code2,
  Database,
  Globe,
  Cpu,
  BookOpen,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CreateCheatSheet from "@/components/CreateCheatSheet";
import { useAuth } from "@/lib/contexts/auth-context";
import {
  getCheatSheetById,
  toggleFavorite,
  deleteCheatSheet,
} from "@/lib/supabase/cheatsheets";
import { CheatSheet, CheatSheetItem } from "@/types/type";

const CheatSheetDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [cheatSheet, setCheatSheet] = useState<CheatSheet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [editingCheatSheet, setEditingCheatSheet] = useState<CheatSheet | null>(
    null
  );

  const cheatSheetId = params.id as string;

  useEffect(() => {
    if (user && cheatSheetId) {
      loadCheatSheet();
    }
  }, [user, cheatSheetId]);

  const loadCheatSheet = async () => {
    if (!user || !cheatSheetId) return;

    try {
      setIsLoading(true);
      setError(null);
      const sheet = await getCheatSheetById(cheatSheetId, user.id);
      setCheatSheet(sheet);
    } catch (error) {
      console.error("Error loading cheat sheet:", error);
      setError(
        "Failed to load cheat sheet. Please check your connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheatSheetUpdated = (updatedCheatSheet: CheatSheet) => {
    setCheatSheet(updatedCheatSheet);
    setEditingCheatSheet(null);
    setError(null);
  };

  const handleToggleFavorite = async () => {
    if (!user || !cheatSheet) return;

    try {
      await toggleFavorite(cheatSheet.id, user.id);
      setCheatSheet({ ...cheatSheet, favorite: !cheatSheet.favorite });
    } catch (error) {
      console.error("Error toggling favorite:", error);
      setError("Failed to update favorite status. Please try again.");
    }
  };

  const handleDeleteCheatSheet = async () => {
    if (!user || !cheatSheet) return;

    if (
      confirm(
        "Are you sure you want to delete this cheat sheet? This action cannot be undone."
      )
    ) {
      try {
        await deleteCheatSheet(cheatSheet.id, user.id);
        router.push("/cheatsheet");
      } catch (error) {
        console.error("Error deleting cheat sheet:", error);
        setError("Error deleting cheat sheet. Please try again.");
      }
    }
  };

  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      code: <Code2 className="w-6 h-6" />,
      database: <Database className="w-6 h-6" />,
      globe: <Globe className="w-6 h-6" />,
      cpu: <Cpu className="w-6 h-6" />,
      "book-open": <BookOpen className="w-6 h-6" />,
      zap: <Star className="w-6 h-6" />,
      shield: <Star className="w-6 h-6" />,
      cloud: <Globe className="w-6 h-6" />,
    };
    return iconMap[iconName] || <Code2 className="w-6 h-6" />;
  };

  const handleCopy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const groupItemsByCategory = (items: CheatSheetItem[]) => {
    return items.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {} as Record<string, CheatSheetItem[]>);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="w-full mx-auto text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Please log in to access cheat sheets
          </h1>
          <p className="text-gray-600">
            You need to be authenticated to view cheat sheets.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="w-full mx-auto text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading cheat sheet...</p>
        </div>
      </div>
    );
  }

  if (error || !cheatSheet) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="w-full mx-auto">
          <Button
            variant="outline"
            onClick={() => router.push("/cheatsheet")}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cheat Sheets
          </Button>

          <Card className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Unable to load cheat sheet
            </h3>
            <p className="text-gray-600 mb-4">
              {error ||
                "The cheat sheet you're looking for doesn't exist or you don't have access to it."}
            </p>
            <Button onClick={loadCheatSheet} className="mx-auto">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => router.push("/cheatsheet")}
              className="shrink-0"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
                {getIconComponent(cheatSheet.icon)}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {cheatSheet.name}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-sm">
                    {cheatSheet.category}
                  </Badge>
                  {cheatSheet.favorite && (
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleToggleFavorite}
              className={
                cheatSheet.favorite ? "bg-yellow-50 border-yellow-200" : ""
              }
            >
              <Star
                className={`w-4 h-4 mr-2 ${
                  cheatSheet.favorite
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-400"
                }`}
              />
              {cheatSheet.favorite ? "Favorited" : "Favorite"}
            </Button>

            <Button
              variant="outline"
              onClick={() => setEditingCheatSheet(cheatSheet)}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>

            <Button
              variant="outline"
              onClick={handleDeleteCheatSheet}
              className="text-red-500 hover:text-red-700 border-red-200"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>

        {/* Description */}
        {cheatSheet.description && (
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-700 text-lg leading-relaxed">
                {cheatSheet.description}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Code Examples */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Code Examples & Items</CardTitle>
            <CardDescription>
              {cheatSheet.items?.length || 0} code examples organized by
              category
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {cheatSheet.items && cheatSheet.items.length > 0 ? (
              <ScrollArea className="h-[calc(100vh-400px)]">
                <div className="p-6 space-y-8">
                  {Object.entries(groupItemsByCategory(cheatSheet.items)).map(
                    ([category, items], categoryIndex) => (
                      <div key={category}>
                        <div className="flex items-center gap-3 mb-4">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {category}
                          </h3>
                          <Badge variant="secondary" className="text-xs">
                            {items.length}{" "}
                            {items.length === 1 ? "item" : "items"}
                          </Badge>
                        </div>

                        <div className="space-y-4">
                          {items.map((item, itemIndex) => (
                            <div
                              key={item.id}
                              className="border rounded-lg p-4 bg-white hover:shadow-md transition-shadow"
                            >
                              <div className="mb-3">
                                <h4 className="font-semibold text-gray-900 text-lg mb-1">
                                  {item.title}
                                </h4>
                                {item.description && (
                                  <p className="text-gray-600 text-sm leading-relaxed">
                                    {item.description}
                                  </p>
                                )}
                              </div>

                              <div className="bg-gray-900 rounded-lg p-4 relative group">
                                <pre className="text-sm text-gray-100 overflow-x-auto">
                                  <code>{item.code}</code>
                                </pre>

                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleCopy(item.code)}
                                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-100 bg-gray-800/50 hover:bg-gray-700/50"
                                >
                                  {copiedCode === item.code ? (
                                    <span className="text-green-400 text-xs">
                                      Copied!
                                    </span>
                                  ) : (
                                    <Copy className="w-4 h-4" />
                                  )}
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>

                        {categoryIndex <
                          Object.keys(
                            groupItemsByCategory(cheatSheet.items || [])
                          ).length -
                            1 && <Separator className="my-6" />}
                      </div>
                    )
                  )}
                </div>
              </ScrollArea>
            ) : (
              <div className="p-8 text-center text-gray-500">
                <Code2 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No items added to this cheat sheet yet.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Edit Dialog */}
      {editingCheatSheet && (
        <Dialog
          open={!!editingCheatSheet}
          onOpenChange={() => setEditingCheatSheet(null)}
        >
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Cheat Sheet</DialogTitle>
              <DialogDescription>
                Update your cheat sheet information and items.
              </DialogDescription>
            </DialogHeader>
            <CreateCheatSheet
              onCheatSheetCreated={() => {}} // Not used for editing
              onCheatSheetUpdated={handleCheatSheetUpdated}
              editCheatSheet={editingCheatSheet}
              userId={user.id}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CheatSheetDetailPage;
