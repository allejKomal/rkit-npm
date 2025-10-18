"use client";

import * as AspectRatioPrimitiveRadix from "@radix-ui/react-aspect-ratio";

function AspectRatioPrimitive({
  ...props
}: React.ComponentProps<typeof AspectRatioPrimitiveRadix.Root>) {
  return <AspectRatioPrimitiveRadix.Root data-slot="aspect-ratio" {...props} />;
}

export { AspectRatioPrimitive };
