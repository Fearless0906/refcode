"use client";

import React, { useState } from "react";
import {
  Search,
  Copy,
  BookOpen,
  Code2,
  Database,
  Globe,
  Cpu,
  Star,
  ChevronDown,
  ChevronRight,
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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CheatSheetItem {
  title: string;
  description: string;
  code: string;
  category: string;
}

interface CheatSheet {
  id: string;
  name: string;
  icon: React.ReactNode;
  category: string;
  description: string;
  items: CheatSheetItem[];
  favorite: boolean;
}

const CheatSheetPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [favoriteSheets, setFavoriteSheets] = useState<string[]>([
    "react",
    "javascript",
  ]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});

  const cheatSheets: CheatSheet[] = [
    {
      id: "react",
      name: "React",
      icon: <Code2 className="w-5 h-5" />,
      category: "Frontend",
      description: "React hooks, components, and patterns",
      favorite: true,
      items: [
        {
          title: "useState Hook",
          description: "Manage state in functional components",
          code: `const [count, setCount] = useState(0);
const [user, setUser] = useState({ name: '', email: '' });

// Update state
setCount(count + 1);
setUser(prev => ({ ...prev, name: 'John' }));`,
          category: "Hooks",
        },
        {
          title: "useEffect Hook",
          description: "Handle side effects and lifecycle",
          code: `// Component mount
useEffect(() => {
  fetchData();
}, []);

// Dependency array
useEffect(() => {
  updateTitle(count);
}, [count]);

// Cleanup
useEffect(() => {
  const timer = setInterval(() => {}, 1000);
  return () => clearInterval(timer);
}, []);`,
          category: "Hooks",
        },
        {
          title: "Custom Hook",
          description: "Create reusable stateful logic",
          code: `function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);
  
  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(initial);
  
  return { count, increment, decrement, reset };
}`,
          category: "Hooks",
        },
        {
          title: "Component Props",
          description: "TypeScript component props pattern",
          code: `interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  ...props 
}) => {
  return (
    <button className={\`btn btn-\${variant}\`} {...props}>
      {children}
    </button>
  );
};`,
          category: "Components",
        },
      ],
    },
    {
      id: "javascript",
      name: "JavaScript",
      icon: <Globe className="w-5 h-5" />,
      category: "Language",
      description: "Modern JavaScript ES6+ features",
      favorite: true,
      items: [
        {
          title: "Array Methods",
          description: "Common array manipulation methods",
          code: `const arr = [1, 2, 3, 4, 5];

// Map - transform elements
const doubled = arr.map(x => x * 2);

// Filter - select elements
const evens = arr.filter(x => x % 2 === 0);

// Reduce - accumulate values
const sum = arr.reduce((acc, curr) => acc + curr, 0);

// Find - locate element
const found = arr.find(x => x > 3);

// Some/Every - test conditions
const hasEven = arr.some(x => x % 2 === 0);
const allPositive = arr.every(x => x > 0);`,
          category: "Arrays",
        },
        {
          title: "Destructuring",
          description: "Extract values from objects and arrays",
          code: `// Object destructuring
const user = { name: 'John', age: 30, email: 'john@example.com' };
const { name, age, email: userEmail } = user;

// Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];

// Function parameters
function greet({ name, age = 18 }) {
  return \`Hello \${name}, you are \${age} years old\`;
}

// Nested destructuring
const { user: { profile: { avatar } } } = data;`,
          category: "Syntax",
        },
        {
          title: "Async/Await",
          description: "Handle asynchronous operations",
          code: `// Basic async function
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Promise.all for parallel requests
async function fetchMultiple() {
  const [users, posts, comments] = await Promise.all([
    fetch('/api/users'),
    fetch('/api/posts'),
    fetch('/api/comments')
  ]);
  
  return {
    users: await users.json(),
    posts: await posts.json(),
    comments: await comments.json()
  };
}`,
          category: "Async",
        },
      ],
    },
    {
      id: "css",
      name: "CSS",
      icon: <BookOpen className="w-5 h-5" />,
      category: "Frontend",
      description: "CSS Grid, Flexbox, and modern styling",
      favorite: false,
      items: [
        {
          title: "Flexbox Layout",
          description: "Flexible box layout patterns",
          code: `.container {
  display: flex;
  justify-content: center;    /* horizontal alignment */
  align-items: center;        /* vertical alignment */
  flex-direction: row;        /* row | column */
  flex-wrap: wrap;           /* wrap | nowrap */
  gap: 1rem;                 /* space between items */
}

.item {
  flex: 1;                   /* grow and shrink */
  flex-basis: 200px;         /* initial size */
  flex-shrink: 0;            /* prevent shrinking */
}`,
          category: "Layout",
        },
        {
          title: "CSS Grid",
          description: "Two-dimensional grid layout",
          code: `.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto 1fr auto;
  grid-gap: 1rem;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }`,
          category: "Layout",
        },
        {
          title: "Modern CSS Features",
          description: "Custom properties, clamp, and more",
          code: `:root {
  --primary-color: #3b82f6;
  --spacing: clamp(1rem, 5vw, 3rem);
  --font-size: clamp(1rem, 2.5vw, 2rem);
}

.card {
  background: var(--primary-color);
  padding: var(--spacing);
  font-size: var(--font-size);
  
  /* Container queries */
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}`,
          category: "Modern",
        },
      ],
    },
    {
      id: "python",
      name: "Python",
      icon: <Cpu className="w-5 h-5" />,
      category: "Language",
      description: "Python fundamentals and advanced features",
      favorite: false,
      items: [
        {
          title: "List Comprehensions",
          description: "Concise way to create lists",
          code: `# Basic list comprehension
squares = [x**2 for x in range(10)]

# With condition
evens = [x for x in range(20) if x % 2 == 0]

# Nested comprehensions
matrix = [[i*j for j in range(3)] for i in range(3)]

# Dictionary comprehension
word_lengths = {word: len(word) for word in ['hello', 'world']}

# Set comprehension
unique_lengths = {len(word) for word in ['hello', 'world', 'hello']}`,
          category: "Data Structures",
        },
        {
          title: "Decorators",
          description: "Function and class decorators",
          code: `# Simple decorator
def timer(func):
    import time
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end - start:.2f} seconds")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1)
    return "Done"

# Class decorator
@dataclass
class Person:
    name: str
    age: int
    
    def greet(self):
        return f"Hello, I'm {self.name}"`,
          category: "Functions",
        },
      ],
    },
    {
      id: "sql",
      name: "SQL",
      icon: <Database className="w-5 h-5" />,
      category: "Database",
      description: "SQL queries and database operations",
      favorite: false,
      items: [
        {
          title: "Common Queries",
          description: "Basic SQL operations",
          code: `-- Select with conditions
SELECT name, email, age 
FROM users 
WHERE age > 18 
  AND status = 'active'
ORDER BY name ASC
LIMIT 10;

-- Joins
SELECT u.name, p.title, p.created_at
FROM users u
INNER JOIN posts p ON u.id = p.user_id
WHERE p.published = true;

-- Aggregations
SELECT category, COUNT(*) as count, AVG(price) as avg_price
FROM products
GROUP BY category
HAVING COUNT(*) > 5;`,
          category: "Queries",
        },
        {
          title: "Window Functions",
          description: "Advanced analytical functions",
          code: `-- Row number and ranking
SELECT 
  name,
  salary,
  ROW_NUMBER() OVER (ORDER BY salary DESC) as row_num,
  RANK() OVER (ORDER BY salary DESC) as rank,
  DENSE_RANK() OVER (ORDER BY salary DESC) as dense_rank
FROM employees;

-- Running totals
SELECT 
  date,
  amount,
  SUM(amount) OVER (ORDER BY date) as running_total
FROM transactions;

-- Partition by department
SELECT 
  name,
  department,
  salary,
  AVG(salary) OVER (PARTITION BY department) as dept_avg
FROM employees;`,
          category: "Advanced",
        },
      ],
    },
  ];

  const categories = [
    "all",
    ...Array.from(new Set(cheatSheets.map((sheet) => sheet.category))),
  ];

  const filteredSheets = cheatSheets.filter((sheet) => {
    const matchesSearch =
      sheet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sheet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sheet.items.some(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "all" || sheet.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const favoriteSheetsList = cheatSheets.filter((sheet) =>
    favoriteSheets.includes(sheet.id)
  );

  const handleCopy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const toggleFavorite = (sheetId: string) => {
    setFavoriteSheets((prev) =>
      prev.includes(sheetId)
        ? prev.filter((id) => id !== sheetId)
        : [...prev, sheetId]
    );
  };

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Cheat Sheets</h1>
            <p className="text-gray-600 mt-1">
              Quick reference guides for programming languages and technologies
            </p>
          </div>

          <div className="flex gap-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {filteredSheets.length} sheets available
            </Badge>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search cheat sheets, topics, or code examples..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category === "all" ? "All Categories" : category}
              </Button>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:w-96">
            <TabsTrigger value="all">All Cheat Sheets</TabsTrigger>
            <TabsTrigger value="favorites">
              <Star className="w-4 h-4 mr-1" />
              Favorites ({favoriteSheets.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredSheets.map((sheet) => (
                <Card
                  key={sheet.id}
                  className="hover:shadow-lg transition-all duration-200 border-0 shadow-md"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                          {sheet.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            {sheet.name}
                          </CardTitle>
                          <Badge variant="outline" className="mt-1 text-xs">
                            {sheet.category}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFavorite(sheet.id)}
                      >
                        <Star
                          className={`w-4 h-4 ${
                            favoriteSheets.includes(sheet.id)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-400"
                          }`}
                        />
                      </Button>
                    </div>
                    <CardDescription>{sheet.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <ScrollArea className="h-96">
                      {Object.entries(groupItemsByCategory(sheet.items)).map(
                        ([category, items]) => (
                          <Collapsible
                            key={category}
                            open={
                              expandedSections[`${sheet.id}-${category}`] !==
                              false
                            }
                            onOpenChange={() =>
                              toggleSection(`${sheet.id}-${category}`)
                            }
                          >
                            <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded-lg">
                              <span className="font-medium text-sm text-gray-700">
                                {category}
                              </span>
                              {expandedSections[`${sheet.id}-${category}`] ===
                              false ? (
                                <ChevronRight className="w-4 h-4" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )}
                            </CollapsibleTrigger>

                            <CollapsibleContent className="space-y-3 mt-2">
                              {items.map((item, index) => (
                                <div
                                  key={index}
                                  className="border rounded-lg p-3 bg-white"
                                >
                                  <div className="flex items-start justify-between mb-2">
                                    <div>
                                      <h4 className="font-medium text-sm text-gray-900">
                                        {item.title}
                                      </h4>
                                      <p className="text-xs text-gray-600 mt-1">
                                        {item.description}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="bg-gray-900 rounded-lg p-3 relative group mt-2">
                                    <pre className="text-xs text-gray-100 overflow-x-auto">
                                      <code>{item.code}</code>
                                    </pre>

                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => handleCopy(item.code)}
                                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-100"
                                    >
                                      {copiedCode === item.code ? (
                                        <span className="text-green-400 text-xs">
                                          Copied!
                                        </span>
                                      ) : (
                                        <Copy className="w-3 h-3" />
                                      )}
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </CollapsibleContent>
                          </Collapsible>
                        )
                      )}
                    </ScrollArea>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6 mt-6">
            {favoriteSheetsList.length === 0 ? (
              <Card className="p-8 text-center">
                <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No favorites yet
                </h3>
                <p className="text-gray-600">
                  Click the star icon on any cheat sheet to add it to your
                  favorites.
                </p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {favoriteSheetsList.map((sheet) => (
                  <Card
                    key={sheet.id}
                    className="hover:shadow-lg transition-all duration-200 border-0 shadow-md"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600">
                            {sheet.icon}
                          </div>
                          <div>
                            <CardTitle className="text-lg">
                              {sheet.name}
                            </CardTitle>
                            <Badge variant="outline" className="mt-1 text-xs">
                              {sheet.category}
                            </Badge>
                          </div>
                        </div>
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      </div>
                      <CardDescription>{sheet.description}</CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="text-sm text-gray-600">
                        {sheet.items.length} code examples available
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

export default CheatSheetPage;
