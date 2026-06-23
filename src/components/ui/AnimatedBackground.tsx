"use client";

import { useEffect, useState, useId } from "react";

/* ─── Particle shape ─── */
interface Particle {
  id: number;
  x: number;       // left %
  y: number;       // top %
  size: number;    // 0.5 – 3 px  (depth effect)
  duration: number; // 15 – 55 s   (speed variation)
  delay: number;   // 0 – 12 s    (stagger)
  driftX: number;  // sideways drift in px (-40 to 40)
  driftY: number;  // upward drift in px  (-60 to -120)
  peakOpacity: number; // 0.3 – 1.0
}

/* ─── Component ─── */
export function AnimatedBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const instanceId = useId(); // unique per mount to namespace the CSS

  useEffect(() => {
    // Generate particles ONLY on client to avoid hydration mismatch
    const count = 180;
    const generated: Particle[] = Array.from({ length: count }, (_, i) => {
      const size = Math.random() * 2.5 + 0.5; // 0.5 → 3 px
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size,
        duration: Math.random() * 40 + 15,      // 15s – 55s
        delay: Math.random() * 12,               // stagger up to 12s
        driftX: (Math.random() - 0.5) * 80,      // -40 → 40 px
        driftY: -(Math.random() * 60 + 60),      // -60 → -120 px (upward)
        peakOpacity: size > 2 ? 0.9 : size > 1 ? 0.6 : 0.35, // bigger = brighter
      };
    });
    setParticles(generated);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-black">
      {/* Subtle amber radial glow at center */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,_rgba(249,115,22,0.04)_0%,_transparent_65%)]" />

      {/* Inject one shared set of @keyframes, scoped to this mount */}
      <style>{`
        @keyframes starDrift {
          0%   { transform: translate(0, 0) scale(1);              opacity: 0.05; }
          50%  { transform: translate(var(--dx), var(--dy)) scale(1.4); opacity: var(--peak); }
          100% { transform: translate(0, 0) scale(1);              opacity: 0.05; }
        }
      `}</style>

      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            width: p.size,
            height: p.size,
            top: `${p.y}%`,
            left: `${p.x}%`,
            boxShadow: `0 0 ${p.size * 3}px rgba(249, 115, 22, 0.6)`,
            willChange: "transform, opacity",
            // CSS custom properties drive the keyframes
            "--dx": `${p.driftX}px`,
            "--dy": `${p.driftY}px`,
            "--peak": `${p.peakOpacity}`,
            animation: `starDrift ${p.duration}s ${p.delay}s ease-in-out infinite`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
