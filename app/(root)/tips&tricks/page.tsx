"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Search, MoreVertical, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Tip {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

export default function TipsAndTricksPage() {
  const [tips, setTips] = useState<Tip[]>([
    {
      id: "1",
      title: "Quick Commit & Push in Git",
      description:
        "Use `git commit -am 'msg' && git push` to commit and push changes in one command.",
      tags: ["Git", "CLI"],
    },
    {
      id: "2",
      title: "Center with CSS Grid",
      description:
        "Use `place-items: center;` to center content both vertically and horizontally.",
      tags: ["CSS", "Layout"],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTip, setEditingTip] = useState<Tip | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
  });

  const resetForm = () => {
    setFormData({ title: "", description: "", tags: "" });
    setEditingTip(null);
  };

  const handleSave = () => {
    const newTags = formData.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    if (editingTip) {
      setTips((prev) =>
        prev.map((t) =>
          t.id === editingTip.id ? { ...t, ...formData, tags: newTags } : t
        )
      );
    } else {
      setTips((prev) => [
        { id: Date.now().toString(), ...formData, tags: newTags },
        ...prev,
      ]);
    }
    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    setTips((prev) => prev.filter((t) => t.id !== id));
  };

  const filteredTips = tips.filter(
    (t) =>
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tips & Tricks</h1>
            <p className="text-gray-600 mt-1">
              Store quick dev hacks, shortcuts, and best practices
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  resetForm();
                  setIsDialogOpen(true);
                }}
              >
                <Plus className="w-4 h-4 mr-2" /> New Tip
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>
                  {editingTip ? "Edit Tip" : "Add New Tip"}
                </DialogTitle>
                <DialogDescription>
                  Save a new development hack or best practice.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
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
                    placeholder="e.g., Center with Flexbox"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Describe the trick or hack..."
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
                    placeholder="CSS, JavaScript, Git"
                  />
                </div>
              </div>
              <DialogFooter className="mt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={handleSave}
                >
                  {editingTip ? "Save Changes" : "Add Tip"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="flex items-center bg-white rounded-lg border px-3 py-2 w-full sm:max-w-xs">
          <Search className="w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search tips..."
            className="border-0 focus-visible:ring-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Tips Grid */}
        <div className="grid gap-6 sm:grid-cols-3">
          {filteredTips.map((tip) => (
            <Card key={tip.id} className="hover:shadow-lg transition-all">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{tip.title}</CardTitle>
                    <CardDescription>Developer Hack</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          setEditingTip(tip);
                          setFormData({
                            title: tip.title,
                            description: tip.description,
                            tags: tip.tags.join(", "),
                          });
                          setIsDialogOpen(true);
                        }}
                      >
                        <Edit className="w-4 h-4 mr-2" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDelete(tip.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-700">{tip.description}</p>
                <div className="flex flex-wrap gap-2">
                  {tip.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <Tag className="w-3 h-3" /> {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
          {filteredTips.length === 0 && (
            <p className="text-gray-500 text-sm col-span-full">
              No tips found. Try adding one!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
