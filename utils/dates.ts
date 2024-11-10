export const getNext20Days = () => {
  const dates = [];
  const today = new Date();

  for (let i = 0; i < 20; i++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + i);
    dates.push(currentDate.toISOString());
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