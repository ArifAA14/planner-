import { formatDistanceToNowStrict, isToday, isTomorrow, isPast } from 'date-fns';


export const getNext20Days = () => {
  const dates = [];
  const today = new Date();

  for (let i = 0; i < 20; i++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + i);

    // Get the date in YYYY-MM-DD format and explicitly set to noon UTC
    const dateString = currentDate.toISOString().split('T')[0];
    const utcDate = new Date(`${dateString}T12:00:00.000Z`);

    dates.push(utcDate.toISOString());
  }
  return dates;
};

export const readbleDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString('en-GB', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function getRelativeDateLabel(dueDate: Date | string) {
  const date = new Date(dueDate);

  if (isToday(date)) {
    return 'Today';
  } else if (isTomorrow(date)) {
    return 'Tomorrow';
  } else if (isPast(date)) {
    return `${formatDistanceToNowStrict(date)} ago`;
  } else {
    return `In ${formatDistanceToNowStrict(date)}`;
  }
}