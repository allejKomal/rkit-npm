import React, { useRef, useState } from "react";

import { format, startOfWeek, endOfWeek } from "date-fns";
import { Calendar as CalendarIcon, Info } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { CalendarCustomized } from "../../ui/calendar";
import { cn } from "../../../lib/utils";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "../button/button";

type DatePickerMode = "single" | "multiple" | "range" | "week";
type CaptionLayout = "dropdown" | "buttons" | "dropdown-buttons";

interface DatePickerProps {
  /**
   * Date picker mode
   * @default "single"
//    */
  mode?: DatePickerMode;

  /**
   * Selected date (for single mode)
   */
  value?: Date | null;

  /**
   * Selected dates (for multiple mode)
   */
  values?: Date[];

  /**
   * Selected date range (for range mode)
   */
  range?: DateRange;

  /**
   * Selected week (for week mode)
   */
  week?: { from: Date; to: Date } | null;

  /**
   * Callback when date changes (single mode)
   */
  onValueChange?: (date: Date | null) => void;

  /**
   * Callback when dates change (multiple mode)
   */
  onValuesChange?: (dates: Date[] | undefined) => void;

  /**
   * Callback when range changes (range mode)
   */
  onRangeChange?: (range: DateRange | undefined) => void;

  /**
   * Callback when week changes (week mode)
   */
  onWeekChange?: (week: { from: Date; to: Date } | null) => void;

  /**
   * Icon to display in the button
   */
  icon?: React.ReactNode;

  /**
   * Calendar caption layout style
   * - "dropdown": month and year dropdowns
   * - "buttons": prev/next buttons only
   * - "dropdown-buttons": both dropdowns and buttons
   * @default "dropdown"
   */
  captionLayout?: CaptionLayout;

  /**
   * Number of months to display
   * @default 1
   */
  numberOfMonths?: number;

  /**
   * Placeholder text when no date is selected
   * @default "Pick a date"
   */
  placeholder?: string;

  /**
   * Date format for display
   * @default "PPP"
   */
  dateFormat?: string;

  /**
   * Starting year for dropdown
   * @default 2000
   */
  fromYear?: number;

  /**
   * Ending year for dropdown
   * @default current year
   */
  toYear?: number;

  /**
   * Function to disable specific dates
   */
  disabledDates?: (date: Date) => boolean;

  /**
   * Close popover on day click (single mode)
   * @default true
   */
  closeOnSelect?: boolean;

  /**
   * Show info tooltip for multiple dates
   * @default false
   */
  showTooltipInfo?: boolean;

  /**
   * Button variant
   * @default "outline"
   */
  variant?: "outline" | "default" | "ghost" | "secondary";

  /**
   * Additional className for the button
   */
  className?: string;

  /**
   * Custom classNames for calendar elements (merged with defaults)
   */
  classNames?: React.ComponentProps<typeof CalendarCustomized>["classNames"];

  /**
   * Week starts on (0 = Sunday, 1 = Monday)
   * @default 0
   */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;

  /**
   * Show days outside the current month
   * @default true
   */
  showOutsideDays?: boolean;

  /**
   * Display 6 weeks per month (requires showOutsideDays)
   * @default false
   */
  fixedWeeks?: boolean;

  /**
   * Show week numbers
   * @default false
   */
  showWeekNumber?: boolean;

  /**
   * Use ISO week dates
   * @default false
   */
  ISOWeek?: boolean;

  /**
   * The earliest date that can be selected
   */
  fromDate?: Date;

  /**
   * The latest date that can be selected
   */
  toDate?: Date;

  /**
   * The earliest month to navigate to
   */
  fromMonth?: Date;

  /**
   * The latest month to navigate to
   */
  toMonth?: Date;

  /**
   * Disable month navigation
   * @default false
   */
  disableNavigation?: boolean;

  /**
   * Paginate navigation by numberOfMonths
   * @default false
   */
  pagedNavigation?: boolean;

  /**
   * Display months in reverse order
   * @default false
   */
  reverseMonths?: boolean;

  /**
   * Hide the weekday names row
   * @default false
   */
  hideHead?: boolean;

  /**
   * Focus the calendar on mount
   * @default false
   */
  initialFocus?: boolean;

  /**
   * Content to display in the footer
   */
  footer?: React.ReactNode;

  /**
   * Text direction
   * @default "ltr"
   */
  dir?: "ltr" | "rtl";

  /**
   * Minimum days that can be selected (multiple/range modes)
   */
  min?: number;

  /**
   * Maximum days that can be selected (multiple/range modes)
   */
  max?: number;

  /**
   * Make selection required (single mode)
   * @default false
   */
  required?: boolean;

  /**
   * The default month to display
   */
  defaultMonth?: Date;

  /**
   * Controlled month (use with onMonthChange)
   */
  month?: Date;

  /**
   * Callback when month changes
   */
  onMonthChange?: (month: Date) => void;
}

/**
 * DatePicker Component - A highly customizable date picker with multiple modes
 *
 * Features:
 * - Multiple modes (single, multiple, range, week)
 * - Various caption layouts (dropdown, buttons, dropdown-buttons)
 * - Multiple months display
 * - Date range selection
 * - Week selection
 * - Disabled dates
 * - Customizable format and years
 *
 * @example
 * // Basic single date picker
 * <DatePicker mode="single" value={date} onValueChange={setDate} />
 *
 * @example
 * // Date range picker
 * <DatePicker mode="range" range={dateRange} onRangeChange={setDateRange} />
 *
 * @example
 * // Multiple dates with info tooltip
 * <DatePicker mode="multiple" values={dates} onValuesChange={setDates} showTooltipInfo />
 */
