import React from "react";

import { cn } from "../../../lib/utils";
import { AvatarFallback, Avatar as RkitAvatar, AvatarImage } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";

// Size configurations - predefined for Tailwind JIT compilation
const sizeStyles = {
  xs: "size-6 text-xs",
  small: "size-8 text-sm",
  medium: "size-10 text-base",
  large: "size-12 text-lg",
  xl: "size-16 text-xl",
  "2xl": "size-20 text-2xl",
} as const;

// Status indicator styles - predefined status colors
const statusStyles = {
  online: "bg-green-500",
  offline: "bg-gray-400",
  busy: "bg-destructive",
  away: "bg-yellow-500",
  dnd: "bg-red-600",
} as const;

// Ring width styles - complete classes for Tailwind JIT
const ringWidthStyles = {
  1: "ring-1",
  2: "ring-2",
  3: "ring-3",
  4: "ring-4",
} as const;

// Ring offset width styles - complete classes for Tailwind JIT
const ringOffsetStyles = {
  1: "ring-offset-1",
  2: "ring-offset-2",
  4: "ring-offset-4",
} as const;

// Status indicator position classes - predefined for consistency
const statusPositionClasses = {
  "bottom-right": "-end-0.5 -bottom-0.5",
  "bottom-left": "-start-0.5 -bottom-0.5",
  "top-right": "-end-0.5 -top-0.5",
  "top-left": "-start-0.5 -top-0.5",
} as const;

// Badge position classes - predefined for consistency
const badgePositionClasses = {
  "top-right": "-end-2.5 -top-2.5",
  "top-left": "-start-2.5 -top-2.5",
  "bottom-right": "-end-2.5 -bottom-2.5",
  "bottom-left": "-start-2.5 -bottom-2.5",
} as const;

// Base props that all avatar types share
interface AvatarBaseProps {
  /**
   * Image source URL for the avatar
   * @example src="https://example.com/avatar.jpg" or src="/images/user.png"
   */
  src?: string;

  /**
   * Alt text for the avatar image - improves accessibility
   * @example alt="John Doe profile picture"
   * @default "Avatar"
   */
  alt?: string;

  /**
   * Fallback text displayed when image fails to load (typically user initials)
   * @example fallback="JD" or fallback="AB"
   */
  fallback?: string;

  /**
   * Custom icon component to display instead of image or text fallback
   * @example icon={<UserIcon className="size-4" />}
   */
  icon?: React.ReactNode;

  /**
   * Additional Tailwind classes for the avatar container
   * @example className="cursor-pointer hover:opacity-80"
   */
  className?: string;

  /**
   * Additional Tailwind classes for the avatar image element
   * @example imageClassName="object-cover grayscale"
   */
  imageClassName?: string;

  /**
   * Additional Tailwind classes for the fallback element
   * @example fallbackClassName="bg-blue-500 text-white font-bold"
   */
  fallbackClassName?: string;

  /**
   * Avatar shape - round (circular) or square (with rounded corners)
   * @default "round"
   */
  shape?: "round" | "square";

  /**
   * Predefined avatar size - controls both width/height and text size
   * xs=24px, small=32px, medium=40px, large=48px, xl=64px, 2xl=80px
   * @default "medium"
   */
  size?: "xs" | "small" | "medium" | "large" | "xl" | "2xl";

  /**
   * Enable ring border around the avatar
   * @default false
   */
  showRing?: boolean;

  /**
   * Tailwind ring color class - only applies when showRing is true
   * @example ringClassName="ring-blue-500" or ringClassName="ring-primary"
   * @default "ring-ring"
   */
  ringClassName?: string;

  /**
   * Ring border width (1-4) - only applies when showRing is true
   * @default 2
   */
  ringWidth?: 1 | 2 | 3 | 4;

  /**
   * Add spacing between avatar and ring - only applies when showRing is true
   * @default false
   */
  ringOffset?: boolean;

  /**
   * Ring offset spacing width - only applies when ringOffset is true
   * @default 2
   */
  ringOffsetWidth?: 1 | 2 | 4;
}

// Props for tooltip functionality
interface AvatarTooltipProps {
  /**
   * Enable tooltip on hover - requires tooltipContent to be provided
   * @default false
   */
  showTooltip?: boolean;

  /**
   * Content displayed inside the tooltip (can be text or React components)
   * @example tooltipContent="John Doe" or tooltipContent={<div>Custom content</div>}
   */
  tooltipContent?: React.ReactNode;

  /**
   * Tooltip position relative to the avatar
   * @default "top"
   */
  tooltipSide?: "top" | "right" | "bottom" | "left";
}

// Props for status indicator
interface AvatarStatusProps {
  /**
   * Enable status indicator dot on the avatar
   * @default false
   */
  showStatus?: boolean;

  /**
   * Predefined status types with semantic colors
   * online=green, offline=gray, busy=red, away=yellow, dnd=dark-red
   * @default "online"
   */
  status?: "online" | "offline" | "busy" | "away" | "dnd";

  /**
   * Custom Tailwind background color class for status indicator (overrides status prop)
   * @example statusClassName="bg-purple-500" or statusClassName="bg-gradient-to-r from-pink-500 to-purple-500"
   */
  statusClassName?: string;

  /**
   * Position of the status indicator dot
   * @default "bottom-right"
   */
  statusPosition?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
}

// Props for badge (notification count, etc.)
interface AvatarBadgeProps {
  /**
   * Enable badge overlay on the avatar (typically for notification counts)
   * @default false
   */
  showBadge?: boolean;

  /**
   * Content displayed inside the badge (number, text, or icon)
   * @example badgeContent={5} or badgeContent="New" or badgeContent={<Icon />}
   */
  badgeContent?: React.ReactNode;

