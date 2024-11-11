import { Locale } from '@/src/i18n/config';
import { setUserLocale } from '@/src/services/locale';
import * as Select from "@radix-ui/react-select";
import { startTransition } from 'react';

type Props = {
  defaultValue: string;
  items: Array<{ value: string; label: string }>;
  label: string;
};

export default function LocaleSwitcherSelect({
  defaultValue,
  items,
  label
}: Props) {

  function onChange(value: string) {
    const locale = value as Locale;
    startTransition(() => {
      setUserLocale(locale);
    });
  }

  return (
    <div className="relative">
      <Select.Root defaultValue={defaultValue} onValueChange={onChange}>
        <Select.Trigger
          className=" text-white font-medium outline-none
              tracking-tighter text-sm px-4 py-2 rounded-lg  flex items-center gap-1 "
          aria-label={label}
        >
          <Select.Icon className='text-gray-300 mt-0.5'>
          </Select.Icon>
          {defaultValue}
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            align="end"
            className="min-w-[8rem] overflow-hidden rounded-md bg-white py-1 shadow-md border"
            position="popper"
          >
            <Select.Viewport>
              {items.map((item) => (

                <Select.Item
                  key={item.value}
                  className={`relative outline-none  flex py-2 select-none items-center rounded-[3px] px-8 text-sm leading-none text-gray-600 cursor-pointer hover:text-black
            transition-colors duration-200 ease-linear`}
                  value={item.value}
                >

                  <span className="text-slate-900">{item.label}</span>
                </Select.Item>
              ))}
            </Select.Viewport>
            <Select.Arrow className="fill-white text-white" />
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}