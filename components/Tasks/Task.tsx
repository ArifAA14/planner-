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
  if (data?.tasks?.length === 0) return <div>No tasks found</div>;

  const filteredTasks = data?.tasks?.filter(task => task.dueDate.toString().split('T')[0] === selectedDate);


  return (
    <div className='flex w-full flex-col gap-10 h-full mt-6 px-0' >
      <TaskDatePicker data={data?.tasks} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <TaskList data={filteredTasks && filteredTasks.length > 0 ? filteredTasks : data?.tasks} />
    </div>
  )
}

export default Tasks