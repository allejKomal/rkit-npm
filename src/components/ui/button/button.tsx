import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps } from "class-variance-authority";

import { cn } from "../../../lib/utils";
import { buttonVariantsPrimitive } from "./button-variants";

function ButtonPrimitive({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariantsPrimitive> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariantsPrimitive({ variant, size, className }))}
      {...props}
    />
  );
}

export { ButtonPrimitive };