  /**
   * Badge visual style variant from shadcn/ui
   * @default "destructive"
   */
  badgeVariant?: "default" | "destructive" | "outline" | "secondary";

  /**
   * Position of the badge relative to avatar
   * @default "top-right"
   */
  badgePosition?: "top-right" | "top-left" | "bottom-right" | "bottom-left";

  /**
   * Additional Tailwind classes for badge customization
   * @example badgeClassName="bg-blue-500 text-xs"
   */
  badgeClassName?: string;
}

// Props for progress ring
interface AvatarProgressProps {
  /**
   * Enable circular progress ring around the avatar
   * @default false
   */
  showProgress?: boolean;

  /**
   * Progress value from 0 to 100 (percentage)
   * @example progress={75} for 75% complete
   */
  progress?: number;

  /**
   * Color of the progress ring (accepts any CSS color)
   * @example progressColor="#1e90ff" or progressColor="rgb(30, 144, 255)"
   * @default "#1e90ff"
   */
  progressColor?: string;

  /**
   * Thickness/width of the progress ring (affects scale multiplier)
   * Higher values create thicker, more prominent rings
   * @default 3
   */
  progressThickness?: number;
}

// Combine all props
export type AvatarProps = AvatarBaseProps &
  AvatarTooltipProps &
  AvatarStatusProps &
  AvatarBadgeProps &
  AvatarProgressProps;

/**
 * Avatar Component - A highly customizable avatar with multiple features
 *
 * Features:
 * - Multiple sizes (xs to 2xl)
 * - Shape options (round/square)
 * - Ring borders with customization
 * - Status indicators (online, offline, busy, away, dnd)
 * - Badge notifications
 * - Progress ring
 * - Tooltip support
 * - Fallback text or icon
 *
 * @example
 * // Basic usage
 * <Avatar src="/user.jpg" alt="User" fallback="JD" />
 *
 * @example
 * // With all features
 * <Avatar
 *   src="/user.jpg"
 *   fallback="JD"
 *   size="large"
 *   showRing
 *   showStatus
 *   status="online"
 *   showBadge
 *   badgeContent={5}
 *   showProgress
 *   progress={75}
 *   showTooltip
 *   tooltipContent="John Doe"
 * />
 */
const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt = "Avatar",
      fallback,
      icon,
      className,
      imageClassName,
      fallbackClassName,
      shape = "round",
      size = "medium",
      showRing = false,
      ringClassName = "ring-ring",
      ringWidth = 2,
      ringOffset = false,
      ringOffsetWidth = 2,
      showTooltip = false,
      tooltipContent,
      tooltipSide = "top",
      showStatus = false,
      status = "online",
      statusClassName,
      statusPosition = "bottom-right",
      showBadge = false,
      badgeContent,
      badgeVariant = "destructive",
      badgePosition = "top-right",
      badgeClassName,
      showProgress = false,
      progress = 0,
      progressColor = "#1e90ff",
      progressThickness = 3,
    },
    ref
  ) => {
    // Build avatar className with proper Tailwind classes
    const avatarClassName = cn(
      sizeStyles[size],
      shape === "square" && "rounded-sm",
      showRing && [
        ringWidthStyles[ringWidth],
        ringClassName,
        ringOffset && ringOffsetStyles[ringOffsetWidth],
      ],
      className
    );

    // Build image className
    const imgClassName = cn(shape === "square" && "rounded-sm", imageClassName);

    // Calculate if we need a wrapper div
    const needsWrapper = showStatus || showBadge || showProgress;

    // Render the base avatar component
    const avatarElement = (
      <RkitAvatar className={avatarClassName}>
        {src && <AvatarImage src={src} alt={alt} className={imgClassName} />}
        {(fallback || icon) && (
          <AvatarFallback className={fallbackClassName}>
            {icon || fallback}
          </AvatarFallback>
        )}
      </RkitAvatar>
    );

    // Build the complete avatar with all features
    const completeAvatar = needsWrapper ? (
      <div className="relative inline-block w-fit" ref={ref}>
        {/* Avatar base */}
        {avatarElement}

        {/* Progress ring overlay */}
        {showProgress && (
          <div
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{
              background: `conic-gradient(${progressColor} ${
                progress * 3.6
              }deg, transparent 0deg)`,
              borderRadius: shape === "square" ? "0.375rem" : "50%",
              transform: `scale(${1 + progressThickness / 20})`,
              transformOrigin: "center",
              zIndex: -1,
            }}
            aria-hidden="true"
          />
        )}

        {/* Status indicator */}
        {showStatus && (
          <span
            className={cn(
              "absolute size-3 rounded-full border-2 border-background",
              statusPositionClasses[statusPosition],
              statusClassName || statusStyles[status]
            )}
            aria-label={`Status: ${status}`}
          >
            <span className="sr-only">{status}</span>
          </span>
        )}

        {/* Badge overlay */}
        {showBadge && badgeContent !== undefined && (
          <Badge
            className={cn(
              "absolute h-5 min-w-5 rounded-full px-1 tabular-nums flex items-center justify-center",
              badgePositionClasses[badgePosition],
              badgeClassName
            )}
            variant={badgeVariant}
          >
            {badgeContent}
          </Badge>
        )}
      </div>
    ) : (
      <div ref={ref} className="inline-block">
        {avatarElement}
      </div>
    );

    // Wrap with tooltip if enabled
    if (showTooltip && tooltipContent) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>{completeAvatar}</TooltipTrigger>
          <TooltipContent side={tooltipSide}>{tooltipContent}</TooltipContent>
        </Tooltip>
      );
    }

    return completeAvatar;
  }
);

Avatar.displayName = "Avatar";

export default Avatar;
