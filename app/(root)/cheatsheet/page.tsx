// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Search,
//   BookOpen,
//   Code2,
//   Database,
//   Globe,
//   Cpu,
//   Star,
//   Edit,
//   Trash2,
//   AlertCircle,
//   RefreshCw,
//   ExternalLink,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import CreateCheatSheet from "@/components/CreateCheatSheet";
// import { CheatSheet } from "@/types/type";

// const CheatSheetPage: React.FC = () => {
//   const router = useRouter();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [cheatSheets, setCheatSheets] = useState<CheatSheet[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [editingCheatSheet, setEditingCheatSheet] = useState<CheatSheet | null>(
//     null
//   );

//   // const loadCheatSheets = useCallback(async () => {
//   //   if (!user) return;

//   //   try {
//   //     setIsLoading(true);
//   //     setError(null);
//   //     const sheets = await getCheatSheets(user.id);
//   //     setCheatSheets(sheets);
//   //   } catch (error) {
//   //     console.error("Error loading cheat sheets:", error);
//   //     setError(
//   //       "Failed to load cheat sheets. Please check your connection and try again."
//   //     );
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // }, [user]);

//   // Load cheat sheets from Supabase
//   // useEffect(() => {
//   //   if (user) {
//   //     loadCheatSheets();
//   //   }
//   // }, [user, loadCheatSheets]);

//   const handleCheatSheetCreated = (newCheatSheet: CheatSheet) => {
//     setCheatSheets([newCheatSheet, ...cheatSheets]);
//     setError(null); // Clear any previous errors
//   };

//   const handleCheatSheetUpdated = (updatedCheatSheet: CheatSheet) => {
//     setCheatSheets(
//       cheatSheets.map((sheet) =>
//         sheet.id === updatedCheatSheet.id ? updatedCheatSheet : sheet
//       )
//     );
//     setEditingCheatSheet(null);
//     setError(null); // Clear any previous errors
//   };

//   // const handleToggleFavorite = async (cheatSheetId: string) => {
//   //   if (!user) return;

//   //   try {
//   //     await toggleFavorite(cheatSheetId, user.id);
//   //     setCheatSheets(
//   //       cheatSheets.map((sheet) =>
//   //         sheet.id === cheatSheetId
//   //           ? { ...sheet, favorite: !sheet.favorite }
//   //           : sheet
//   //       )
//   //     );
//   //   } catch (error) {
//   //     console.error("Error toggling favorite:", error);
//   //     setError("Failed to update favorite status. Please try again.");
//   //   }
//   // };

//   const handleDeleteCheatSheet = async (cheatSheetId: string) => {
//     if (!user) return;

//     if (
//       confirm(
//         "Are you sure you want to delete this cheat sheet? This action cannot be undone."
//       )
//     ) {
//       try {
//         // await deleteCheatSheet(cheatSheetId, user.id);
//         setCheatSheets(
//           cheatSheets.filter((sheet) => sheet.id !== cheatSheetId)
//         );
//       } catch (error) {
//         console.error("Error deleting cheat sheet:", error);
//         setError("Error deleting cheat sheet. Please try again.");
//       }
//     }
//   };

//   const getIconComponent = (iconName: string) => {
//     const iconMap: Record<string, React.ReactNode> = {
//       code: <Code2 className="w-5 h-5" />,
//       database: <Database className="w-5 h-5" />,
//       globe: <Globe className="w-5 h-5" />,
//       cpu: <Cpu className="w-5 h-5" />,
//       "book-open": <BookOpen className="w-5 h-5" />,
//       zap: <Star className="w-5 h-5" />,
//       shield: <Star className="w-5 h-5" />,
//       cloud: <Globe className="w-5 h-5" />,
//     };
//     return iconMap[iconName] || <Code2 className="w-5 h-5" />;
//   };

//   const categories = [
//     "all",
//     ...Array.from(new Set(cheatSheets.map((sheet) => sheet.category))),
//   ];

//   const filteredSheets = cheatSheets.filter((sheet) => {
//     const matchesSearch =
//       sheet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       sheet.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       sheet.items?.some(
//         (item) =>
//           item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item.description?.toLowerCase().includes(searchTerm.toLowerCase())
//       );

//     const matchesCategory =
//       selectedCategory === "all" || sheet.category === selectedCategory;

//     return matchesSearch && matchesCategory;
//   });

//   const favoriteSheets = cheatSheets.filter((sheet) => sheet.favorite);

//   const handleViewCheatSheet = (cheatSheetId: string) => {
//     router.push(`/cheatsheet/${cheatSheetId}`);
//   };

//   if (!user) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-6">
//         <div className="w-full mx-auto text-center py-12">
//           <div className="max-w-md mx-auto">
//             <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
//               <Code2 className="w-10 h-10 text-white" />
//             </div>
//             <h1 className="text-3xl font-bold text-gray-900 mb-4">
//               Welcome to Cheat Sheets
//             </h1>
//             <p className="text-gray-600 text-lg">
//               Please log in to access your personalized cheat sheet collection.
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto p-6 space-y-8">
//         {/* Header */}
//         <div className="text-center space-y-4">
//           <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full">
//             <span className="text-sm font-medium text-blue-700">
//               {filteredSheets.length} cheat sheets available
//             </span>
//           </div>

