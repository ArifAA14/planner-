import { Tasks } from '@/types/types';
import { AnimatePresence, motion } from 'framer-motion';
import TaskDelete from '../TaskDelete';
import CheckboxRoot from '@/components/ui/Inputs/Checkbox';
import TaskEdit from '../TaskEdit';
import { getRelativeDateLabel } from '@/utils/dates';


function TaskList({ data }: { data: Tasks[] | null | undefined }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };



  return (
    <motion.div
      className='flex flex-col gap-6'
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
      layout
    >
      <AnimatePresence mode="sync">
        {data?.map((task) => (
          <motion.div
            className="flex w-full h-full gap-2 items-center"
            key={task.id}
            layoutId={task.id}
            variants={childVariants}
            layout
          >
            <CheckboxRoot checked={task.completed} id={task.id} />
            <div className="flex flex-col gap-0.5 w-full">
              <h3
                className={`text-black font-medium text-lg ${task.completed === 0 ? '' : 'line-through'}`}
              >
                {task.task}
              </h3>
              <p className="text-gray-400 font-normal text-sm">
                {task.description}
              </p>
            </div>

            <div className="flex w-full items-center justify-end gap-6">
              <div className='bg-red-50 border border-red-700 text-red-700 font-medium tracking-tight text-xs p-2 md:text-sm md:px-4 md:py-2 rounded-xl'>
                {getRelativeDateLabel(task.dueDate)}
              </div>
              <TaskEdit task={task} />
              <TaskDelete taskId={task.id} />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

export default TaskList;
