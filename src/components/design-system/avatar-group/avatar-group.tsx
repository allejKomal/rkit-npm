import {
  AvatarImagePrimitive,
  AvatarPrimitive,
  AvatarFallbackPrimitive,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../../ui";
import { cn } from "../../../lib/utils";
import { Plus } from "lucide-react";

export interface AvatarGroupItem {
  src: string;
  name: string;
  fallback: string;
}

interface AvatarGroupProps {
  /**
   * Array of avatar items to display
   */
  items: AvatarGroupItem[];

  /**
   * Maximum number of avatars to show before overflow
   * @default 3
   */
  max?: number;

  /**
   * Size of avatars
   * @default "default"
   */
  size?: "sm" | "default" | "lg";

  /**
   * Show tooltips on hover
   * @default false
   */
  showTooltips?: boolean;

  /**
   * Add spacing between avatars on hover
   * @default false
   */
  hoverSpacing?: boolean;

  /**
   * Lift avatars on hover with shadow
   * @default false
   */
  hoverLift?: boolean;

  /**
   * Show overflow count as text
   * @default false
   */
  showOverflowCount?: boolean;

  /**
   * Show overflow items in dropdown menu
   * @default false
   */
  showOverflowDropdown?: boolean;

  /**
   * Wrap avatars in a bordered container
   * @default false
   */
  withContainer?: boolean;

  /**
   * Additional className for the wrapper
   */
  className?: string;

  /**
   * Additional className for individual avatars
   */
  avatarClassName?: string;
}

/**
 * Avatar Group Component - Display multiple avatars with various configurations
 *
 * Features:
 * - Multiple sizes (sm, default, lg)
 * - Tooltips on hover
 * - Hover effects (spacing, lift)
 * - Overflow handling (count or dropdown)
 * - Container styling options
 *
 * @example
 * // Basic avatar group
 * <AvatarGroup items={users} max={3} />
 *
 * @example
 * // With tooltips and hover effects
 * <AvatarGroup items={users} showTooltips hoverLift />
 *
 * @example
 * // With dropdown for overflow
 * <AvatarGroup items={users} max={3} showOverflowDropdown />
 */
function AvatarGroup({
  items,
  max = 3,
  size = "default",
  showTooltips = false,
  hoverSpacing = false,
  hoverLift = false,
  showOverflowCount = false,
  showOverflowDropdown = false,
  withContainer = false,
  className,
  avatarClassName,
}: AvatarGroupProps) {
  const visibleItems = items.slice(0, max);
  const overflowItems = items.slice(max);
  const remainingCount = items.length - max;

  // Size classes
  const sizeClasses = {
    sm: "size-8",
    default: "size-10",
    lg: "size-12",
  };

  const spacingClasses = {
    sm: "-space-x-2",
    default: "-space-x-2",
    lg: "-space-x-3",
  };

  // Avatar element
  const renderAvatar = (avatar: AvatarGroupItem, index: number) => {
    const avatarElement = (
      <AvatarPrimitive
        key={index}
        className={cn(
          "ring-background ring-2 transition-all duration-300 ease-in-out",
          sizeClasses[size],
          hoverLift && "hover:z-10 hover:-translate-y-1 hover:shadow-md",
          avatarClassName
        )}
      >
        <AvatarImagePrimitive src={avatar.src} alt={avatar.name} />
        <AvatarFallbackPrimitive className={cn(size === "sm" && "text-xs")}>
          {avatar.fallback}
        </AvatarFallbackPrimitive>
      </AvatarPrimitive>
    );

    // Wrap with tooltip if enabled
    if (showTooltips) {
      return (
        <Tooltip key={index}>
          <TooltipTrigger asChild>{avatarElement}</TooltipTrigger>
          <TooltipContent>{avatar.name}</TooltipContent>
        </Tooltip>
      );
    }

    return avatarElement;
  };

  // Overflow count element
  const overflowCountElement = showOverflowCount && remainingCount > 0 && (
    <span className="text-muted-foreground hover:text-foreground flex items-center justify-center rounded-full bg-transparent px-2 text-xs shadow-none hover:bg-transparent">
      +{remainingCount}
    </span>
  );

  // Overflow dropdown element
  const overflowDropdownElement = showOverflowDropdown &&
    overflowItems.length > 0 && (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={cn(
              "bg-muted has-focus-visible:ring-ring/50 ring-background flex shrink-0 cursor-pointer items-center justify-center rounded-full ring-2 transition-all hover:bg-muted/80",
              sizeClasses[size]
            )}
          >
            <Plus className={size === "sm" ? "size-3" : "size-4"} />
            <span className="sr-only">Show more</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {overflowItems.map((avatar, index) => (
            <DropdownMenuItem key={index} className="gap-2">
              <AvatarPrimitive className="size-8">
                <AvatarImagePrimitive src={avatar.src} alt={avatar.name} />
                <AvatarFallbackPrimitive className="text-xs">
                  {avatar.fallback}
                </AvatarFallbackPrimitive>
              </AvatarPrimitive>
              <span>{avatar.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );

  // Avatar group content
  const avatarGroupContent = (
    <div
      className={cn(
        "flex",
        spacingClasses[size],
        hoverSpacing && "hover:space-x-1"
      )}
    >
      {visibleItems.map((avatar, index) => renderAvatar(avatar, index))}
      {overflowDropdownElement}
    </div>
  );

  // Wrap in container if needed
  if (withContainer) {
    return (
      <div
        className={cn(
          "bg-background flex items-center rounded-full border p-1 shadow-sm",
          className
        )}
      >
        {avatarGroupContent}
        {overflowCountElement}
      </div>
    );
  }

  return <div className={className}>{avatarGroupContent}</div>;
}

export default AvatarGroup;
