import { Tasks } from '@/types/types';
import { AnimatePresence, motion } from 'framer-motion';
import TaskDelete from '../TaskDelete';
import CheckboxRoot from '@/components/ui/Inputs/Checkbox';

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
            layoutId={task.id} // Set layoutId to stabilize individual items
            variants={childVariants}
            layout
          >
            <CheckboxRoot checked={task.completed} id={task.id} />
            <div className="flex flex-col gap-0.5 w-full">
              <h3
                className={`text-black font-medium md:text-xl text-lg ${task.completed === 0 ? '' : 'line-through'}`}
              >
                {task.task}
              </h3>
              <p className="text-gray-400 font-normal text-sm">
                {task.description}
              </p>
            </div>

            <div className="flex w-full items-end justify-end">
              <TaskDelete taskId={task.id} />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

export default TaskList;