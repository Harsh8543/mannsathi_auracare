
import { useContext } from "react";
import { UserContext } from "@/context/usercontext";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Settings, LogOut, User, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export function DashboardHeader() {
  const { user, loading, clearUser } = useContext(UserContext);

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (loading) {
    return (
      <header className="border-b px-6 py-4 bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50">
        <p className="text-sm text-gray-500">Loading user...</p>
      </header>
    );
  }

  return (
    <header className="border-b border-[#A8D0E6] bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 transition transform hover:scale-105">
          <Heart className="w-8 h-8 text-pink-400" />
          <h1 className="text-xl font-semibold text-gray-700">MannSathi</h1>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Notification bell */}
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-white/30 transition-colors rounded-lg"
          >
            <Bell className="w-5 h-5 text-gray-700" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
          </Button>

          {/* User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 px-2 hover:bg-white/30 transition-colors rounded-lg"
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-purple-200 text-gray-700">
                    {getInitials(user?.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:block text-gray-700">
                  {user?.name || "Guest"}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-gradient-to-tr from-pink-50 via-purple-50 to-blue-50 shadow-lg rounded-xl"
            >
              <Link to="/profilesetting">
                <DropdownMenuItem className="hover:bg-purple-100 transition-colors rounded-md">
                  <User className="mr-2 h-4 w-4" />
                  Profile Settings
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem className="hover:bg-purple-100 transition-colors rounded-md">
                <Settings className="mr-2 h-4 w-4" />
                Preferences
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  clearUser();
                  window.location.href = "/";
                }}
                className="text-red-600 hover:text-red-700 rounded-md transition-colors"
                disabled={!user}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
