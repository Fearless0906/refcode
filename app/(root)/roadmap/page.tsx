"use client";

import { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Calendar,
  Clock,
  CheckCircle2,
  MoreVertical,
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
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: "low" | "medium" | "high";
  progress: number;
  dueDate?: string;
  completed: boolean;
}

const categories = [
  "Web Development",
  "Data Science",
  "Mobile Apps",
  "DevOps",
  "Other",
];
const priorities: Goal["priority"][] = ["high", "medium", "low"];

export default function RoadmapPage() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      title: "Master TypeScript",
      description: "Complete advanced TypeScript course and build 2 projects.",
      category: "Web Development",
      priority: "high",
      progress: 60,
      dueDate: "2025-09-15",
      completed: false,
    },
    {
      id: "2",
      title: "Learn Next.js 15",
      description:
        "Explore new features of Next.js 15 and migrate portfolio site.",
      category: "Web Development",
      priority: "medium",
      progress: 20,
      dueDate: "2025-10-01",
      completed: false,
    },
    {
      id: "3",
      title: "Learn Next.js 15",
      description:
        "Explore new features of Next.js 15 and migrate portfolio site.",
      category: "Web Development",
      priority: "medium",
      progress: 20,
      dueDate: "2025-10-01",
      completed: false,
    },
    {
      id: "4",
      title: "Learn Next.js 15",
      description:
        "Explore new features of Next.js 15 and migrate portfolio site.",
      category: "Web Development",
      priority: "medium",
      progress: 20,
      dueDate: "2025-10-01",
      completed: false,
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: categories[0],
    priority: "medium" as Goal["priority"],
    dueDate: "",
    progress: 0,
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: categories[0],
      priority: "medium",
      dueDate: "",
      progress: 0,
    });
    setEditingGoal(null);
  };

  const handleSave = () => {
    if (editingGoal) {
      setGoals((prev) =>
        prev.map((g) => (g.id === editingGoal.id ? { ...g, ...formData } : g))
      );
    } else {
      setGoals((prev) => [
        {
          id: Date.now().toString(),
          ...formData,
          completed: false,
        },
        ...prev,
      ]);
    }
    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  const toggleComplete = (id: string) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, completed: !g.completed } : g))
    );
  };

  const getPriorityColor = (priority: Goal["priority"]) => {
    const colors = {
      high: "bg-red-100 text-red-800 border-red-200",
      medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
      low: "bg-green-100 text-green-800 border-green-200",
    };
    return colors[priority];
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Roadmap & To-Do
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your coding goals and learning plans
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  resetForm();
                  setIsDialogOpen(true);
                }}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" /> New Goal
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>
                  {editingGoal ? "Edit Goal" : "Add New Goal"}
                </DialogTitle>
                <DialogDescription>
                  Define your learning or project milestone.
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
                    placeholder="Learn Rust"
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
                    placeholder="Briefly describe your goal..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, category: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select
                      value={formData.priority}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          priority: value as Goal["priority"],
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {priorities.map((pri) => (
                          <SelectItem key={pri} value={pri}>
                            {pri.charAt(0).toUpperCase() + pri.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        dueDate: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="progress">Progress (%)</Label>
                  <Input
                    id="progress"
                    type="number"
                    value={formData.progress}
                    min={0}
                    max={100}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        progress: Number(e.target.value),
                      }))
                    }
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
                  {editingGoal ? "Save Changes" : "Add Goal"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Goals Grid */}
        <div className="grid gap-6 sm:grid-cols-3">
          {goals.map((goal) => (
            <Card key={goal.id} className="hover:shadow-lg transition-all">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {goal.completed && (
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      )}
                      {goal.title}
                    </CardTitle>
                    <CardDescription>{goal.category}</CardDescription>
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
                          setEditingGoal(goal);
                          setFormData(goal);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Edit className="w-4 h-4 mr-2" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toggleComplete(goal.id)}>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        {goal.completed ? "Mark Incomplete" : "Mark Complete"}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDelete(goal.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-700">{goal.description}</p>
                <div className="flex gap-2">
                  <Badge
                    variant="outline"
                    className={`text-xs ${getPriorityColor(goal.priority)}`}
                  >
                    {goal.priority.toUpperCase()} PRIORITY
                  </Badge>
                  {goal.dueDate && (
                    <div className="flex items-center text-xs text-gray-500 gap-1">
                      <Calendar className="w-3 h-3" /> {goal.dueDate}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Progress</span>
                    <span>{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
          {goals.length === 0 && (
            <p className="text-gray-500 text-sm col-span-full">
              No goals yet. Add your first one!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
