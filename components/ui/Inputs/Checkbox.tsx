import React from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "../Icons/Check";
import { setTaskCompleted } from "@/app/actions/TaskService";
import { useQueryClient } from "@tanstack/react-query";

function CheckboxRoot({ checked, id }: { checked: number | boolean, id: string }) {

  const queryClient = useQueryClient();

  async function handleCheck(completed: number) {
    const result = await setTaskCompleted(id, completed);
    if (result.success) {
      console.log('Task completed successfully');
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      });
    } else {
      console.log('Failed to complete task');
    }
  }
  return (
    <form>
      <div className="flex items-center ">
        <Checkbox.Root
          className="flex size-[25px] appearance-none items-center justify-center rounded border-2 
         outline-none hover:bg-red-100  group border-red-700 transition-all ease-out duration-200"
          checked={
            checked === 0 ? false : true}
          onCheckedChange={(checked) => handleCheck(checked ? 1 : 0)}
          id="c1"
        >
          <Checkbox.Indicator className="text-black">
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <label
          className="pl-[15px] text-[15px] leading-none text-black"
          htmlFor="c1"
        >

        </label>
      </div>
    </form>
  )
}

export default CheckboxRoot
