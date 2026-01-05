"use client";

import { forwardRef, ButtonHTMLAttributes, ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { buttonHover, transitions } from "@/lib/animations";
import { Loader2 } from "lucide-react";

// =============================================================================
// TYPES
// =============================================================================

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg" | "icon";

interface MedievalButtonProps
  extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  children?: ReactNode;
}

// =============================================================================
// STYLES
// =============================================================================

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-gradient-to-b from-medieval-primary to-medieval-primary/80
    text-medieval-bg-deep font-semibold
    border-2 border-medieval-primary-bright/50
    hover:from-medieval-primary-bright hover:to-medieval-primary
    hover:border-medieval-primary-bright
    hover:shadow-golden-glow
    active:from-medieval-primary/90 active:to-medieval-primary/70
  `,
  secondary: `
    bg-gradient-to-b from-medieval-bg-parchment to-medieval-bg-card
    text-medieval-text-primary
    border-2 border-medieval-primary/40
    hover:border-medieval-primary hover:from-medieval-bg-parchment hover:to-medieval-bg-parchment
    hover:shadow-golden-glow
    active:from-medieval-bg-card active:to-medieval-bg-panel
  `,
  danger: `
    bg-gradient-to-b from-medieval-accent/80 to-medieval-accent/60
    text-white font-semibold
    border-2 border-medieval-accent/50
    hover:from-medieval-accent hover:to-medieval-accent/80
    hover:border-medieval-accent
    hover:shadow-crimson-glow
    active:from-medieval-accent/70 active:to-medieval-accent/50
  `,
  ghost: `
    bg-transparent
    text-medieval-text-secondary
    border-2 border-transparent
    hover:bg-medieval-bg-card/50 hover:text-medieval-text-primary
    hover:border-medieval-primary/20
    active:bg-medieval-bg-card/70
  `,
  outline: `
    bg-transparent
    text-medieval-primary
    border-2 border-medieval-primary/50
    hover:bg-medieval-primary/10 hover:border-medieval-primary
    active:bg-medieval-primary/20
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-5 py-2.5 text-base gap-2",
  lg: "px-8 py-4 text-lg gap-3",
  icon: "p-2.5",
};

// =============================================================================
// COMPONENT
// =============================================================================

export const MedievalButton = forwardRef<HTMLButtonElement, MedievalButtonProps>(
  (
    {
      className,
      variant = "secondary",
      size = "md",
      loading = false,
      disabled,
      icon,
      iconPosition = "left",
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <motion.button
        ref={ref}
        className={cn(
          // Base styles
          "relative inline-flex items-center justify-center",
          "font-cinzel uppercase tracking-wide",
          "rounded transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-medieval-primary/50 focus:ring-offset-2 focus:ring-offset-medieval-bg-deep",
          // Shadow
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_4px_8px_rgba(0,0,0,0.3)]",
          // Variant & size
          variantStyles[variant],
          sizeStyles[size],
          // Disabled state
          isDisabled && "opacity-50 cursor-not-allowed pointer-events-none",
          className
        )}
        disabled={isDisabled}
        whileHover={isDisabled ? undefined : { scale: 1.02 }}
        whileTap={isDisabled ? undefined : { scale: 0.98 }}
        transition={transitions.springBouncy}
        {...props}
      >
        {/* Loading spinner */}
        {loading && (
          <Loader2 className="w-4 h-4 animate-spin absolute" />
        )}

        {/* Content wrapper */}
        <span
          className={cn(
            "inline-flex items-center gap-2",
            loading && "invisible"
          )}
        >
          {icon && iconPosition === "left" && (
            <span className="flex-shrink-0">{icon}</span>
          )}
          {children}
          {icon && iconPosition === "right" && (
            <span className="flex-shrink-0">{icon}</span>
          )}
        </span>
      </motion.button>
    );
  }
);

MedievalButton.displayName = "MedievalButton";

// =============================================================================
// ICON BUTTON
// =============================================================================

interface IconButtonProps extends Omit<MedievalButtonProps, "children" | "icon"> {
  icon: ReactNode;
  label: string; // For accessibility
}

export const MedievalIconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, label, size = "icon", ...props }, ref) => (
    <MedievalButton
      ref={ref}
      size={size}
      aria-label={label}
      {...props}
    >
      {icon}
    </MedievalButton>
  )
);

MedievalIconButton.displayName = "MedievalIconButton";

// =============================================================================
// BUTTON GROUP
// =============================================================================

interface ButtonGroupProps {
  children: ReactNode;
  className?: string;
}

export function MedievalButtonGroup({ children, className }: ButtonGroupProps) {
  return (
    <div
      className={cn(
        "inline-flex rounded overflow-hidden",
        "border-2 border-medieval-primary/40",
        "[&>button]:rounded-none [&>button]:border-0",
        "[&>button:not(:last-child)]:border-r [&>button:not(:last-child)]:border-medieval-primary/30",
        className
      )}
    >
      {children}
    </div>
  );
}

// =============================================================================
// LINK BUTTON (styled as button but with link behavior)
// =============================================================================

interface LinkButtonProps extends MedievalButtonProps {
  href: string;
}

export const MedievalLinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (
    {
      className,
      variant = "secondary",
      size = "md",
      icon,
      iconPosition = "left",
      children,
      href,
      ...props
    },
    ref
  ) => {
    return (
      <motion.a
        ref={ref}
        href={href}
        className={cn(
          "relative inline-flex items-center justify-center",
          "font-cinzel uppercase tracking-wide",
          "rounded transition-colors no-underline",
          "focus:outline-none focus:ring-2 focus:ring-medieval-primary/50",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_4px_8px_rgba(0,0,0,0.3)]",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={transitions.springBouncy}
        {...(props as any)}
      >
        <span className="inline-flex items-center gap-2">
          {icon && iconPosition === "left" && (
            <span className="flex-shrink-0">{icon}</span>
          )}
          {children}
          {icon && iconPosition === "right" && (
            <span className="flex-shrink-0">{icon}</span>
          )}
        </span>
      </motion.a>
    );
  }
);

MedievalLinkButton.displayName = "MedievalLinkButton";
