"use client";

import { Search, LogIn, Menu, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Sheet, SheetContent } from "@/app/components/ui/sheet";
import NirmatriLogo from "@/app/components/Nirmatri";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
type HeaderProps = {
  onUserClick?: () => void;
};

export function Header({ onUserClick }: HeaderProps) {
  const [showTopBar, setShowTopBar] = useState(true);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [sheetSearchOpen, setSheetSearchOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const searchRef = useRef<HTMLDivElement>(null);

  /* ================= LOGIN STATE CHECK ================= */
  useEffect(() => {
    // Read login state from localStorage on mount
    const logged = localStorage.getItem("loggedIn");
    setIsLoggedIn(logged === "true");

    // Listen for changes in localStorage (other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "loggedIn") {
        setIsLoggedIn(e.newValue === "true");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  /* 🔥 ROUTE CHECKS */
  const isHomePage = pathname.startsWith("/home");
  const hideHeader = pathname.startsWith("/seller") || pathname.startsWith("/userauth");

  /* ⏱️ TOP BAR AUTO HIDE */
  useEffect(() => {
    const timer = setTimeout(() => setShowTopBar(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  /* 🔁 ROUTE CHANGE → CLOSE SEARCH */
  useEffect(() => {
    startTransition(() => {
      setMobileSearchOpen(false);
      setSheetSearchOpen(false);
    });
  }, [pathname]);

  /* 👆 CLICK OUTSIDE */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (mobileSearchOpen && searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setMobileSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileSearchOpen]);

  /* ❌ LOGIN / AUTH PAGES PE HEADER HIDE */
  if (hideHeader) return null;

  /* ================= LOGOUT FUNCTION ================= */
  const logout = () => {
    localStorage.removeItem("loggedIn");
    setIsLoggedIn(false);
    router.replace("/");
  };

  /* ================= HEADER JSX ================= */
  return (
    <>
      {/* 🔍 MOBILE SEARCH SHEET */}
      <Sheet open={sheetSearchOpen} onOpenChange={setSheetSearchOpen}>
        <SheetContent side="top" className="p-4 bg-[#6968A6]">
          <form action="/search" className="flex gap-2">
            <Input autoFocus name="q" type="search" placeholder="Search products..." />
            <Button size="icon" type="submit">
              <Search className="h-4 w-4 text-blue-500" />
            </Button>
          </form>
        </SheetContent>
      </Sheet>

      <header className="bg-gradient-to-r from-[#1ddc73]/90 via-[#aeccd7]/90 to-[#21e445]/90 backdrop-blur-md">
{/* <header className="bg-gradient-to-r from-[#10b981]/90 via-[#8b5cf6]/90 to-[#34d399]/90 backdrop-blur-md"> */}
        {/* 🔹 TOP PROMO BAR */}
        <div className={`overflow-hidden transition-all duration-500 ${showTopBar ? "max-h-10" : "max-h-0"}`}>
          <div className="bg-gradient-to-r from-green-800 via-emerald-700 to-teal-800 text-white text-xs py-2 text-center">
            Where tradition is handcrafted into elegance
          </div>
        </div>

        {/* 🔹 MAIN HEADER */}
        <div className="h-14">
          <div className="max-w-7xl mx-auto h-full px-4 flex items-center gap-3">
            {/* LOGO */}
            <NirmatriLogo />

            {/* DESKTOP SEARCH */}
            <div className="hidden md:flex flex-1 justify-center">
              <form action="/search" className="relative w-full max-w-xl">
                <Input
                  name="q"
                  type="search"
                  placeholder="Search handcrafted products..."
                  className="h-9 pl-4 pr-11 rounded-full bg-white"
                />
                <Button size="icon" type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full">
                  <Search className="h-6 w-6 text-green-500" />
                </Button>
              </form>
            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-2 ml-auto">
              {/* MOBILE SEARCH ICON */}
              <Button variant="ghost" size="icon" className="md:hidden text-white" onClick={() => setMobileSearchOpen((p) => !p)}>
                <Search className="h-6 w-6" />
              </Button>

              {!isLoggedIn ? (
                // 🔴 GUEST MODE
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="h-8 px-3 gap-1.5 bg-[#acd8a7] hover:bg-[#72bf6a]">
                      <LogIn className="h-4 w-4" />
                      Login
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => router.push("/userauth/login")}>Continue as User</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/seller/login")}>Login as Seller</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                // 🔹 LOGGED-IN USER MENU
                <>
                  <Button variant="ghost" size="icon" onClick={() => router.push("/cart")}>
                    <ShoppingCart className="h-6 w-6 text-white" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={onUserClick} className="rounded-full border border-[#6968A6]/30">
                    <Menu className="h-5 w-5 text-white" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}