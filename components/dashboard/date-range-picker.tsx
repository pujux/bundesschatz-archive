"use client";

import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, Locale } from "date-fns";

interface DateRangePickerProps {
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
  onReset?: () => void;
}

export function DateRangePicker({ date, setDate, onReset }: DateRangePickerProps) {
  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button id="date" variant={"outline"} className={cn("justify-start text-left font-normal", !date && "text-muted-foreground")}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar autoFocus timeZone="UTC" mode="range" defaultMonth={date?.from} selected={date} onSelect={setDate} numberOfMonths={2} />
          {onReset && (
            <Button variant="outline" onClick={onReset} className="text-xs absolute m-[0_auto] left-0 right-0 top-3.5 w-14 h-7">
              Reset
            </Button>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
