import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../../lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import { BadgePrimitive } from "../../ui/badge";
import { KbdPrimitive } from "../../ui/kbd";
import { Loader2 } from "lucide-react";
import { buttonVariants } from "./button-variants";
import { badgeVariantsPrimitive } from "../../ui/badge/badge-variants";
import type { VariantProps } from "class-variance-authority";

// Button shape variants
const buttonTypeStyles = {
  rounded: "rounded-md",
  square: "rounded-none",
  circle: "rounded-full",
} as const;

// Badge position classes
const badgePositionClasses = {
  "top-left": "-top-1.5 -left-1.5",
  "top-right": "-top-1.5 -right-1.5",
  "bottom-left": "-bottom-1.5 -left-1.5",
  "bottom-right": "-bottom-1.5 -right-1.5",
} as const;

interface ButtonProps extends React.ComponentProps<"button"> {
  badgeClassName?: string;
  badgeVariant?: VariantProps<typeof badgeVariantsPrimitive>;
  keyboardShortcutClassName?: string;
  /**
   * Button visual style variant
   * @default "default"
   */
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";

  /**
   * Button size variant
   * @default "default"
   */
  size?: "default" | "sm" | "lg" | "icon";

  /**
   * Icon to display in the button
   * @example icon={<Save className="size-4" />}
   */
  icon?: React.ReactNode;

  /**
   * Position of the icon relative to text
   * @default "left"
   */
  iconsPosition?: "left" | "right";

  /**
   * Show loading state with spinner
   * @default false
   */
  loading?: boolean;

  /**
   * Text to display while loading (replaces button children)
   * @example loadingText="Saving..."
   */
  loadingText?: string;

  /**
   * Custom loading icon (defaults to spinner)
   * @example loadingIcon={<Spinner />}
   */
  loadingIcon?: React.ReactNode;

  /**
   * Button shape/border radius style
   * @default "rounded"
   */
  shape?: "square" | "circle" | "rounded";

  /**
   * Badge content to display on button (notification count, etc.)
   * @example badge="5" or badge="New"
   */
  badge?: string | number;

  /**
   * Position of the badge
   * @default "top-right"
   */
  badgePosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right";

  /**
   * Keyboard shortcut to display
   * @example shortcut="⌘K" or shortcut="Ctrl+S"
   */
  shortcut?: string;

  /**
   * Show shortcut in button (if false, only in tooltip)
   * @default false
   */
  showShortcut?: boolean;

  /**
   * Tooltip content (shows on hover)
   * @example tooltip="Save changes"
   */
  tooltip?: React.ReactNode;

  /**
   * Tooltip side position
   * @default "top"
   */
  tooltipSide?: "top" | "right" | "bottom" | "left";

  /**
   * Additional className for the button
   */
  className?: string;

  /**
   * Render as child component (using Slot from Radix UI)
   * @default false
   */
  asChild?: boolean;

  /**
   * Button children/content
   */
  children?: React.ReactNode;
}

/**
 * Button Component - A highly customizable button with loading states, icons, badges, tooltips, and keyboard shortcuts
 *
 * Features:
 * - Multiple variants (default, destructive, outline, secondary, ghost, link)
 * - Multiple sizes (sm, default, lg, icon)
 * - Loading states with custom text and spinner
 * - Icons with left/right positioning
 * - Badge notifications
 * - Keyboard shortcuts display
 * - Tooltip integration
 * - Custom shapes (rounded, square, circle)
 * - Full accessibility support
 *
 * @example
 * // Basic button
 * <Button>Click me</Button>
 *
 * @example
 * // Button with icon and loading state
 * <Button icon={<Save />} loading loadingText="Saving...">Save</Button>
 *
 * @example
 * // Icon-only button with tooltip
 * <Button size="icon" tooltip="Settings"><Settings /></Button>
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      badgeClassName,
      badgeVariant = "default",
      keyboardShortcutClassName,
      variant = "default",
      size = "default",
      icon,
      iconsPosition = "left",
      loading = false,
      loadingText,
      loadingIcon,
      shape = "rounded",
      badge,
      badgePosition = "top-right",
      shortcut,
      showShortcut = false,
      tooltip,
      tooltipSide = "top",
      asChild = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    // Default loading icon
    const defaultLoadingIcon = <Loader2 className="size-4 animate-spin" />;
    const spinnerIcon = loadingIcon || defaultLoadingIcon;

    // Build button content
    const buttonContent = (
      <>
        {/* Icon on left or loading spinner */}
        {loading && iconsPosition === "left" && spinnerIcon}
        {!loading && icon && iconsPosition === "left" && icon}

        {/* Button text or loading text */}
        {loading && loadingText ? (
          <span>{loadingText}</span>
        ) : (
          children && <span>{children}</span>
        )}

        {/* Keyboard shortcut display */}
        {showShortcut && shortcut && !loading && (
          <KbdPrimitive className={keyboardShortcutClassName}>
            {shortcut}
          </KbdPrimitive>
        )}

        {/* Icon on right */}
        {loading && iconsPosition === "right" && spinnerIcon}
        {!loading && icon && iconsPosition === "right" && icon}
      </>
    );

    // Button with optional badge wrapper
    const buttonWithBadge =
      badge !== undefined ? (
        <div className="relative inline-block">
          <Comp
            ref={ref}
            className={cn(
              buttonVariants({ variant, size }),
              buttonTypeStyles[shape],
              className
            )}
            disabled={disabled || loading}
            {...props}
          >
            {buttonContent}
          </Comp>
          <BadgePrimitive
            className={cn(
              "absolute h-5 min-w-5 rounded-full px-1 text-xs flex items-center justify-center pointer-events-none",
              badgePositionClasses[badgePosition],
              badgeClassName
            )}
            variant={
              badgeVariant as VariantProps<
                typeof badgeVariantsPrimitive
              >["variant"]
            }
          >
            {badge}
          </BadgePrimitive>
        </div>
      ) : (
        <Comp
          ref={ref}
          className={cn(
            buttonVariants({ variant, size }),
            buttonTypeStyles[shape],
            className
          )}
          disabled={disabled || loading}
          {...props}
        >
          {buttonContent}
        </Comp>
      );

    // Wrap with tooltip if provided
    if (tooltip) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>{buttonWithBadge}</TooltipTrigger>
          <TooltipContent side={tooltipSide}>
            <div className="flex items-center gap-2">
              <span>{tooltip}</span>
              {shortcut && !showShortcut && (
                <KbdPrimitive className={keyboardShortcutClassName}>
                  {shortcut}
                </KbdPrimitive>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      );
    }

    return buttonWithBadge;
  }
);

Button.displayName = "Button";

export { Button };