function DatePicker({
  mode = "single",
  value,
  values,
  range,
  week,
  onValueChange,
  onValuesChange,
  onRangeChange,
  onWeekChange,
  captionLayout = "dropdown",
  numberOfMonths = 1,
  placeholder = "Pick a date",
  dateFormat = "PPP",
  fromYear = 2000,
  toYear = new Date().getFullYear(),
  disabledDates,
  closeOnSelect = true,
  showTooltipInfo = false,
  variant = "outline",
  className,
  classNames,
  weekStartsOn = 0,
  showOutsideDays = true,
  fixedWeeks = false,
  showWeekNumber = false,
  ISOWeek = false,
  fromDate,
  toDate,
  fromMonth,
  toMonth,
  disableNavigation = false,
  pagedNavigation = false,
  reverseMonths = false,
  hideHead = false,
  initialFocus = false,
  footer,
  dir = "ltr",
  min,
  max,
  required = false,
  defaultMonth,
  month,
  onMonthChange,
  icon,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement | null>(null);

  // Format display label based on mode
  const getDisplayLabel = () => {
    switch (mode) {
      case "single":
        return value ? format(value, dateFormat) : placeholder;

      case "multiple": {
        if (!values?.length) return placeholder;
        const formattedDates = [...new Set(values.map((d) => d.getTime()))]
          .sort((a, b) => a - b)
          .map((ts) => format(new Date(ts), dateFormat));
        return formattedDates.length > 1
          ? `${formattedDates.length} dates selected`
          : formattedDates[0];
      }

      case "range": {
        if (range?.from && range?.to) {
          return `${format(range.from, "MMM d")} - ${format(
            range.to,
            "MMM d, yyyy"
          )}`;
        }
        if (range?.from) {
          return format(range.from, "MMM d, yyyy");
        }
        return placeholder;
      }

      case "week":
        return week
          ? `${format(week.from, "MMM d")} – ${format(week.to, "MMM d, yyyy")}`
          : "Select a week";

      default:
        return placeholder;
    }
  };

  // Handle date selection based on mode
  const handleSelect = (
    selectedDate: Date | Date[] | DateRange | undefined
  ) => {
    switch (mode) {
      case "single":
        if (selectedDate instanceof Date) {
          onValueChange?.(selectedDate);
          if (closeOnSelect) setIsOpen(false);
        }
        break;

      case "multiple":
        if (Array.isArray(selectedDate)) {
          onValuesChange?.(selectedDate);
        }
        break;

      case "range":
        if (selectedDate && "from" in selectedDate) {
          onRangeChange?.(selectedDate as DateRange);
          if (selectedDate.from && selectedDate.to && closeOnSelect) {
            setIsOpen(false);
          }
        }
        break;
    }
  };

  // Handle week selection
  const handleWeekSelect = (date: Date) => {
    const from = startOfWeek(date, { weekStartsOn });
    const to = endOfWeek(date, { weekStartsOn });
    onWeekChange?.({ from, to });
    if (closeOnSelect) setIsOpen(false);
  };

  // Get calendar props based on mode
  const getCalendarProps = () => {
    const baseProps = {
      numberOfMonths,
      captionLayout,
      fromYear,
      toYear,
      fromDate,
      toDate,
      fromMonth,
      toMonth,
      disabled: disabledDates,
      showOutsideDays,
      fixedWeeks,
      showWeekNumber,
      ISOWeek,
      weekStartsOn,
      disableNavigation,
      pagedNavigation,
      reverseMonths,
      hideHead,
      initialFocus,
      footer,
      dir,
      defaultMonth,
      month,
      onMonthChange,
      classNames,
    };

    switch (mode) {
      case "single":
        return {
          ...baseProps,
          mode: "single" as const,
          selected: value || undefined,
          onSelect: handleSelect,
          required,
        };

      case "multiple":
        return {
          ...baseProps,
          mode: "multiple" as const,
          selected: values,
          onSelect: handleSelect,
          min,
          max,
        };

      case "range":
        return {
          ...baseProps,
          mode: "range" as const,
          selected: range,
          onSelect: handleSelect,
          min,
          max,
        };

      case "week":
        return {
          ...baseProps,
          mode: "range" as const,
          selected: week || undefined,
          onDayClick: handleWeekSelect,
          modifiersClassNames: {
            selected: "bg-primary text-primary-foreground",
          },
        };

      default:
        return baseProps;
    }
  };

  // Render button with optional tooltip for multiple mode
  const renderButton = () => {
    const button = (
      <Button
        variant={variant}
        className={cn(
          "w-full font-normal justify-between",
          !value &&
            !values?.length &&
            !range?.from &&
            !week &&
            "text-muted-foreground",
          className
        )}
      >
        <span className="truncate">{getDisplayLabel()}</span>
        {icon || <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />}
      </Button>
    );

    // Add tooltip for multiple mode with info
    if (mode === "multiple" && showTooltipInfo && values?.length) {
      const formattedDates = [...new Set(values.map((d) => d.getTime()))]
        .sort((a, b) => a - b)
        .map((ts) => format(new Date(ts), dateFormat));

      return (
        <TooltipProvider>
          <div className="flex">
            <PopoverTrigger asChild>{button}</PopoverTrigger>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Info className="h-4 w-4 opacity-70" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" align="center">
                <div className="max-w-[200px] whitespace-pre-line">
                  {formattedDates.map((d, i) => (
                    <div key={i}>{d}</div>
                  ))}
                </div>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      );
    }

    return <PopoverTrigger asChild>{button}</PopoverTrigger>;
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      {renderButton()}
      <PopoverContent className="w-auto p-0 flex items-start" align="start">
        <div ref={calendarRef}>
          <CalendarCustomized {...getCalendarProps()} />
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default DatePicker;
