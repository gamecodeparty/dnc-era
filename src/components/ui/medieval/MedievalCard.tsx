"use client";

import { forwardRef, HTMLAttributes, ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { cardHover, fadeSlideUp } from "@/lib/animations";

// =============================================================================
// MEDIEVAL CARD
// =============================================================================

interface MedievalCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  variant?: "default" | "elevated" | "bordered" | "glow";
  hoverable?: boolean;
  animated?: boolean;
  children?: ReactNode;
}

export const MedievalCard = forwardRef<HTMLDivElement, MedievalCardProps>(
  (
    {
      className,
      variant = "default",
      hoverable = false,
      animated = false,
      children,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      default: `
        bg-gradient-to-b from-medieval-bg-card to-medieval-bg-panel
        border border-medieval-primary/20
      `,
      elevated: `
        bg-gradient-to-b from-medieval-bg-parchment to-medieval-bg-card
        border border-medieval-primary/30
        shadow-lg shadow-black/40
      `,
      bordered: `
        bg-medieval-bg-card/80
        border-2 border-medieval-primary/40
      `,
      glow: `
        bg-gradient-to-b from-medieval-bg-card to-medieval-bg-panel
        border border-medieval-primary/30
        shadow-golden-glow
      `,
    };

    const baseStyles = `
      rounded-lg overflow-hidden
      backdrop-blur-sm
    `;

    const hoverProps = hoverable ? cardHover : {};
    const animationProps = animated
      ? {
          variants: fadeSlideUp,
          initial: "initial",
          animate: "animate",
        }
      : {};

    return (
      <motion.div
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], className)}
        {...hoverProps}
        {...animationProps}
        {...props}
      >
        {/* Inner glow effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
        <div className="relative">{children}</div>
      </motion.div>
    );
  }
);

MedievalCard.displayName = "MedievalCard";

// =============================================================================
// CARD HEADER
// =============================================================================

interface MedievalCardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  ornament?: boolean;
}

export const MedievalCardHeader = forwardRef<
  HTMLDivElement,
  MedievalCardHeaderProps
>(({ className, ornament = false, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "px-4 py-3 border-b border-medieval-primary/20",
      "bg-gradient-to-b from-medieval-bg-parchment/30 to-transparent",
      ornament && "header-medieval",
      className
    )}
    {...props}
  >
    {children}
  </div>
));

MedievalCardHeader.displayName = "MedievalCardHeader";

// =============================================================================
// CARD TITLE
// =============================================================================

interface MedievalCardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const MedievalCardTitle = forwardRef<
  HTMLHeadingElement,
  MedievalCardTitleProps
>(({ className, as: Tag = "h3", children, ...props }, ref) => (
  <Tag
    ref={ref}
    className={cn(
      "font-cinzel font-semibold text-medieval-text-primary",
      "flex items-center gap-2",
      className
    )}
    {...props}
  >
    {children}
  </Tag>
));

MedievalCardTitle.displayName = "MedievalCardTitle";

// =============================================================================
// CARD CONTENT
// =============================================================================

export const MedievalCardContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-3 sm:p-4", className)} {...props} />
));

MedievalCardContent.displayName = "MedievalCardContent";

// =============================================================================
// CARD FOOTER
// =============================================================================

export const MedievalCardFooter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "px-4 py-3 border-t border-medieval-primary/20",
      "bg-gradient-to-t from-medieval-bg-deep/50 to-transparent",
      className
    )}
    {...props}
  />
));

MedievalCardFooter.displayName = "MedievalCardFooter";

// =============================================================================
// STAT CARD (for resources, scores, etc.)
// =============================================================================

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  change?: number;
  color?: string;
  className?: string;
}

export function StatCard({
  icon,
  label,
  value,
  change,
  color = "text-medieval-primary",
  className,
}: StatCardProps) {
  return (
    <MedievalCard
      variant="default"
      hoverable
      className={cn("p-4", className)}
    >
      <div className="flex items-center gap-3">
        <div className={cn("p-2 rounded-lg bg-medieval-bg-deep/50", color)}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-medieval-text-muted truncate">{label}</p>
          <div className="flex items-baseline gap-2">
            <span className={cn("text-xl sm:text-2xl font-bold font-mono", color)}>
              {value}
            </span>
            {change !== undefined && (
              <span
                className={cn(
                  "text-sm font-medium",
                  change > 0 ? "text-green-400" : change < 0 ? "text-red-400" : "text-medieval-text-muted"
                )}
              >
                {change > 0 ? "+" : ""}{change}/turno
              </span>
            )}
          </div>
        </div>
      </div>
    </MedievalCard>
  );
}
