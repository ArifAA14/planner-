import React from "react";
import * as Select from "@radix-ui/react-select";
import { CheckIcon } from "@/components/ui/Icons/Check";
import { ClockIcon } from "@/components/ui/Icons/Clock";
import getNext20Days from "@/utils/dates";


interface SelectItemProps extends Select.SelectItemProps {
  children: React.ReactNode;
}



const SelectDates = () => {
  const dates = getNext20Days();

  return (
    <Select.Root >
      <Select.Trigger
        className="border text-gray-600 font-medium 
              tracking-tighter text-sm px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1 "
        aria-label="Due Date"
      >
        <Select.Icon className="text-violet11">
          <ClockIcon />
        </Select.Icon>
        <Select.Value placeholder="Due Date" />

      </Select.Trigger>
      <Select.Portal >
        <Select.Content className="overflow-hidden z-[1000] max-h-[60px] rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">

          <Select.Viewport className="py-2">
            <Select.Group>
              {dates.map((date, index) => (
                <SelectItem key={index} value={date}>
                  {date}
                </SelectItem>
              ))}
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={
          `relative flex py-2 select-none items-center rounded-[3px] px-8 text-sm leading-none text-gray-600 cursor-pointer hover:text-black
            transition-colors duration-200 ease-linear
          `}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 inline-flex w-[25px] pl-2 items-center justify-center">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  },
);

SelectItem.displayName = 'SelectItem';


export default SelectDates;
