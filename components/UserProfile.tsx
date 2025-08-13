// "use client";

// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { LogOut, User } from "lucide-react";

// export function UserProfile() {
//   const router = useRouter();

//   // if (!user) {
//   //   return null;
//   // }

//   const handleSignOut = async () => {
//     // await signOut();
//     router.push("/");
//   };

//   const getUserInitials = (email: string) => {
//     return email.substring(0, 2).toUpperCase();
//   };

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="ghost" className="relative h-8 w-8 rounded-full">
//           <Avatar className="h-8 w-8">
//             <AvatarImage
//               src={user.user_metadata?.avatar_url}
//               alt={user.email || "User"}
//             />
//             <AvatarFallback>
//               {user.user_metadata?.full_name
//                 ? user.user_metadata.full_name
//                     .split(" ")
//                     .map((n: string) => n[0])
//                     .join("")
//                     .toUpperCase()
//                 : getUserInitials(user.email || "")}
//             </AvatarFallback>
//           </Avatar>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="w-56" align="end" forceMount>
//         <DropdownMenuLabel className="font-normal">
//           <div className="flex flex-col space-y-1">
//             <p className="text-sm font-medium leading-none">
//               {user.user_metadata?.full_name || "User"}
//             </p>
//             <p className="text-xs leading-none text-muted-foreground">
//               {user.email}
//             </p>
//           </div>
//         </DropdownMenuLabel>
//         <DropdownMenuSeparator />
//         <DropdownMenuItem onClick={handleSignOut}>
//           <LogOut className="mr-2 h-4 w-4" />
//           <span>Log out</span>
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }
