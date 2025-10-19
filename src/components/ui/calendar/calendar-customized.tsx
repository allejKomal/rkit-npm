"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "../../../lib/utils";
import { buttonVariants } from "rkit-npm/components";

function CalendarCustomized({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: cn("flex flex-col sm:flex-row gap-2", classNames?.months),
        month: cn("flex flex-col gap-4", classNames?.month),
        caption: cn(
          "flex justify-center pt-1 relative items-center w-full",
          classNames?.caption
        ),
        caption_label: cn("text-sm font-medium", classNames?.caption_label),
        nav: cn("flex items-center gap-1", classNames?.nav),
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "size-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          classNames?.nav_button
        ),
        nav_button_previous: cn(
          "absolute left-1",
          classNames?.nav_button_previous
        ),
        nav_button_next: cn("absolute right-1", classNames?.nav_button_next),
        table: cn("w-full border-collapse space-x-1", classNames?.table),
        head_row: cn("flex", classNames?.head_row),
        head_cell: cn(
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
          classNames?.head_cell
        ),
        row: cn("flex w-full mt-2", classNames?.row),
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md",
          classNames?.cell
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "size-8 p-0 font-normal aria-selected:opacity-100",
          classNames?.day
        ),
        day_range_start: cn(
          "day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground",
          classNames?.day_range_start
        ),
        day_range_end: cn(
          "day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground",
          classNames?.day_range_end
        ),
        day_selected: cn(
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          classNames?.day_selected
        ),
        day_today: cn(
          "bg-accent text-accent-foreground",
          classNames?.day_today
        ),
        day_outside: cn(
          "day-outside text-muted-foreground aria-selected:text-muted-foreground",
          classNames?.day_outside
        ),
        day_disabled: cn(
          "text-muted-foreground opacity-50",
          classNames?.day_disabled
        ),
        day_range_middle: cn(
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
          classNames?.day_range_middle
        ),
        day_hidden: cn("invisible", classNames?.day_hidden),
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("size-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("size-4", className)} {...props} />
        ),
      }}
      {...props}
    />
  );
}

export { CalendarCustomized };
