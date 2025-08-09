import React from "react";
import { Menu, Search, Bell } from "lucide-react";
import { Button } from "./ui/button";

interface HeaderProps {
  setMobileMenuOpen: (value: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setMobileMenuOpen }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-2 py-4 sm:px-4 lg:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden -ml-2 mr-2 h-10 w-10 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden sm:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Notifications */}
          <Button
            variant="ghost"
            className="relative p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
          </Button>

          {/* Profile */}
          <Button
            variant="ghost"
            className="flex items-center space-x-2 text-sm rounded-lg p-2 hover:bg-gray-100"
          >
            <div className="h-8 w-8 bg-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">JD</span>
            </div>
            <span className="hidden sm:block text-gray-700 font-medium">
              John Doe
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
