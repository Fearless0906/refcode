"use client";

import React, { useState } from "react";
import {
  Search,
  Plus,
  Github,
  ExternalLink,
  Star,
  Calendar,
  Clock,
  Code,
  Database,
  Globe,
  Smartphone,
  Cloud,
  Zap,
  Play,
  Pause,
  Archive,
  Edit,
  Trash2,
  GitBranch,
  Users,
  Activity,
  FileText,
  Folder,
  Tag,
  Filter,
  Grid,
  List,
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

interface Project {
  id: string;
  name: string;
  description: string;
  status: "active" | "completed" | "paused" | "archived";
  priority: "low" | "medium" | "high";
  category: string;
  tech: string[];
  progress: number;
  startDate: string;
  endDate?: string;
  lastActive: string;
  repository?: {
    url: string;
    platform: "github" | "gitlab" | "bitbucket";
    private: boolean;
    stars?: number;
    forks?: number;
    commits?: number;
    branches?: number;
  };
  liveUrl?: string;
  notes: string;
  tasks: {
    total: number;
    completed: number;
  };
  collaborators?: string[];
  favorite: boolean;
}

const ProjectsDashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with React, Node.js, and MongoDB",
      status: "active",
      priority: "high",
      category: "Web Development",
      tech: ["React", "Node.js", "MongoDB", "TypeScript", "Stripe"],
      progress: 75,
      startDate: "2024-06-15",
      lastActive: "2024-08-09",
      repository: {
        url: "https://github.com/user/ecommerce-platform",
        platform: "github",
        private: false,
        stars: 24,
        forks: 8,
        commits: 187,
        branches: 3,
      },
      liveUrl: "https://mystore.vercel.app",
      notes:
        "Need to implement payment gateway integration and optimize mobile performance. Consider adding PWA features.",
      tasks: { total: 32, completed: 24 },
      collaborators: ["Alice Johnson", "Bob Smith"],
      favorite: true,
    },
    {
      id: "2",
      name: "Task Management Mobile App",
      description: "React Native app for task and project management",
      status: "active",
      priority: "medium",
      category: "Mobile Development",
      tech: ["React Native", "Redux", "Firebase", "Expo"],
      progress: 45,
      startDate: "2024-07-01",
      lastActive: "2024-08-08",
      repository: {
        url: "https://github.com/user/task-manager-mobile",
        platform: "github",
        private: true,
        commits: 89,
        branches: 2,
      },
      notes:
        "Working on offline sync functionality. Need to implement push notifications next.",
      tasks: { total: 18, completed: 8 },
      favorite: false,
    },
    {
      id: "3",
      name: "Personal Portfolio Website",
      description: "Modern portfolio website with animations and dark mode",
      status: "completed",
      priority: "medium",
      category: "Web Development",
      tech: ["Next.js", "Tailwind CSS", "Framer Motion", "MDX"],
      progress: 100,
      startDate: "2024-05-01",
      endDate: "2024-06-10",
      lastActive: "2024-07-15",
      repository: {
        url: "https://github.com/user/portfolio",
        platform: "github",
        private: false,
        stars: 156,
        forks: 23,
        commits: 64,
        branches: 1,
      },
      liveUrl: "https://johndoe.dev",
      notes:
        "Portfolio is complete and live. Consider adding a blog section in the future.",
      tasks: { total: 12, completed: 12 },
      favorite: true,
    },
    {
      id: "4",
      name: "ML Data Pipeline",
      description:
        "Automated data processing pipeline for machine learning workflows",
      status: "paused",
      priority: "low",
      category: "Data Science",
      tech: ["Python", "Apache Airflow", "Docker", "AWS", "Pandas"],
      progress: 30,
      startDate: "2024-04-15",
      lastActive: "2024-07-20",
      repository: {
        url: "https://gitlab.com/user/ml-pipeline",
        platform: "gitlab",
        private: true,
        commits: 45,
        branches: 2,
      },
      notes:
        "Project paused due to priority changes. Resume when data science team expands.",
      tasks: { total: 25, completed: 7 },
      favorite: false,
    },
    {
      id: "5",
      name: "Weather Dashboard",
      description: "Real-time weather dashboard with interactive maps",
      status: "active",
      priority: "low",
      category: "Web Development",
      tech: ["Vue.js", "D3.js", "Weather API", "Leaflet"],
      progress: 60,
      startDate: "2024-07-20",
      lastActive: "2024-08-07",
      repository: {
        url: "https://github.com/user/weather-dashboard",
        platform: "github",
        private: false,
        stars: 12,
        forks: 3,
        commits: 42,
        branches: 2,
      },
      liveUrl: "https://weather-dash.netlify.app",
      notes: "Adding more weather data sources and improving map interactions.",
      tasks: { total: 15, completed: 9 },
      favorite: false,
    },
    {
      id: "6",
      name: "Cryptocurrency Tracker",
      description: "Real-time crypto portfolio tracker with alerts",
      status: "archived",
      priority: "low",
      category: "Finance",
      tech: ["React", "Chart.js", "CoinGecko API", "Web Sockets"],
      progress: 85,
      startDate: "2024-02-01",
      endDate: "2024-04-30",
      lastActive: "2024-05-15",
      repository: {
        url: "https://github.com/user/crypto-tracker",
        platform: "github",
        private: false,
        stars: 67,
        forks: 15,
        commits: 128,
        branches: 1,
      },
      notes:
        "Archived due to market changes. Code base is solid for future reference.",
      tasks: { total: 20, completed: 17 },
      favorite: false,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("lastActive");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "active" as Project["status"],
    priority: "medium" as Project["priority"],
    category: "",
    tech: "",
    repository: "",
    liveUrl: "",
    notes: "",
  });

  const statuses = ["all", "active", "completed", "paused", "archived"];
  const priorities = ["all", "high", "medium", "low"];
  const categories = [
    "all",
    ...Array.from(new Set(projects.map((p) => p.category))),
  ];

  const getStatusIcon = (status: string) => {
    const icons = {
      active: <Play className="w-4 h-4 text-green-600" />,
      completed: <Zap className="w-4 h-4 text-blue-600" />,
      paused: <Pause className="w-4 h-4 text-yellow-600" />,
      archived: <Archive className="w-4 h-4 text-gray-600" />,
    };
    return icons[status as keyof typeof icons];
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: "bg-green-100 text-green-800",
      completed: "bg-blue-100 text-blue-800",
      paused: "bg-yellow-100 text-yellow-800",
      archived: "bg-gray-100 text-gray-800",
    };
    return colors[status as keyof typeof colors];
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: "bg-red-100 text-red-800 border-red-200",
      medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
      low: "bg-green-100 text-green-800 border-green-200",
    };
    return colors[priority as keyof typeof colors];
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      "Web Development": <Globe className="w-4 h-4" />,
      "Mobile Development": <Smartphone className="w-4 h-4" />,
      "Data Science": <Database className="w-4 h-4" />,
      Finance: <Activity className="w-4 h-4" />,
      DevOps: <Cloud className="w-4 h-4" />,
    };
    return (
      icons[category as keyof typeof icons] || <Code className="w-4 h-4" />
    );
  };

  const getPlatformIcon = (platform: string) => {
    const icons = {
      github: <Github className="w-4 h-4" />,
      gitlab: <Code className="w-4 h-4" />,
      bitbucket: <Code className="w-4 h-4" />,
    };
    return (
      icons[platform as keyof typeof icons] || <Github className="w-4 h-4" />
    );
  };

  let filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tech.some((t) =>
        t.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesStatus =
      selectedStatus === "all" || project.status === selectedStatus;
    const matchesCategory =
      selectedCategory === "all" || project.category === selectedCategory;
    const matchesPriority =
      selectedPriority === "all" || project.priority === selectedPriority;

    return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
  });

  // Sort projects
  filteredProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "lastActive":
        return (
          new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime()
        );
      case "progress":
        return b.progress - a.progress;
      case "priority":
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return (
          priorityOrder[b.priority as keyof typeof priorityOrder] -
          priorityOrder[a.priority as keyof typeof priorityOrder]
        );
      case "startDate":
        return (
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        );
      default:
        return 0;
    }
  });

  const activeProjects = projects.filter((p) => p.status === "active");
  const favoriteProjects = projects.filter((p) => p.favorite);

  const toggleFavorite = (projectId: string) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId ? { ...p, favorite: !p.favorite } : p
      )
    );
  };

  const updateProjectStatus = (
    projectId: string,
    newStatus: Project["status"]
  ) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? {
              ...p,
              status: newStatus,
              lastActive: new Date().toISOString().split("T")[0],
              endDate:
                newStatus === "completed"
                  ? new Date().toISOString().split("T")[0]
                  : p.endDate,
            }
          : p
      )
    );
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      description: project.description,
      status: project.status,
      priority: project.priority,
      category: project.category,
      tech: project.tech.join(", "),
      repository: project.repository?.url || "",
      liveUrl: project.liveUrl || "",
      notes: project.notes,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (projectId: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
  };

  const handleSubmit = () => {
    const project: Project = {
      id: editingProject?.id || Date.now().toString(),
      name: formData.name,
      description: formData.description,
      status: formData.status,
      priority: formData.priority,
      category: formData.category,
      tech: formData.tech
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      progress: editingProject?.progress || 0,
      startDate:
        editingProject?.startDate || new Date().toISOString().split("T")[0],
      endDate: editingProject?.endDate,
      lastActive: new Date().toISOString().split("T")[0],
      repository: formData.repository
        ? {
            url: formData.repository,
            platform: "github" as const,
            private: false,
          }
        : undefined,
      liveUrl: formData.liveUrl || undefined,
      notes: formData.notes,
      tasks: editingProject?.tasks || { total: 0, completed: 0 },
      collaborators: editingProject?.collaborators,
      favorite: editingProject?.favorite || false,
    };

    if (editingProject) {
      setProjects((prev) =>
        prev.map((p) => (p.id === editingProject.id ? project : p))
      );
    } else {
      setProjects((prev) => [project, ...prev]);
    }

    setIsDialogOpen(false);
    setEditingProject(null);
    setFormData({
      name: "",
      description: "",
      status: "active",
      priority: "medium",
      category: "",
      tech: "",
      repository: "",
      liveUrl: "",
      notes: "",
    });
  };

  const openNewProjectDialog = () => {
    setEditingProject(null);
    setFormData({
      name: "",
      description: "",
      status: "active",
      priority: "medium",
      category: "",
      tech: "",
      repository: "",
      liveUrl: "",
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

  const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
    <Card className="hover:shadow-lg transition-all duration-200 border-0 shadow-md h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="flex-shrink-0 mt-1">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                {getCategoryIcon(project.category)}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <CardTitle className="text-lg leading-tight line-clamp-1">
                  {project.name}
                </CardTitle>
                {project.favorite && (
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                )}
              </div>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <Badge className={`text-xs ${getStatusColor(project.status)}`}>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(project.status)}
                    <span className="capitalize">{project.status}</span>
                  </div>
                </Badge>
                <Badge
                  variant="outline"
                  className={`text-xs ${getPriorityColor(project.priority)}`}
                >
                  {project.priority.toUpperCase()} PRIORITY
                </Badge>
              </div>
              <CardDescription className="text-sm leading-relaxed line-clamp-2">
                {project.description}
              </CardDescription>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleEdit(project)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toggleFavorite(project.id)}>
                <Star className="w-4 h-4 mr-2" />
                {project.favorite
                  ? "Remove from favorites"
                  : "Add to favorites"}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDelete(project.id)}
                className="text-red-600"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>

        {/* Tasks */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <FileText className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">Tasks:</span>
          </div>
          <span className="font-medium">
            {project.tasks.completed}/{project.tasks.total}
          </span>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1">
          {project.tech.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
          {project.tech.length > 4 && (
            <Badge variant="secondary" className="text-xs">
              +{project.tech.length - 4} more
            </Badge>
          )}
        </div>

        {/* Repository & Links */}
        {(project.repository || project.liveUrl) && (
          <div className="flex gap-2">
            {project.repository && (
              <Button
                size="sm"
                variant="outline"
                className="flex-1 text-xs"
                onClick={() => window.open(project.repository!.url, "_blank")}
              >
                {getPlatformIcon(project.repository.platform)}
                <span className="ml-1">Repo</span>
                {project.repository.stars && (
                  <span className="ml-2 flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    {project.repository.stars}
                  </span>
                )}
              </Button>
            )}
            {project.liveUrl && (
              <Button
                size="sm"
                variant="outline"
                className="flex-1 text-xs"
                onClick={() => window.open(project.liveUrl!, "_blank")}
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                Live
              </Button>
            )}
          </div>
        )}

        {/* Dates & Activity */}
        <div className="text-xs text-gray-500 space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              Started: {formatDate(project.startDate)}
            </div>
            {project.endDate && (
              <div>Completed: {formatDate(project.endDate)}</div>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Last active: {formatDate(project.lastActive)}
          </div>
        </div>

        {/* Notes Preview */}
        {project.notes && (
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-700 line-clamp-2">
              {project.notes}
            </p>
          </div>
        )}

        {/* Status Actions */}
        <div className="flex gap-1 pt-2">
          {project.status === "active" && (
            <>
              <Button
                size="sm"
                variant="outline"
                onClick={() => updateProjectStatus(project.id, "paused")}
                className="flex-1 text-xs"
              >
                <Pause className="w-3 h-3 mr-1" />
                Pause
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => updateProjectStatus(project.id, "completed")}
                className="flex-1 text-xs text-green-600"
              >
                <Zap className="w-3 h-3 mr-1" />
                Complete
              </Button>
            </>
          )}
          {project.status === "paused" && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => updateProjectStatus(project.id, "active")}
              className="flex-1 text-xs text-green-600"
            >
              <Play className="w-3 h-3 mr-1" />
              Resume
            </Button>
          )}
          {project.status === "completed" && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => updateProjectStatus(project.id, "archived")}
              className="flex-1 text-xs"
            >
              <Archive className="w-3 h-3 mr-1" />
              Archive
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const ProjectListItem: React.FC<{ project: Project }> = ({ project }) => (
    <Card className="hover:shadow-md transition-all duration-200">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-blue-100 rounded-lg text-blue-600 flex-shrink-0">
            {getCategoryIcon(project.category)}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-900 truncate">
                {project.name}
              </h3>
              {project.favorite && (
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              )}
              <Badge className={`text-xs ${getStatusColor(project.status)}`}>
                {project.status}
              </Badge>
              <Badge
                variant="outline"
                className={`text-xs ${getPriorityColor(project.priority)}`}
              >
                {project.priority}
              </Badge>
            </div>

            <p className="text-sm text-gray-600 mb-2 line-clamp-1">
              {project.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Activity className="w-3 h-3" />
                  {project.progress}%
                </div>
                <div className="flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  {project.tasks.completed}/{project.tasks.total}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatDate(project.lastActive)}
                </div>
                <div className="hidden sm:flex items-center gap-1">
                  {project.tech.slice(0, 2).map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {project.repository && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      window.open(project.repository!.url, "_blank")
                    }
                    className="text-xs"
                  >
                    {getPlatformIcon(project.repository.platform)}
                  </Button>
                )}
                {project.liveUrl && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(project.liveUrl!, "_blank")}
                    className="text-xs"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEdit(project)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Calculate stats
  const stats = {
    total: projects.length,
    active: activeProjects.length,
    completed: projects.filter((p) => p.status === "completed").length,
    avgProgress: Math.round(
      activeProjects.reduce((sum, p) => sum + p.progress, 0) /
        activeProjects.length || 0
    ),
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Projects Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your personal projects, repositories, and development notes
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={openNewProjectDialog}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Project
                </Button>
              </DialogTrigger>

              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingProject ? "Edit Project" : "Create New Project"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingProject
                      ? "Update your project details"
                      : "Add a new project to your dashboard"}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Project Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        placeholder="My Awesome Project"
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
                        placeholder="Web Development, Mobile Development, etc."
                        required
                      />
                    </div>
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
                      placeholder="Brief description of the project..."
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            status: value as Project["status"],
                          }))
                        }
                      >
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          {statuses
                            .filter((s) => s !== "all")
                            .map((status) => (
                              <SelectItem key={status} value={status}>
                                {status.charAt(0).toUpperCase() +
                                  status.slice(1)}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select
                        value={formData.priority}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            priority: value as Project["priority"],
                          }))
                        }
                      >
                        <SelectTrigger id="priority">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          {priorities
                            .filter((p) => p !== "all")
                            .map((priority) => (
                              <SelectItem key={priority} value={priority}>
                                {priority.charAt(0).toUpperCase() +
                                  priority.slice(1)}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tech">Tech Stack</Label>
                    <Input
                      id="tech"
                      value={formData.tech}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          tech: e.target.value,
                        }))
                      }
                      placeholder="React, Node.js, Tailwind CSS"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="repository">Repository URL</Label>
                    <Input
                      id="repository"
                      value={formData.repository}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          repository: e.target.value,
                        }))
                      }
                      placeholder="https://github.com/username/repo"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="liveUrl">Live URL</Label>
                    <Input
                      id="liveUrl"
                      value={formData.liveUrl}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          liveUrl: e.target.value,
                        }))
                      }
                      placeholder="https://myproject.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          notes: e.target.value,
                        }))
                      }
                      placeholder="Any extra notes or ideas for the project..."
                      rows={4}
                    />
                  </div>
                </div>

                <DialogFooter className="mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {editingProject ? "Save Changes" : "Create Project"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 flex items-center gap-2">
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedPriority}
              onValueChange={setSelectedPriority}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                {priorities.map((priority) => (
                  <SelectItem key={priority} value={priority}>
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
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

        {/* Project List */}
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }
        >
          {filteredProjects.map((project) =>
            viewMode === "grid" ? (
              <ProjectCard key={project.id} project={project} />
            ) : (
              <ProjectListItem key={project.id} project={project} />
            )
          )}
          {filteredProjects.length === 0 && (
            <p className="text-gray-500 text-sm">
              No projects found matching your criteria.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsDashboard;
