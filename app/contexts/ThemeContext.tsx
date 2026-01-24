"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  effectiveTheme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("system");
  const [effectiveTheme, setEffectiveTheme] =
    useState<"light" | "dark">("light");

  // ✅ Read theme from localStorage (SAFE)
  useEffect(() => {
    const savedTheme = localStorage.getItem("nirmatri-theme");
    if (savedTheme === "light" || savedTheme === "dark" || savedTheme === "system") {
      setTheme(savedTheme);
    }
  }, []);

  // ✅ Apply theme + save
  useEffect(() => {
    const root = document.documentElement;

    let effective: "light" | "dark";

    if (theme === "system") {
      effective = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } else {
      effective = theme;
    }

    setEffectiveTheme(effective);

    root.classList.remove("light", "dark");
    root.classList.add(effective);

    localStorage.setItem("nirmatri-theme", theme);
  }, [theme]);

  // ✅ Listen to system theme change
  useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      const effective = mediaQuery.matches ? "dark" : "light";
      setEffectiveTheme(effective);
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(effective);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, effectiveTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
