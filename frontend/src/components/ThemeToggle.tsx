import { useTheme } from "../utils/theme";
import { MoonIcon, SunIcon } from "./Icons";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={`relative w-9 h-9 grid place-items-center rounded-xl border border-line text-muted
                  hover:text-fg hover:bg-surface-2 hover:border-line-strong transition cursor-pointer ${className}`}
    >
      <SunIcon
        className={`w-4.5 h-4.5 absolute transition-all duration-300 ${
          isDark ? "opacity-0 scale-50 -rotate-90" : "opacity-100 scale-100 rotate-0"
        }`}
      />
      <MoonIcon
        className={`w-4.5 h-4.5 absolute transition-all duration-300 ${
          isDark ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 rotate-90"
        }`}
      />
    </button>
  );
}
