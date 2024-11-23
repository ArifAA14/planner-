'use client';
import { getTasks } from '@/src/app/actions/TaskService';
import { Loader } from '@/components/ui/Icons/Loader';
import { useQuery } from '@tanstack/react-query';
import { Session } from 'next-auth';
import TaskDatePicker from './Date/TaskDatePicker';
import TaskList from './List/TaskList';
import { useEffect, useState } from 'react';
import { Tasks as TaskType } from '@/types/types';

function Tasks({ session }: { session: Session | null }) {
  const userId = session?.user?.id;
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTasks, setSelectedTasks] = useState<TaskType[] | null | undefined>([]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => getTasks(userId as string),
    enabled: !!userId,
  });

  useEffect(() => {
    if (data?.tasks) {
      setSelectedTasks(data.tasks);
    }
  }, [data?.tasks]);

  useEffect(() => {
    if (selectedDate && data?.tasks) {
      const filtered = data.tasks.filter(
        (task) => task.dueDate.toString().split('T')[0] === selectedDate
      );
      setSelectedTasks(filtered.length > 0 ? filtered : data.tasks);
    }
  }, [selectedDate, data?.tasks]);

  if (!userId) return null;
  if (isLoading) return <Loader width={30} height={30} />;
  if (error) return <div>Error: {error.message}</div>;

  const overdueTasks = data?.tasks?.filter(
    (task) =>
      task.dueDate.toString().split('T')[0] <
      new Date().toISOString().split('T')[0] && !task.completed
  );
  const completedTasks = data?.tasks?.filter((task) => task.completed);
  const upcomingTasks = data?.tasks?.filter(
    (task) =>
      task.dueDate.toString().split('T')[0] >
      new Date().toISOString().split('T')[0] && !task.completed
  );

  const isArrayEqual = (arr1: TaskType[] | null | undefined, arr2: TaskType[] | undefined) => {
    if (!arr1 || !arr2) return false;
    if (arr1.length !== arr2.length) return false;
    return arr1.every((task) => arr2.some((t) => t.id === task.id));
  };

  const handleTaskFilter = (tasks: TaskType[] | undefined) => {
    if (isArrayEqual(selectedTasks, tasks)) return setSelectedTasks(data?.tasks);
    setSelectedTasks(tasks && tasks.length > 0 ? tasks : data?.tasks);
  };

  return (
    <div className='flex w-full flex-col gap-10 h-full mt-6 px-0'>
      <div className='flex items-center gap-3 w-full justify-between mb-4'>
        <TaskDatePicker
          data={data?.tasks}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          setSelectedTasks={setSelectedTasks}
        />

        <div className='flex items-center gap-0 border rounded-lg px-0'>
          <div
            className={`font-normal border-r px-2 py-2 cursor-pointer text-red-700 text-xs
                ${isArrayEqual(selectedTasks, overdueTasks) ? 'bg-red-100' : ''}
              `}
            onClick={() => handleTaskFilter(overdueTasks)}
          >
            Overdue ({overdueTasks?.length || 0})
          </div>

          <div
            className={`
              font-normal border-r  py-2 px-2 cursor-pointer text-green-700 text-xs
                ${isArrayEqual(selectedTasks, completedTasks) ? 'bg-green-100' : ''}
              `}
            onClick={() => handleTaskFilter(completedTasks)}
          >
            Completed ({completedTasks?.length || 0})
          </div>

          <div
            className={`cursor-pointer text-yellow-700 px-2 text-xs py-2 rounded-r-lg
                ${isArrayEqual(selectedTasks, upcomingTasks) ? 'bg-yellow-100' : ''}
              `}
            onClick={() => handleTaskFilter(upcomingTasks)}
          >
            Upcoming ({upcomingTasks?.length || 0})
          </div>
        </div>
      </div>

      <TaskList data={selectedTasks} />
    </div>
  );
}

export default Tasks;
