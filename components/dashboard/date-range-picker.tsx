import { CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { DATE_PRESETS, presetRange, type DateRangeValue } from "@/lib/date-presets";
import { useMediaQuery } from "@/hooks/use-media-query";

interface DateRangePickerProps {
  date: DateRange;
  setDate: (date: DateRange) => void;
  fullRange: DateRangeValue;
}

export function DateRangePicker({ date, setDate, fullRange }: DateRangePickerProps) {
  const twoMonths = useMediaQuery("(min-width: 640px)");

  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button id="date" variant={"outline"} className={cn("justify-start text-left font-normal", !date && "text-muted-foreground")}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd.MM.yyyy")} - {format(date.to, "dd.MM.yyyy")}
                </>
              ) : (
                format(date.from, "dd.MM.yyyy")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto max-h-[80vh] overflow-y-auto p-0" align="end" collisionPadding={8}>
          <div className="flex flex-wrap gap-1 border-b p-2" role="group" aria-label="Date range presets">
            {DATE_PRESETS.map(({ label }) => (
              <Button key={label} variant="outline" size="sm" className="h-7 flex-1 text-xs" onClick={() => setDate(presetRange(label, fullRange))}>
                {label}
              </Button>
            ))}
          </div>
          <Calendar
            required
            autoFocus
            mode="range"
            captionLayout="dropdown"
            startMonth={fullRange.from}
            endMonth={fullRange.to}
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={twoMonths ? 2 : 1}
            weekStartsOn={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
