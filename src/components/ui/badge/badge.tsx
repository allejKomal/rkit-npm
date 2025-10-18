import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "../../../lib/utils";
import { badgeVariantsPrimitive } from "./badge-variants";
import type { VariantProps } from "class-variance-authority";

function BadgePrimitive({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariantsPrimitive> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariantsPrimitive({ variant }), className)}
      {...props}
    />
  );
}

export { BadgePrimitive };
