import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ViteThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ViteThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ViteThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ViteThemeProviderContext =
  createContext<ViteThemeProviderState>(initialState);

export function ViteThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ViteThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ViteThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ViteThemeProviderContext.Provider>
  );
}

export const useViteTheme = () => {
  const context = useContext(ViteThemeProviderContext);

  if (context === undefined)
    throw new Error("useViteTheme must be used within a ViteThemeProvider");

  return context;
};
