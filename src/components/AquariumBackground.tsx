import { useMemo } from "react";

/**
 * Subtle animated bubble background for page sections.
 */
export default function AquariumBackground({ density = 15 }: { density?: number }) {
  const bubbles = useMemo(
    () =>
      Array.from({ length: density }, () => ({
        left: `${Math.random() * 100}%`,
        size: 4 + Math.random() * 20,
        delay: `${Math.random() * 5}s`,
        duration: `${4 + Math.random() * 6}s`,
      })),
    [density]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {bubbles.map((b, i) => (
        <div
          key={i}
          className="animate-bubble absolute bottom-0 rounded-full bg-brand-200/30"
          style={{
            left: b.left,
            width: b.size,
            height: b.size,
            animationDelay: b.delay,
            animationDuration: b.duration,
          }}
        />
      ))}
    </div>
  );
}
