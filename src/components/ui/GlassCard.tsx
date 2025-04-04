
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "default" | "frost" | "dark" | "glow" | "subtle";
}

const GlassCard = ({ children, className, onClick, variant = "default" }: GlassCardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-2xl p-6 transition-all duration-300 backdrop-blur-md",
        variant === "default" && "glass border border-white/20 shadow-glass",
        variant === "frost" && "bg-white/70 border border-white/40 shadow-md",
        variant === "dark" && "glass-dark border border-white/10 shadow-md",
        variant === "glow" && "glass border border-white/20 shadow-glow",
        variant === "subtle" && "bg-white/40 border border-white/10 shadow-subtle",
        onClick && "hover:shadow-lg hover:-translate-y-1 cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassCard;