//           <div className="space-y-2">
//             <h1 className="text-4xl font-bold text-gray-900">Cheat Sheets</h1>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Your personal collection of programming references and code
//               snippets
//             </p>
//           </div>

//           <div className="flex justify-center">
//             <CreateCheatSheet
//               onCheatSheetCreated={handleCheatSheetCreated}
//               userId={user.id}
//             />
//           </div>
//         </div>

//         {/* Error Display */}
//         {error && (
//           <Card className="border-red-200 bg-red-50">
//             <CardContent className="p-6">
//               <div className="flex items-center gap-4">
//                 <div className="p-3 bg-red-100 rounded-full">
//                   <AlertCircle className="w-6 h-6 text-red-600" />
//                 </div>
//                 <div className="flex-1">
//                   <p className="text-red-800 font-medium text-lg">{error}</p>
//                 </div>
//                 <Button
//                   variant="outline"
//                   size="lg"
//                   onClick={loadCheatSheets}
//                   className="border-red-300 text-red-700 hover:bg-red-100"
//                 >
//                   <RefreshCw className="w-4 h-4 mr-2" />
//                   Retry
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         )}

//         {/* Search and Filters */}
//         <div className="space-y-6">
//           <div className="relative max-w-2xl mx-auto">
//             <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <Input
//               placeholder="Search cheat sheets, topics, or code examples..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-12 pr-4 py-3 text-lg"
//             />
//           </div>

//           <div className="flex justify-center">
//             <div className="flex gap-2 flex-wrap justify-center">
//               {categories.map((category) => (
//                 <Button
//                   key={category}
//                   variant={
//                     selectedCategory === category ? "default" : "outline"
//                   }
//                   size="lg"
//                   onClick={() => setSelectedCategory(category)}
//                   className="capitalize"
//                 >
//                   {category === "all" ? "All Categories" : category}
//                 </Button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Tabs */}
//         <Tabs defaultValue="all" className="w-full">
//           <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
//             <TabsTrigger value="all">All Cheat Sheets</TabsTrigger>
//             <TabsTrigger value="favorites">
//               <Star className="w-4 h-4 mr-2" />
//               Favorites ({favoriteSheets.length})
//             </TabsTrigger>
//           </TabsList>

//           <TabsContent value="all" className="space-y-8 mt-8">
//             {isLoading ? (
//               <div className="text-center py-16">
//                 <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
//                 <p className="text-xl text-gray-600 font-medium">
//                   Loading your cheat sheets...
//                 </p>
//               </div>
//             ) : error ? (
//               <Card className="p-12 text-center">
//                 <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-6" />
//                 <h3 className="text-2xl font-bold text-gray-900 mb-4">
//                   Unable to load cheat sheets
//                 </h3>
//                 <p className="text-gray-600 mb-6 text-lg">
//                   There was an error connecting to the database. Please check
//                   your connection and try again.
//                 </p>
//                 <Button onClick={loadCheatSheets} className="mx-auto" size="lg">
//                   <RefreshCw className="w-4 h-4 mr-2" />
//                   Try Again
//                 </Button>
//               </Card>
//             ) : cheatSheets.length === 0 ? (
//               <Card className="p-12 text-center">
//                 <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
//                   <Code2 className="w-10 h-10 text-white" />
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-900 mb-4">
//                   No cheat sheets available
//                 </h3>
//                 <p className="text-gray-600 mb-6 text-lg">
//                   You haven&apos;t created any cheat sheets yet. Create your
//                   first one to get started!
//                 </p>
//                 <CreateCheatSheet
//                   onCheatSheetCreated={handleCheatSheetCreated}
//                   userId={user.id}
//                 />
//               </Card>
//             ) : filteredSheets.length === 0 ? (
//               <Card className="p-12 text-center">
//                 <Search className="w-16 h-16 text-gray-400 mx-auto mb-6" />
//                 <h3 className="text-2xl font-bold text-gray-900 mb-4">
//                   No cheat sheets found
//                 </h3>
//                 <p className="text-gray-600 mb-6 text-lg">
//                   Try adjusting your search or filters to find what you&apos;re
//                   looking for.
//                 </p>
//                 <Button
//                   variant="outline"
//                   onClick={() => {
//                     setSearchTerm("");
//                     setSelectedCategory("all");
//                   }}
//                   className="mx-auto"
//                   size="lg"
//                 >
//                   Clear Filters
//                 </Button>
//               </Card>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
//                 {filteredSheets.map((sheet) => (
//                   <Card
//                     key={sheet.id}
//                     className="group hover:shadow-lg transition-shadow duration-200"
//                   >
//                     <CardHeader className="pb-4">
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-4">
//                           <div className="p-3 bg-blue-500 rounded-xl text-white">
//                             {getIconComponent(sheet.icon)}
//                           </div>
//                           <div>
//                             <CardTitle className="text-xl text-gray-900">
//                               {sheet.name}
//                             </CardTitle>
//                             <Badge variant="outline" className="mt-2">
//                               {sheet.category}
//                             </Badge>
//                           </div>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             onClick={() => handleToggleFavorite(sheet.id)}
//                             className="hover:bg-yellow-50 hover:text-yellow-600"
//                           >
//                             <Star
//                               className={`w-5 h-5 ${
//                                 sheet.favorite
//                                   ? "fill-yellow-400 text-yellow-400"
//                                   : "text-gray-400"
//                               }`}
//                             />
//                           </Button>
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             onClick={() => setEditingCheatSheet(sheet)}
//                             className="hover:bg-blue-50 hover:text-blue-600"
//                           >
//                             <Edit className="w-5 h-5" />
//                           </Button>
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             onClick={() => handleDeleteCheatSheet(sheet.id)}
//                             className="hover:bg-red-50 hover:text-red-600"
//                           >
//                             <Trash2 className="w-5 h-5" />
//                           </Button>
//                         </div>
//                       </div>
//                       <CardDescription className="text-gray-600 text-base">
//                         {sheet.description}
//                       </CardDescription>
//                     </CardHeader>

