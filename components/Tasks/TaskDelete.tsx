import { DeleteIcon } from '../ui/Icons/Delete';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTask } from '@/app/actions/TaskService';
import { Tasks } from '@/types/types';

function TaskDelete({ taskId }: { taskId: string }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deleteTask(taskId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] })

      const previousTasks = queryClient.getQueryData(['tasks'])

      queryClient.setQueryData(['tasks'], (old: { tasks: Tasks[] }) => ({
        tasks: old?.tasks.filter((task: Tasks) => task.id !== taskId)
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

  return (
    <div className="hover:text-red-700" onClick={() => mutation.mutate()}>
      <DeleteIcon width={24} height={24} />
    </div>
  );
}

export default TaskDelete;