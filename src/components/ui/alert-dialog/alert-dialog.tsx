"use client";

import * as React from "react";
import * as AlertDialogPrimitiveRadix from "@radix-ui/react-alert-dialog";

import { cn } from "../../../lib/utils";
import { buttonVariants } from "../button";

function AlertDialogPrimitive({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitiveRadix.Root>) {
  return <AlertDialogPrimitiveRadix.Root data-slot="alert-dialog" {...props} />;
}

function AlertDialogTriggerPrimitive({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitiveRadix.Trigger>) {
  return (
    <AlertDialogPrimitiveRadix.Trigger
      data-slot="alert-dialog-trigger"
      {...props}
    />
  );
}

function AlertDialogPortalPrimitive({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitiveRadix.Portal>) {
  return (
    <AlertDialogPrimitiveRadix.Portal
      data-slot="alert-dialog-portal"
      {...props}
    />
  );
}

function AlertDialogOverlayPrimitive({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitiveRadix.Overlay>) {
  return (
    <AlertDialogPrimitiveRadix.Overlay
      data-slot="alert-dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  );
}

function AlertDialogContentPrimitive({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitiveRadix.Content>) {
  return (
    <AlertDialogPortalPrimitive>
      <AlertDialogOverlayPrimitive />
      <AlertDialogPrimitiveRadix.Content
        data-slot="alert-dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        )}
        {...props}
      />
    </AlertDialogPortalPrimitive>
  );
}

function AlertDialogHeaderPrimitive({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  );
}

function AlertDialogFooterPrimitive({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  );
}

function AlertDialogTitlePrimitive({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitiveRadix.Title>) {
  return (
    <AlertDialogPrimitiveRadix.Title
      data-slot="alert-dialog-title"
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  );
}

function AlertDialogDescriptionPrimitive({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitiveRadix.Description>) {
  return (
    <AlertDialogPrimitiveRadix.Description
      data-slot="alert-dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function AlertDialogActionPrimitive({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitiveRadix.Action>) {
  return (
    <AlertDialogPrimitiveRadix.Action
      className={cn(buttonVariants(), className)}
      {...props}
    />
  );
}

function AlertDialogCancelPrimitive({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitiveRadix.Cancel>) {
  return (
    <AlertDialogPrimitiveRadix.Cancel
      className={cn(buttonVariants({ variant: "outline" }), className)}
      {...props}
    />
  );
}

export {
  AlertDialogPrimitive,
  AlertDialogPortalPrimitive,
  AlertDialogOverlayPrimitive,
  AlertDialogTriggerPrimitive,
  AlertDialogContentPrimitive,
  AlertDialogHeaderPrimitive,
  AlertDialogFooterPrimitive,
  AlertDialogTitlePrimitive,
  AlertDialogDescriptionPrimitive,
  AlertDialogActionPrimitive,
  AlertDialogCancelPrimitive,
};
