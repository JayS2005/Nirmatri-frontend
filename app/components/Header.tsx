"use client";

import {
  Search,
  ShoppingCart,
  Heart,
  Menu,
  LogIn,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import { ThemeToggle } from "@/app/components/ThemeToggle";
import { useEffect, useState } from "react";
import { Sidebar } from "@/app/components/Sidebar";
import {
  Sheet,
  SheetContent,
} from "@/app/components/ui/sheet";

export function Header() {
  const [cartCount] = useState(3);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showTopBar, setShowTopBar] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Auto hide top bar
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTopBar(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* 🔍 Mobile Search Sheet */}
      <Sheet open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <SheetContent side="top" className="p-4">
          <div className="flex gap-2">
            <Input
              autoFocus
              type="search"
              placeholder="Search products..."
              className="flex-1"
            />
            <Button size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
        {/* 🔹 Top Bar */}
        <div
          className={`overflow-hidden transition-all duration-700 ease-in-out ${
            showTopBar ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-2 px-4">
            <div className="max-w-7xl mx-auto text-center text-sm">
              <p>Where tradition is handcrafted into elegance</p>
            </div>
          </div>
        </div>

        {/* 🔹 Main Header */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            {/* LEFT */}
            <div className="flex items-center gap-3 flex-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(true)}
                className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110"
              >
                <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              </Button>

              {/* Desktop Search */}
              <div className="hidden md:block">
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-64 pr-10 rounded-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                  />
                  <Button
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 bg-blue-900 hover:bg-blue-950 rounded-full"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* CENTER LOGO */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
              <h1 className="text-4xl md:text-6xl bg-gradient-to-r from-blue-900 to-blue-800 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent whitespace-nowrap pointer-events-auto">
                Nirmatri
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Handmade with Love
              </p>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-2 md:gap-3 flex-1 justify-end">
              {/* 🔍 Mobile Search Icon */}
              <Button
                variant="ghost"
                size="icon"
className="md:hidden -mr-4 hover:scale-110 transition-transform"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              </Button>

              <ThemeToggle />

              <Button
                variant="outline"
                className="hidden lg:flex items-center gap-2 border-blue-900 dark:border-blue-400 text-blue-900 dark:text-blue-400"
              >
                <LogIn className="h-4 w-4" />
                Login
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:flex"
              >
                <Heart className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              </Button>

              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-blue-900">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
