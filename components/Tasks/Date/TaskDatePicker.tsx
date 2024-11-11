'use client'
import { Tasks } from '@/types/types'
import DayPicker from './Picker'

function TaskDatePicker({ data, selectedDate, setSelectedDate }: { data: Tasks[] | null | undefined, selectedDate: string, setSelectedDate: React.Dispatch<React.SetStateAction<string>> }) {

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
    <div className='flex items-center gap-3'>
      <DayPicker days={days}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate} />


      {selectedDate !== '' ?
        <div className='bg-red-100  py-0.5 px-4 rounded-xl cursor-pointer text-red-700'
          onClick={() => setSelectedDate('')}
        >
          <h2 className="text-red-700 font-normal text-sm">
            Show All
          </h2>
        </div>
        : null
      }
    </div>
  )
}

export default TaskDatePicker