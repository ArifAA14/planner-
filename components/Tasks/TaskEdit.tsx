'use client';
import React, { useRef, useState } from 'react'
import { SettingsGearIcon } from '../ui/Icons/Settings';
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from '../ui/Dialogs/Dialog';
import SelectDates from './Due/DueSelect';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader } from '../ui/Icons/Loader';
import { Tasks } from '@/types/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTask } from '@/app/actions/TaskService';

function TaskEdit({ task }: { task: Tasks }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [data, setData] = useState({ task: task.task, description: task.description });
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => handleEdit(),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] })

      const previousTasks = queryClient.getQueryData(['tasks'])

      queryClient.setQueryData(['tasks'], (old: { tasks: Tasks[] }) => ({
        tasks: old?.tasks.map((task: Tasks) => {
          if (task.id === task.id) {
            return { ...task, task: data.task, description: data.description }
          }
          return task
        })
      }))

      return { previousTasks }
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(['tasks'], context?.previousTasks)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    }
  });

  async function handleEdit() {
    setLoading(true);
    try {
      const taskObject: Tasks = {
        task: data.task,
        user_id: task.user_id,
        id: task.id,
        createdAt: task.createdAt,
        description: data.description,
        completed: task.completed,
      };
      const result = await updateTask(taskObject);
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      if (result.success) {
        // artifical delay for loading anims,
        setTimeout(() => {
          setData({ task: task.task, description: task.description });
          setLoading(false);
          closeRef.current?.click();
        }, 1000);

      }
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  return (
    <Dialog>
      <DialogTrigger className="hover:text-red-700 mt-0.5 text-neutral-500" >
        <SettingsGearIcon width={24} height={24} />
      </DialogTrigger>

      <DialogContent className=' max-h-[85vh] w-[90vw] max-w-[450px]  rounded-md bg-white data-[state=open]:animate-contentShow overflow-hidden
      shadow-sm '>
        <DialogTitle className='px-0 py-0  border-b-[0.5px] font-medium text-base tracking-tight hidden'>New Task</DialogTitle>
        <div className='flex flex-col w-full h-full justify-between px-1 py-2'
        >
          <div className='flex flex-col gap-0.5'>
            <input className='outline-none selection:bg-white selection:text-black placeholder:text-gray-400  w-full px-4 py-2 text-base placeholder:text-sm'
              placeholder='Task Name Here..'
              type='text'
              required
              name='task'
              value={data.task}
              autoFocus={true}
              onChange={(e) => setData({ ...data, task: e.target.value })}
            />
            <input className=' outline-none placeholder:text-gray-400 placeholder:text-sm w-full px-5 py-2 text-sm'
              placeholder='Description'
              type='text'
              name='description'
              value={data.description}
              onChange={(e) => setData({ ...data, description: e.target.value })}
            />
          </div>


          <div className='flex items-center justify-between w-full mt-6 px-4 py-2'>
            <div className='flex items-center gap-2'>
              <SelectDates />
            </div>

            <div className='flex items-center gap-2'>
              <DialogClose className='border text-gray-600 font-medium tracking-tight text-sm px-2.5 py-1 rounded-lg shadow-sm'
                ref={closeRef}
              >
                Cancel
              </DialogClose>
              <button className='bg-red-700 text-white font-medium h-[30px]
              tracking-tighter text-sm px-2.5 py-1 rounded-lg shadow-sm w-[65px] text-center'
                onClick={() => mutation.mutate()}
              >

                <AnimatePresence initial={false} mode='wait'>
                  {loading ? <motion.div
                    key={'loading'}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 1, y: -50 }}
                    transition={{
                      duration: 0.345,
                      type: 'spring',
                    }}
                    className='flex items-center justify-center w-full gap-1'
                  >
                    <Loader width={16} height={16} />
                  </motion.div> :
                    <motion.div className=' w-full text-center'
                      key={'add'}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 1, y: -50 }}
                      transition={{
                        duration: 0.5,
                        type: 'spring',
                      }}
                    >

                      <span className='text-sm text-center '>Save</span>
                    </motion.div>
                  }
                </AnimatePresence>

              </button>
            </div>
          </div>


        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TaskEdit