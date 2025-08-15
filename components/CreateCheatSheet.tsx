"use client";

import React, { useState } from "react";
import { Plus, Save, Trash2, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheatSheet, CheatSheetItem } from "@/types/type";

interface CreateCheatSheetProps {
  onCheatSheetCreated: (cheatSheet: CheatSheet) => void;
  onCheatSheetUpdated?: (cheatSheet: CheatSheet) => void;
  editCheatSheet?: CheatSheet;
  userId: string;
}

const CreateCheatSheet: React.FC<CreateCheatSheetProps> = ({
  onCheatSheetCreated,
  onCheatSheetUpdated,
  editCheatSheet,
  userId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: editCheatSheet?.name || "",
    description: editCheatSheet?.description || "",
    category: editCheatSheet?.category || "Frontend",
    icon: editCheatSheet?.icon || "code",
  });
  const [items, setItems] = useState<
    Omit<CheatSheetItem, "id" | "cheatsheet_id" | "created_at">[]
  >(
    editCheatSheet?.items?.map((item) => ({
      title: item.title,
      description: item.description,
      code: item.code,
      category: item.category,
      order_index: item.order_index,
    })) || []
  );

  const categories = [
    "Frontend",
    "Backend",
    "Language",
    "Database",
    "DevOps",
    "Tools",
    "Other",
  ];

  const icons = [
    { value: "code", label: "Code" },
    { value: "database", label: "Database" },
    { value: "globe", label: "Web" },
    { value: "cpu", label: "System" },
    { value: "book-open", label: "Documentation" },
    { value: "zap", label: "Performance" },
    { value: "shield", label: "Security" },
    { value: "cloud", label: "Cloud" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (editCheatSheet) {
        // Update existing cheat sheet
        const updatedCheatSheet = await updateCheatSheet(
          editCheatSheet.id,
          {
            name: formData.name,
            description: formData.description,
            category: formData.category,
            icon: formData.icon,
          },
          userId
        );

        if (onCheatSheetUpdated) {
          onCheatSheetUpdated(updatedCheatSheet);
        }
      } else {
        // Create new cheat sheet
        const newCheatSheet = await createCheatSheet(
          {
            name: formData.name,
            description: formData.description,
            category: formData.category,
            icon: formData.icon,
            favorite: false,
            user_id: userId,
          },
          items
        );

        onCheatSheetCreated(newCheatSheet);
      }

      setIsOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error saving cheat sheet:", error);
      alert("Error saving cheat sheet. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      category: "Frontend",
      icon: "code",
    });
    setItems([]);
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        title: "",
        description: "",
        code: "",
        category: "General",
        order_index: items.length,
      },
    ]);
  };

  const updateItem = (
    index: number,
    field: keyof CheatSheetItem,
    value: string
  ) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const moveItem = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === items.length - 1)
    ) {
      return;
    }

    const newItems = [...items];
    const newIndex = direction === "up" ? index - 1 : index + 1;

    // Swap items
    [newItems[index], newItems[newIndex]] = [
      newItems[newIndex],
      newItems[index],
    ];

    // Update order_index
    newItems.forEach((item, i) => {
      item.order_index = i;
    });

    setItems(newItems);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          {editCheatSheet ? "Edit Cheat Sheet" : "Create Cheat Sheet"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editCheatSheet ? "Edit Cheat Sheet" : "Create New Cheat Sheet"}
          </DialogTitle>
          <DialogDescription>
            {editCheatSheet
              ? "Update your cheat sheet information and items."
              : "Create a new cheat sheet with code examples and explanations."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Set the name, description, and category for your cheat sheet.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g., React Hooks, JavaScript ES6"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Brief description of what this cheat sheet covers..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Icon</label>
                <Select
                  value={formData.icon}
                  onValueChange={(value) =>
                    setFormData({ ...formData, icon: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {icons.map((icon) => (
                      <SelectItem key={icon.value} value={icon.value}>
                        {icon.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Cheat Sheet Items */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Code Examples & Items</CardTitle>
                  <CardDescription>
                    Add code examples, explanations, and other items to your
                    cheat sheet.
                  </CardDescription>
                </div>
                <Button
                  type="button"
                  onClick={addItem}
                  variant="outline"
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Code2 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>
                    No items added yet. Click &quot;Add Item&quot; to get
                    started.
                  </p>
                </div>
              ) : (
                items.map((item, index) => (
                  <Card key={index} className="border-2">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">Item {index + 1}</Badge>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => moveItem(index, "up")}
                            disabled={index === 0}
                          >
                            ↑
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => moveItem(index, "down")}
                            disabled={index === items.length - 1}
                          >
                            ↓
                          </Button>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Title</label>
                          <Input
                            value={item.title}
                            onChange={(e) =>
                              updateItem(index, "title", e.target.value)
                            }
                            placeholder="e.g., useState Hook, Array Methods"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Category
                          </label>
                          <Input
                            value={item.category}
                            onChange={(e) =>
                              updateItem(index, "category", e.target.value)
                            }
                            placeholder="e.g., Hooks, Arrays, Functions"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Description
                        </label>
                        <Textarea
                          value={item.description}
                          onChange={(e) =>
                            updateItem(index, "description", e.target.value)
                          }
                          placeholder="Brief explanation of this code example..."
                          rows={2}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Code</label>
                        <Textarea
                          value={item.code}
                          onChange={(e) =>
                            updateItem(index, "code", e.target.value)
                          }
                          placeholder="Paste your code example here..."
                          rows={6}
                          className="font-mono text-sm"
                          required
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !formData.name || items.length === 0}
            >
              {isLoading ? (
                "Saving..."
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {editCheatSheet ? "Update Cheat Sheet" : "Create Cheat Sheet"}
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCheatSheet;
