import { cn } from "../../../../lib/utils";
import React from "react";

/**
 * @typedef {Object} AuroraBackgroundProps
 * @property {React.ReactNode} children
 * @property {boolean} [showRadialGradient=true]
 * @property {string} [className]
 */

/**
 * Aurora Background Component
 * @param {AuroraBackgroundProps & React.HTMLAttributes<HTMLDivElement>} props
 */
export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}) => {
  return (
    <main className="fixed inset-0 w-full h-full overflow-auto">
      <div
        className={cn(
          "transition-bg relative flex min-h-screen w-full flex-col bg-zinc-50 text-slate-950 dark:bg-zinc-900",
          className,
        )}
        {...props}
      >
        <div
          className="absolute inset-0 overflow-hidden w-full h-full"
          style={{
            "--aurora":
              "repeating-linear-gradient(100deg,#8b5cf6_10%,#a855f7_15%,#9333ea_20%,#7c3aed_25%,#6d28d9_30%)",
            "--dark-gradient":
              "repeating-linear-gradient(100deg,#0f0f23_0%,#1a1a2e_7%,transparent_10%,transparent_12%,#0f0f23_16%)",
            "--white-gradient":
              "repeating-linear-gradient(100deg,#16213e_0%,#1a1a2e_7%,transparent_10%,transparent_12%,#16213e_16%)",

            "--purple-300": "#c4b5fd",
            "--purple-400": "#a78bfa",
            "--purple-500": "#8b5cf6",
            "--purple-600": "#7c3aed",
            "--purple-700": "#6d28d9",
            "--gold-400": "#facc15",
            "--gold-500": "#eab308",
            "--crimson-500": "#dc2626",
            "--dark-purple": "#0f0f23",
            "--darker-purple": "#16213e",
            "--transparent": "transparent",
          }}
        >
          <div
            className={cn(
              `after:animate-aurora pointer-events-none absolute inset-0 w-full h-full [background-image:var(--white-gradient),var(--aurora)] [background-size:400%,_300%] [background-position:50%_50%,50%_50%] opacity-60 blur-[12px] filter will-change-transform [--aurora:repeating-linear-gradient(100deg,var(--purple-500)_10%,var(--purple-600)_15%,var(--purple-700)_20%,var(--purple-400)_25%,var(--purple-500)_30%)] [--dark-gradient:repeating-linear-gradient(100deg,var(--dark-purple)_0%,var(--darker-purple)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--dark-purple)_16%)] [--white-gradient:repeating-linear-gradient(100deg,var(--darker-purple)_0%,var(--dark-purple)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--darker-purple)_16%)] after:absolute after:inset-0 after:w-full after:h-full after:[background-image:var(--white-gradient),var(--aurora)] after:[background-size:300%,_200%] after:[background-attachment:fixed] after:mix-blend-screen after:content-[""] dark:[background-image:var(--dark-gradient),var(--aurora)] after:dark:[background-image:var(--dark-gradient),var(--aurora)]`,

              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_center,black_20%,var(--transparent)_90%)]`,
            )}
          ></div>
        </div>
        {children}
      </div>
    </main>
  );
};