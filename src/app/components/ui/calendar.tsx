"use client";

import * as React from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "./utils";
import { buttonVariants } from "./button";

function Calendar({
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
        months: "flex flex-col sm:flex-row gap-2",
        month: "flex flex-col gap-4",
        month_caption: "flex justify-center pt-1 relative items-center w-full",
        caption_label: "text-sm font-medium",
        nav: "flex items-center gap-1",
        button_previous: cn(
          buttonVariants({ variant: "outline" }),
          "absolute left-1 size-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        button_next: cn(
          buttonVariants({ variant: "outline" }),
          "absolute right-1 size-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        month_grid: "w-full border-collapse space-x-1",
        weekdays: "flex",
        weekday:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        week: "flex w-full mt-2",
        day: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([data-selected=true])]:bg-accent [&:has([data-selected=true].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([data-selected=true])]:rounded-l-md last:[&:has([data-selected=true])]:rounded-r-md"
            : "[&:has([data-selected=true])]:rounded-md",
        ),
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "size-8 p-0 font-normal data-[selected=true]:opacity-100",
        ),
        range_start:
          "day-range-start data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground",
        range_end:
          "day-range-end data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground",
        selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        today: "bg-accent text-accent-foreground",
        outside:
          "day-outside text-muted-foreground data-[selected=true]:text-muted-foreground",
        disabled: "text-muted-foreground opacity-50",
        range_middle:
          "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ className, orientation, ...chevronProps }) => {
          if (orientation === "left") {
            return (
              <ChevronLeft
                className={cn("size-4", className)}
                {...chevronProps}
              />
            );
          }
          if (orientation === "right") {
            return (
              <ChevronRight
                className={cn("size-4", className)}
                {...chevronProps}
              />
            );
          }
          return (
            <ChevronDown
              className={cn("size-4", className)}
              {...chevronProps}
            />
          );
        },
      }}
      {...props}
    />
  );
}

export { Calendar };
