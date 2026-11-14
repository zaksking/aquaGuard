import { Droplet } from "lucide-react";

export default function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: { icon: "h-7 w-7", text: "text-lg" },
    md: { icon: "h-9 w-9", text: "text-xl" },
    lg: { icon: "h-12 w-12", text: "text-2xl" },
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className={`${sizes[size].icon} rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-lg shadow-brand-600/30`}>
          <Droplet className="h-1/2 w-1/2 text-white" fill="white" />
        </div>
      </div>
      <span className={`${sizes[size].text} font-extrabold tracking-tight text-gray-900`}>
        Aqua<span className="text-brand-600">Guard</span>
      </span>
    </div>
  );
}
