"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Code,
  BookOpen,
  Bookmark,
  FolderOpen,
  Github,
  Star,
  Users,
  ArrowRight,
  CheckCircle,
  Rocket,
  Shield,
  Sparkles,
} from "lucide-react";
import { useSelector } from "react-redux";
import { State } from "@/store/store";

const LandingPage: React.FC = () => {
  const router = useRouter();

  const { loading, user } = useSelector((state: State) => state.auth);

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return null; // Will redirect to dashboard
  }

  const features = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Code Snippets",
      description:
        "Store and organize your reusable code snippets with syntax highlighting and search.",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Documentation Hub",
      description:
        "Centralize your technical documentation and create comprehensive guides.",
    },
    {
      icon: <Bookmark className="w-6 h-6" />,
      title: "Smart Bookmarks",
      description:
        "Save and categorize important links, articles, and resources.",
    },
    {
      icon: <FolderOpen className="w-6 h-6" />,
      title: "Project Management",
      description:
        "Track your projects, progress, and milestones in one place.",
    },
  ];

  const stats = [
    {
      label: "Active Users",
      value: "10K+",
      icon: <Users className="w-5 h-5" />,
    },
    {
      label: "Code Snippets",
      value: "50K+",
      icon: <Code className="w-5 h-5" />,
    },
    {
      label: "Projects",
      value: "5K+",
      icon: <FolderOpen className="w-5 h-5" />,
    },
    {
      label: "GitHub Stars",
      value: "2.5K+",
      icon: <Star className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">RefCode</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => router.push("/login")}>
                Sign In
              </Button>
              <Button
                onClick={() => router.push("/login")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
              <Sparkles className="w-4 h-4 mr-2" />
              Developer Productivity Platform
            </Badge>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Organize Your
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {" "}
              Code Knowledge
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            RefCode is the ultimate platform for developers to store, organize,
            and share code snippets, documentation, and project resources. Boost
            your productivity and never lose important code again.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => router.push("/login")}
              className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6"
            >
              Start Building Today
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-2"
            >
              <Github className="w-5 h-5 mr-2" />
              View on GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Stay Organized
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed specifically for developers to manage
              their code knowledge effectively.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 text-blue-600">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-2 text-white/80">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-blue-100 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Developers Choose RefCode
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built by developers, for developers. Experience the difference
              that thoughtful design makes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Save Time
              </h3>
              <p className="text-gray-600">
                Quick access to your code snippets and documentation saves hours
                of searching and rewriting.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Stay Organized
              </h3>
              <p className="text-gray-600">
                Keep your development resources organized and easily searchable
                across all your projects.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Rocket className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Boost Productivity
              </h3>
              <p className="text-gray-600">
                Focus on building great software instead of managing scattered
                code and documentation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Development Workflow?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of developers who are already using RefCode to stay
            organized and productive.
          </p>
          <Button
            size="lg"
            onClick={() => router.push("/login")}
            className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6"
          >
            Get Started for Free
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">RefCode</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2024 RefCode. Built with ❤️ for developers.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
