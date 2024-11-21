'use client';
import { getTasks } from '@/src/app/actions/TaskService';
import { Loader } from '@/components/ui/Icons/Loader';
import { useQuery } from '@tanstack/react-query';
import { Session } from 'next-auth';
import TaskDatePicker from './Date/TaskDatePicker';
import TaskList from './List/TaskList';
import { useState } from 'react';

function Tasks({ session }: { session: Session | null }) {
  const userId = session?.user?.id;
  const [selectedDate, setSelectedDate] = useState<string>('');
  const { data, isLoading, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => getTasks(userId as string),
    enabled: !!userId,

  })
  if (!userId) return null;
  if (isLoading) return <Loader width={30} height={30} />;
  if (error) return <div>Error: {error.message}</div>;
  if (!data?.tasks) return <div className='text-red-700 text-xl font-medium mt-16 text-left w-full'>
    Nothing found here, get started by creating a task by using the button on the top right corner.
  </div>;

  const filteredTasks = data?.tasks?.filter(task => task.dueDate.toString().split('T')[0] === selectedDate);

  const overdueTasks = data?.tasks?.filter(task => task.dueDate.toString().split('T')[0] < new Date().toISOString().split('T')[0] && !task.completed).length;
  const completedTasks = data?.tasks?.filter(task => task.completed).length;
  const upcomingTasks = data?.tasks?.filter(task => task.dueDate.toString().split('T')[0] > new Date().toISOString().split('T')[0]).length;



  return (
    <div className='flex w-full flex-col gap-10 h-full mt-6 px-0' >
      <div className='flex items-center gap-3 w-full justify-between mb-4'>
        <TaskDatePicker data={data?.tasks} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

        <div className='flex items-center gap-4'>
          <div className='bg-white border border-red-700 font-normal shadow-sm rounded-lg py-1 px-4 cursor-pointer text-red-700 text-sm'
          >
            Overdue ({overdueTasks})
          </div>

          <div className='bg-white border border-green-700 font-normal shadow-sm rounded-lg py-1 px-4 cursor-pointer text-green-700 text-sm'
          >
            Completed ({completedTasks})
          </div>

          <div className='bg-white border border-yellow-700 font-normal shadow-sm rounded-lg py-1 px-4 cursor-pointer text-yellow-700 text-sm'
          >
            Upcoming ({upcomingTasks})
          </div>
        </div>
      </div>

      <TaskList data={filteredTasks && filteredTasks.length > 0 ? filteredTasks : data?.tasks} />
    </div>
  )
}

export default Tasks