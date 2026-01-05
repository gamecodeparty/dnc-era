"use client";

import { cn } from "@/lib/utils";

// =============================================================================
// ORNAMENT DIVIDER
// =============================================================================

interface OrnamentDividerProps {
  variant?: "default" | "diamond" | "sword" | "dots";
  size?: "sm" | "md" | "lg";
  color?: string;
  className?: string;
}

export function OrnamentDivider({
  variant = "default",
  size = "md",
  color = "#d4a574",
  className,
}: OrnamentDividerProps) {
  const sizeStyles = {
    sm: "h-3",
    md: "h-4",
    lg: "h-6",
  };

  const lineWidth = {
    sm: "30%",
    md: "35%",
    lg: "40%",
  };

  return (
    <div
      className={cn(
        "relative w-full flex items-center justify-center",
        sizeStyles[size],
        className
      )}
    >
      {/* Left line */}
      <div
        className="absolute left-0 top-1/2 h-px"
        style={{
          width: lineWidth[size],
          background: `linear-gradient(90deg, transparent 0%, ${color} 100%)`,
        }}
      />

      {/* Center ornament */}
      <div className="relative z-10">
        {variant === "default" && <DefaultOrnament color={color} size={size} />}
        {variant === "diamond" && <DiamondOrnament color={color} size={size} />}
        {variant === "sword" && <SwordOrnament color={color} size={size} />}
        {variant === "dots" && <DotsOrnament color={color} size={size} />}
      </div>

      {/* Right line */}
      <div
        className="absolute right-0 top-1/2 h-px"
        style={{
          width: lineWidth[size],
          background: `linear-gradient(90deg, ${color} 0%, transparent 100%)`,
        }}
      />
    </div>
  );
}

// =============================================================================
// ORNAMENT VARIANTS
// =============================================================================

interface OrnamentProps {
  color: string;
  size: "sm" | "md" | "lg";
}

function DefaultOrnament({ color, size }: OrnamentProps) {
  const iconSize = { sm: 8, md: 12, lg: 16 };
  const s = iconSize[size];

  return (
    <svg width={s * 3} height={s} viewBox="0 0 36 12" fill="none">
      <path
        d="M0 6h12l6-6 6 6h12"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="18" cy="6" r="2" fill={color} />
    </svg>
  );
}

function DiamondOrnament({ color, size }: OrnamentProps) {
  const iconSize = { sm: 6, md: 8, lg: 12 };
  const s = iconSize[size];

  return (
    <div
      className="rotate-45"
      style={{
        width: s,
        height: s,
        backgroundColor: color,
      }}
    />
  );
}

function SwordOrnament({ color, size }: OrnamentProps) {
  const iconSize = { sm: 16, md: 24, lg: 32 };
  const s = iconSize[size];

  return (
    <svg width={s * 2} height={s} viewBox="0 0 48 24" fill="none">
      {/* Left sword */}
      <path
        d="M4 12L16 4v4h4v8h-4v4L4 12z"
        fill={color}
        opacity="0.8"
      />
      {/* Right sword */}
      <path
        d="M44 12L32 4v4h-4v8h4v4L44 12z"
        fill={color}
        opacity="0.8"
      />
      {/* Center diamond */}
      <rect
        x="20"
        y="8"
        width="8"
        height="8"
        fill={color}
        transform="rotate(45 24 12)"
      />
    </svg>
  );
}

function DotsOrnament({ color, size }: OrnamentProps) {
  const dotSize = { sm: 3, md: 4, lg: 6 };
  const gap = { sm: 4, md: 6, lg: 8 };
  const s = dotSize[size];
  const g = gap[size];

  return (
    <div className="flex items-center" style={{ gap: g }}>
      <div
        className="rounded-full"
        style={{ width: s, height: s, backgroundColor: color, opacity: 0.5 }}
      />
      <div
        className="rounded-full"
        style={{ width: s * 1.5, height: s * 1.5, backgroundColor: color }}
      />
      <div
        className="rounded-full"
        style={{ width: s, height: s, backgroundColor: color, opacity: 0.5 }}
      />
    </div>
  );
}

// =============================================================================
// SECTION DIVIDER (with optional title)
// =============================================================================

interface SectionDividerProps {
  title?: string;
  variant?: "default" | "diamond" | "sword" | "dots";
  className?: string;
}

export function SectionDivider({
  title,
  variant = "default",
  className,
}: SectionDividerProps) {
  if (!title) {
    return <OrnamentDivider variant={variant} className={className} />;
  }

  return (
    <div className={cn("relative flex items-center gap-4 py-2", className)}>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-medieval-primary/50 to-medieval-primary/50" />
      <span className="font-cinzel text-sm text-medieval-text-muted uppercase tracking-wider px-2">
        {title}
      </span>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-medieval-primary/50 to-medieval-primary/50" />
    </div>
  );
}

// =============================================================================
// CORNER ORNAMENTS
// =============================================================================

interface CornerOrnamentsProps {
  color?: string;
  size?: number;
  className?: string;
}

export function CornerOrnaments({
  color = "#d4a574",
  size = 16,
  className,
}: CornerOrnamentsProps) {
  const cornerStyle = {
    width: size,
    height: size,
    borderColor: color,
    borderWidth: 2,
  };

  return (
    <div className={cn("absolute inset-0 pointer-events-none", className)}>
      {/* Top left */}
      <div
        className="absolute top-2 left-2 border-t border-l"
        style={cornerStyle}
      />
      {/* Top right */}
      <div
        className="absolute top-2 right-2 border-t border-r"
        style={cornerStyle}
      />
      {/* Bottom left */}
      <div
        className="absolute bottom-2 left-2 border-b border-l"
        style={cornerStyle}
      />
      {/* Bottom right */}
      <div
        className="absolute bottom-2 right-2 border-b border-r"
        style={cornerStyle}
      />
    </div>
  );
}

// =============================================================================
// FRAME (border with ornaments)
// =============================================================================

interface FrameProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

export function Frame({ children, color = "#d4a574", className }: FrameProps) {
  return (
    <div
      className={cn(
        "relative p-4 border-2 rounded-lg",
        className
      )}
      style={{ borderColor: `${color}40` }}
    >
      <CornerOrnaments color={color} />
      {children}
    </div>
  );
}
