import { useMemo } from "react";

/**
 * Decorative aquarium-themed SVG illustration.
 * Uses gradient backgrounds and animated bubbles.
 */
export default function AquariumVisual() {
  const bubbles = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        left: `${10 + i * 11}%`,
        size: 8 + Math.random() * 16,
        delay: `${i * 0.5}s`,
        duration: `${3 + Math.random() * 3}s`,
      })),
    []
  );

  return (
    <div className="relative aspect-square w-full max-w-md mx-auto">
      {/* Main aquarium container */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl border-2 border-brand-200 bg-gradient-to-b from-brand-100 via-brand-200 to-brand-400 shadow-2xl shadow-brand-600/20">
        {/* Light reflection */}
        <div className="absolute left-4 right-4 top-4 h-1/3 rounded-2xl bg-white/20 blur-md" />

        {/* Animated water surface */}
        <div className="absolute inset-x-0 top-0 h-2 bg-white/30" />

        {/* SVG fish */}
        <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
          {/* Seaweed left */}
          <g className="animate-float-slow" style={{ transformOrigin: "40px 180px" }}>
            <path
              d="M35 180 Q30 140 40 120 Q50 100 35 80 Q25 60 40 40"
              fill="none"
              stroke="#16a34a"
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.6"
            />
            <path
              d="M45 180 Q40 145 50 125 Q60 105 45 85"
              fill="none"
              stroke="#15803d"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.5"
            />
          </g>

          {/* Seaweed right */}
          <g className="animate-float" style={{ transformOrigin: "165px 180px" }}>
            <path
              d="M165 180 Q170 140 160 120 Q150 100 165 80 Q175 60 160 40"
              fill="none"
              stroke="#16a34a"
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.6"
            />
            <path
              d="M155 180 Q160 145 150 125 Q140 105 155 85"
              fill="none"
              stroke="#15803d"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.5"
            />
          </g>

          {/* Sand */}
          <ellipse cx="100" cy="190" rx="80" ry="12" fill="#fbbf24" opacity="0.5" />

          {/* Fish 1 - Orange */}
          <g className="animate-float" style={{ transformOrigin: "center" }}>
            <ellipse cx="100" cy="90" rx="28" ry="16" fill="#fb923c" />
            <path d="M72 90 L58 80 L58 100 Z" fill="#fb923c" />
            <circle cx="115" cy="86" r="3" fill="white" />
            <circle cx="115" cy="86" r="1.5" fill="#1e293b" />
            <path d="M95 90 Q105 95 115 90" fill="none" stroke="#ea580c" strokeWidth="1.5" opacity="0.4" />
            <path d="M85 85 Q95 88 105 85" fill="none" stroke="#ea580c" strokeWidth="1" opacity="0.3" />
          </g>

          {/* Fish 2 - Blue, smaller */}
          <g className="animate-float-slow" style={{ transformOrigin: "center" }}>
            <ellipse cx="50" cy="130" rx="20" ry="12" fill="#38bdf8" />
            <path d="M30 130 L20 122 L20 138 Z" fill="#38bdf8" />
            <circle cx="62" cy="127" r="2.5" fill="white" />
            <circle cx="62" cy="127" r="1.2" fill="#1e293b" />
          </g>

          {/* Fish 3 - Yellow, small */}
          <g className="animate-float" style={{ transformOrigin: "center", animationDelay: "1s" }}>
            <ellipse cx="150" cy="140" rx="16" ry="10" fill="#fbbf24" />
            <path d="M134 140 L124 133 L124 147 Z" fill="#fbbf24" />
            <circle cx="158" cy="137" r="2" fill="white" />
            <circle cx="158" cy="137" r="1" fill="#1e293b" />
          </g>

          {/* Bubbles inside SVG */}
          <circle cx="100" cy="160" r="3" fill="white" opacity="0.4" className="animate-bubble" style={{ animationDelay: "0s", animationDuration: "3s" }} />
          <circle cx="80" cy="160" r="2" fill="white" opacity="0.3" className="animate-bubble" style={{ animationDelay: "1s", animationDuration: "4s" }} />
          <circle cx="120" cy="160" r="2.5" fill="white" opacity="0.3" className="animate-bubble" style={{ animationDelay: "0.5s", animationDuration: "3.5s" }} />
        </svg>

        {/* HTML bubbles for extra effect */}
        {bubbles.map((b, i) => (
          <div
            key={i}
            className="animate-bubble absolute bottom-0 rounded-full bg-white/30"
            style={{
              left: b.left,
              width: b.size,
              height: b.size,
              animationDelay: b.delay,
              animationDuration: b.duration,
            }}
          />
        ))}

        {/* Glass reflection overlay */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-transparent" />
      </div>

      {/* Floating score badge */}
      <div className="absolute -bottom-4 -right-4 animate-float rounded-2xl border border-brand-100 bg-white px-5 py-3 shadow-xl shadow-brand-600/10">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
            <span className="text-lg font-bold text-green-600">87</span>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-400">Skor Air</p>
            <p className="text-sm font-bold text-green-600">Kondisi Aman</p>
          </div>
        </div>
      </div>
    </div>
  );
}
