
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="w-9 h-9 transition-all"
    >
      <Sun className={`h-[1.2rem] w-[1.2rem] transition-all ${theme === 'dark' ? 'scale-0 absolute' : 'scale-100'}`} />
      <Moon className={`h-[1.2rem] w-[1.2rem] transition-all ${theme === 'light' ? 'scale-0 absolute' : 'scale-100'}`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
