'use client'
import { CheckIcon } from "@/components/ui/Icons/Check";
import { readbleDate } from "@/utils/dates";
import * as Select from "@radix-ui/react-select";
import React from "react";

interface SelectItemProps extends Select.SelectItemProps {
  children: React.ReactNode;
}

const DayPicker = ({ days, selectedDate, setSelectedDate }: { days: string[], selectedDate: string, setSelectedDate: React.Dispatch<React.SetStateAction<string>> }) => {

  return (
    <Select.Root defaultValue={'Today'} onValueChange={(value) => setSelectedDate(value)}>
      <Select.Trigger
        className=" text-black font-medium outline-none  rounded-xl 
              tracking-tighter text-lg px-4 py-2 flex items-center gap-2 "
        aria-label="Due Date"
      >
        <Select.Icon className="text-red-700 text-xs">

        </Select.Icon>
        <Select.Value placeholder="Today">
          {selectedDate ? readbleDate(selectedDate) : 'All'}
        </Select.Value>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="overflow-hidden z-[1000]  max-h-[200px] rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <Select.Viewport className="py-2">
            <Select.Group>
              {days.map((date) => (
                <SelectItem key={date} value={date}>
                  {readbleDate(date)}
                </SelectItem>
              ))}
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={
          `relative flex py-2 select-none items-center rounded-[3px] px-8 text-sm leading-none text-gray-600 cursor-pointer hover:text-black
            transition-colors duration-200 ease-linear outline-none
          `}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className=" text-black ml-4">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  },
);

SelectItem.displayName = 'SelectItem';

export default DayPicker;
