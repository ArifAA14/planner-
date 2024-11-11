/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

export function Tooltip({
  children,
  content,
  open,
  defaultOpen,
  onOpenChange,
  ...props
}: {
  children: React.ReactNode;
  content: any | React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  return (
    <TooltipPrimitive.Provider>

      <TooltipPrimitive.Root
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
      >
        <TooltipPrimitive.Trigger asChild>
          {children}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content side="top" align="center" {...props}
          className="bg-white border drop-shadow px-4 py-2 rounded-md text-xs
          will-change-[transform,opacity] transition-[opacity,transform]
          data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade
          "
        >
          {content}
          <TooltipPrimitive.Arrow width={11} height={5} color="#e5e7eb" className="fill-current" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
