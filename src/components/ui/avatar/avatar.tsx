"use client";

import * as React from "react";
import * as AvatarPrimitiveRadix from "@radix-ui/react-avatar";

import { cn } from "../../../lib/utils";

function AvatarPrimitive({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitiveRadix.Root>) {
  return (
    <AvatarPrimitiveRadix.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-10 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  );
}

function AvatarImagePrimitive({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitiveRadix.Image>) {
  return (
    <AvatarPrimitiveRadix.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  );
}

function AvatarFallbackPrimitive({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitiveRadix.Fallback>) {
  return (
    <AvatarPrimitiveRadix.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      )}
      {...props}
    />
  );
}

export { AvatarPrimitive, AvatarImagePrimitive, AvatarFallbackPrimitive };
