'use client'
import { Tasks } from '@/types/types'
import DayPicker from './Picker'
import { useTranslations } from 'next-intl';

function TaskDatePicker({ data, selectedDate, setSelectedDate, setSelectedTasks }:
  {
    data: Tasks[] | null | undefined, selectedDate: string,
    setSelectedDate: React.Dispatch<React.SetStateAction<string>>,
    setSelectedTasks: React.Dispatch<React.SetStateAction<Tasks[] | null | undefined>>

  }) {
  const t = useTranslations('TaskDatePicker');
  const days = [...new Set(
    data?.map(task => {
      const dueDate = task.dueDate instanceof Date
        ? task.dueDate.toISOString().split('T')[0]
        : task.dueDate.split('T')[0];
      return dueDate;
    }) || []
  )].sort((a, b) => {
    const dateA = new Date(a + 'T12:00:00Z');
    const dateB = new Date(b + 'T12:00:00Z');
    return dateA.getTime() - dateB.getTime();
  });




  return (
    <div className='flex gap-4 items-center'>
      <DayPicker days={days}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate} />


      {selectedDate !== '' ?
        <div className='bg-neutral-100  py-0.5 px-4 rounded-lg border cursor-pointer text-neutral-700'
          onClick={() => setSelectedTasks(data)}
        >
          <h2 className=" font-normal text-sm">
            {t('Show All')}
          </h2>
        </div>
        : null
      }
    </div>


  )
}

export default TaskDatePicker