//                     <CardContent className="space-y-4">
//                       <div className="flex items-center justify-between text-sm text-gray-600">
//                         <span className="flex items-center gap-2">
//                           <Code2 className="w-4 h-4 text-blue-500" />
//                           {sheet.items?.length || 0} code examples
//                         </span>
//                         <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
//                           {sheet.items?.length || 0} items
//                         </span>
//                       </div>

//                       <Button
//                         onClick={() => handleViewCheatSheet(sheet.id)}
//                         className="w-full"
//                         size="lg"
//                       >
//                         <ExternalLink className="w-4 h-4 mr-2" />
//                         View Full Cheat Sheet
//                       </Button>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             )}
//           </TabsContent>

//           <TabsContent value="favorites" className="space-y-8 mt-8">
//             {favoriteSheets.length === 0 ? (
//               <Card className="p-12 text-center">
//                 <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
//                   <Star className="w-10 h-10 text-white" />
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-900 mb-4">
//                   No favorites yet
//                 </h3>
//                 <p className="text-gray-600 text-lg">
//                   Click the star icon on any cheat sheet to add it to your
//                   favorites collection.
//                 </p>
//               </Card>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
//                 {favoriteSheets.map((sheet) => (
//                   <Card
//                     key={sheet.id}
//                     className="group hover:shadow-lg transition-shadow duration-200 border-yellow-200"
//                   >
//                     <CardHeader className="pb-4">
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-4">
//                           <div className="p-3 bg-yellow-500 rounded-xl text-white">
//                             {getIconComponent(sheet.icon)}
//                           </div>
//                           <div>
//                             <CardTitle className="text-xl text-gray-900">
//                               {sheet.name}
//                             </CardTitle>
//                             <Badge variant="outline" className="mt-2">
//                               {sheet.category}
//                             </Badge>
//                           </div>
//                         </div>
//                         <div className="p-2 bg-yellow-100 rounded-full">
//                           <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
//                         </div>
//                       </div>
//                       <CardDescription className="text-gray-600 text-base">
//                         {sheet.description}
//                       </CardDescription>
//                     </CardHeader>

//                     <CardContent className="space-y-4">
//                       <div className="flex items-center justify-between text-sm text-gray-600">
//                         <span className="flex items-center gap-2">
//                           <Code2 className="w-4 h-4 text-yellow-500" />
//                           {sheet.items?.length || 0} code examples
//                         </span>
//                         <span className="text-xs bg-yellow-100 px-2 py-1 rounded-full text-yellow-700">
//                           {sheet.items?.length || 0} items
//                         </span>
//                       </div>

//                       <Button
//                         onClick={() => handleViewCheatSheet(sheet.id)}
//                         className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
//                         size="lg"
//                       >
//                         <ExternalLink className="w-4 h-4 mr-2" />
//                         View Full Cheat Sheet
//                       </Button>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             )}
//           </TabsContent>
//         </Tabs>
//       </div>

//       {/* Edit Dialog */}
//       {editingCheatSheet && (
//         <Dialog
//           open={!!editingCheatSheet}
//           onOpenChange={() => setEditingCheatSheet(null)}
//         >
//           <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
//             <DialogHeader>
//               <DialogTitle>Edit Cheat Sheet</DialogTitle>
//               <DialogDescription>
//                 Update your cheat sheet information and items.
//               </DialogDescription>
//             </DialogHeader>
//             <CreateCheatSheet
//               onCheatSheetCreated={() => {}} // Not used for editing
//               onCheatSheetUpdated={handleCheatSheetUpdated}
//               editCheatSheet={editingCheatSheet}
//               userId={user.id}
//             />
//           </DialogContent>
//         </Dialog>
//       )}
//     </div>
//   );
// };

// export default CheatSheetPage;
