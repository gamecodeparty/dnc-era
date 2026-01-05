"use client";

import { forwardRef, HTMLAttributes, ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeSlideUp, staggerContainer, staggerItem } from "@/lib/animations";

// =============================================================================
// PARCHMENT PANEL
// =============================================================================

interface ParchmentPanelProps extends Omit<HTMLMotionProps<"div">, "children"> {
  variant?: "default" | "aged" | "burned";
  withNoise?: boolean;
  animated?: boolean;
  children?: ReactNode;
}

export const ParchmentPanel = forwardRef<HTMLDivElement, ParchmentPanelProps>(
  (
    {
      className,
      variant = "default",
      withNoise = true,
      animated = false,
      children,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      default: `
        bg-gradient-to-b from-medieval-bg-parchment to-medieval-bg-card
        border border-medieval-primary/30
      `,
      aged: `
        bg-gradient-to-br from-medieval-bg-parchment via-medieval-bg-card to-medieval-bg-parchment
        border border-medieval-primary/20
      `,
      burned: `
        bg-gradient-to-b from-medieval-bg-card to-medieval-bg-deep
        border border-medieval-accent/20
      `,
    };

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
        className={cn(
          "relative rounded-lg overflow-hidden",
          "shadow-[inset_0_1px_0_rgba(212,165,116,0.1),0_4px_12px_rgba(0,0,0,0.4)]",
          variantStyles[variant],
          className
        )}
        {...animationProps}
        {...props}
      >
        {/* Noise texture overlay */}
        {withNoise && (
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
        )}

        {/* Edge darkening */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/10 via-transparent to-black/20" />

        {/* Content */}
        <div className="relative">{children}</div>
      </motion.div>
    );
  }
);

ParchmentPanel.displayName = "ParchmentPanel";

// =============================================================================
// PANEL HEADER
// =============================================================================

interface PanelHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function PanelHeader({
  title,
  subtitle,
  icon,
  action,
  className,
  ...props
}: PanelHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4",
        "px-4 py-3 border-b border-medieval-primary/20",
        "bg-gradient-to-b from-medieval-bg-parchment/40 to-transparent",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-3">
        {icon && (
          <div className="p-1.5 rounded bg-medieval-bg-deep/30 text-medieval-primary">
            {icon}
          </div>
        )}
        <div>
          <h3 className="font-cinzel font-semibold text-medieval-text-primary">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-medieval-text-muted">{subtitle}</p>
          )}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

// =============================================================================
// PANEL CONTENT
// =============================================================================

export const PanelContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-4", className)} {...props} />
));

PanelContent.displayName = "PanelContent";

// =============================================================================
// PANEL SECTION
// =============================================================================

interface PanelSectionProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export function PanelSection({
  title,
  children,
  className,
  ...props
}: PanelSectionProps) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {title && (
        <h4 className="text-xs font-medium uppercase tracking-wider text-medieval-text-muted px-1">
          {title}
        </h4>
      )}
      {children}
    </div>
  );
}

// =============================================================================
// ANIMATED LIST
// =============================================================================

interface AnimatedListProps extends HTMLAttributes<HTMLUListElement> {
  stagger?: boolean;
}

export function AnimatedList({
  children,
  stagger = true,
  className,
  ...props
}: AnimatedListProps) {
  return (
    <motion.ul
      className={cn("space-y-2", className)}
      variants={stagger ? staggerContainer : undefined}
      initial="initial"
      animate="animate"
      {...(props as any)}
    >
      {children}
    </motion.ul>
  );
}

interface AnimatedListItemProps extends HTMLMotionProps<"li"> {}

export function AnimatedListItem({
  children,
  className,
  ...props
}: AnimatedListItemProps) {
  return (
    <motion.li
      className={className}
      variants={staggerItem}
      {...props}
    >
      {children}
    </motion.li>
  );
}

// =============================================================================
// INFO ROW
// =============================================================================

interface InfoRowProps {
  label: string;
  value: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export function InfoRow({ label, value, icon, className }: InfoRowProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between py-2",
        "border-b border-medieval-primary/10 last:border-0",
        className
      )}
    >
      <div className="flex items-center gap-2 text-medieval-text-secondary">
        {icon && <span className="text-medieval-primary">{icon}</span>}
        <span>{label}</span>
      </div>
      <div className="font-medium text-medieval-text-primary">{value}</div>
    </div>
  );
}

// =============================================================================
// SCROLL PANEL (for long content)
// =============================================================================

interface ScrollPanelProps {
  children?: ReactNode;
  maxHeight?: string;
  className?: string;
}

export function ScrollPanel({
  children,
  maxHeight = "300px",
  className,
}: ScrollPanelProps) {
  return (
    <ParchmentPanel className={cn("overflow-hidden", className)}>
      <div
        className="overflow-y-auto scrollbar-thin"
        style={{ maxHeight }}
      >
        {children}
      </div>
    </ParchmentPanel>
  );
}
