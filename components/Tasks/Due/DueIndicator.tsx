import { Tooltip } from '@/components/ui/Tooltip/Tooltip';
import { getRelativeDateLabel } from '@/utils/dates'
import React from 'react'

function DueIndicator({ dueDate }: { dueDate: Date | string }) {

  function generateIndicatorColor(dateString: string) {
    switch (dateString) {
      case 'Today':
        return 'bg-red-50 border border-red-700 text-red-700';
      case 'Tomorrow':
        return 'bg-yellow-50 border border-yellow-700 text-yellow-700';
      case 'In 2 days':
        return 'bg-yellow-50 border border-yellow-700 text-yellow-700';
      case 'In 3 days':
        return 'bg-green-50 border border-green-700 text-green-700';
      default:
        return 'bg-green-50 border border-green-700 text-green-700';
    }
  }

  const dateForTooltip = new Date(dueDate).toLocaleDateString('en-GB', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });


  return (
    <Tooltip content={dateForTooltip}>
      <button className={`font-medium ${generateIndicatorColor(getRelativeDateLabel(dueDate))}
     tracking-tight text-xs p-2 md:text-sm md:px-4 md:py-2 rounded-md shadow-sm cursor-pointer`}>
        {getRelativeDateLabel(dueDate)}
      </button>
    </Tooltip>
  )
}

export default DueIndicator