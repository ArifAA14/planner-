'use client';
import { getTasks } from '@/app/actions/TaskService';
import { Loader } from '@/components/ui/Icons/Loader';
import { useQuery } from '@tanstack/react-query';
import { Session } from 'next-auth';
import TaskList from './List/TaskList';

function Tasks({ session }: { session: Session | null }) {
  const userId = session?.user?.id;
  const { data, isLoading, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => getTasks(userId as string),
    enabled: !!userId,

  })
  if (!userId) return null;

  if (isLoading) return <Loader width={30} height={30} />;
  if (error) return <div>Error: {error.message}</div>;
  if (data?.tasks?.length === 0) return <div>No tasks found</div>;


  return (
    <div className='flex w-full flex-col gap-10 h-full mt-6 px-0' >
      <div className='flex items-center gap-3'>
        <h2 className="text-black font-normal text-lg">
          Today
        </h2>
        <div className='bg-neutral-100 border py-0.5 px-4 rounded-xl '>
          <h2 className="text-black font-normal text-lg">
            {data?.tasks?.length}
          </h2>
        </div>
      </div>


      <TaskList data={data?.tasks} />
    </div>
  )
}

export default Tasks