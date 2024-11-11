'use client'
import { createTask } from '@/app/actions/TaskService'
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/Dialogs/Dialog'
import { SquarePenIcon } from '@/components/ui/Icons/Add'
import { NewTaskForm, Tasks } from '@/types/types'
import { useQueryClient } from '@tanstack/react-query'
import { AnimatePresence, motion } from "framer-motion"
import { useRef, useState } from 'react'
import SelectDates from '../Due/DueSelect'
import { Loader } from '@/components/ui/Icons/Loader'
import { toast } from 'sonner'

function TaskDialog({ userId }: { userId: string | undefined }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const queryClient = useQueryClient();
  const [data, setData] = useState<NewTaskForm>({ task: '', description: '', dueDate: '' });
  const [loading, setLoading] = useState(false);
  if (!userId) return null;
  async function handleSubmit() {
    if (!userId) return;
    if (!data.task) return toast.error('Task name is required');
    if (!data.dueDate) return toast.error('Due date is required');
    setLoading(true);
    try {
      const taskObject: Tasks = {
        task: data.task,
        user_id: userId,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        description: data.description,
        completed: false,
        dueDate: data.dueDate as string,
      };
      const result = await createTask(taskObject);
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      if (result.success) {
        setTimeout(() => {
          toast.success('Task created successfully');
          setData({ task: '', description: '', dueDate: '' });
          setLoading(false);
          closeRef.current?.click();
        }, 1000);

      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };



  return (
    <Dialog>

      <DialogTrigger>
        <SquarePenIcon />
      </DialogTrigger>

      <DialogContent className=' max-h-[85vh] w-[90vw] max-w-[450px]  rounded-md bg-white data-[state=open]:animate-contentShow overflow-hidden
      shadow-sm '>
        <DialogTitle className='px-0 py-0  border-b-[0.5px] font-medium text-base tracking-tight hidden'>New Task</DialogTitle>
        <div className='flex flex-col w-full h-full justify-between px-1 py-2'
        >
          <div className='flex flex-col gap-0.5'>
            <input className='outline-none placeholder:text-gray-400  w-full px-4 py-2 text-base placeholder:text-sm'
              placeholder='Task Name Here..'
              type='text'
              required
              name='task'
              value={data.task}
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
              <SelectDates data={data} setData={setData} />
            </div>

            <div className='flex items-center gap-2'>
              <DialogClose className='border text-gray-600 font-medium tracking-tight text-sm px-2.5 py-1 rounded-lg shadow-sm'
                ref={closeRef}
              >
                Cancel
              </DialogClose>
              <button className='bg-red-700 text-white font-medium h-[30px]
              tracking-tighter text-sm px-2.5 py-1 rounded-lg shadow-sm w-[80px] text-center'
                onClick={handleSubmit}
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

                      <span className='text-sm text-center '>Add Task</span>
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

export default TaskDialog