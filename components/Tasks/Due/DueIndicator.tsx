import { Tooltip } from '@/components/ui/Tooltip/Tooltip';
import { getRelativeDateLabel } from '@/utils/dates';

function DueIndicator({ dueDate, completed }: { dueDate: Date | string, completed: number | boolean }) {
  function generateIndicatorColor(dateString: string) {
    if (dateString.includes('ago')) {
      return 'bg-red-100 text-red-800 border border-red-700 ';
    }

    switch (dateString) {
      case 'Today':
        return 'bg-red-50 text-red-600';
      case 'Tomorrow':
        return 'bg-yellow-50 text-yellow-700';
      case 'In 2 days':
        return 'bg-orange-50 text-orange-700';
      default:
        return 'bg-neutral-50 text-neutral-800';
    }
  }


  const dateForTooltip = new Date(dueDate).toLocaleDateString('en-GB', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });


  return (
    <Tooltip content={dateForTooltip}>
      {completed === 0 ?
        <button className={`font-medium ${generateIndicatorColor(getRelativeDateLabel(dueDate))}
       tracking-tight text-xs hidden md:block  py-1.5 px-4 md:text-sm md:px-2.5 md:py-1.5 rounded-md shadow cursor-pointer`}
          id='due-indicator-due'>
          Due {getRelativeDateLabel(dueDate)}
        </button> :
        <button className={`font-medium bg-green-600 text-green-50 hidden md:block
       tracking-tight text-xs py-1 px-4 md:text-sm md:px-2.5 md:py-1.5 rounded-md shadow cursor-pointer`} >
          Done {getRelativeDateLabel(dueDate)}
        </button>}




    </Tooltip>
  )
}

export default DueIndicator