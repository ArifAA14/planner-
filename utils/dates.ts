const getNext20Days = () => {
  const dates = [];
  const today = new Date();

  for (let i = 0; i < 20; i++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + i);

    // Format date as "10th November 24"
    const day = currentDate.getDate();
    const suffix = (day: number) => {
      if (day % 10 === 1 && day !== 11) return 'st';
      if (day % 10 === 2 && day !== 12) return 'nd';
      if (day % 10 === 3 && day !== 13) return 'rd';
      return 'th';
    };

    const formattedDate = `${day}${suffix(day)} ${currentDate.toLocaleDateString('en-GB', {
      month: 'long',
    })} ${currentDate.getFullYear().toString().slice(-2)}`;

    dates.push(formattedDate);
  }

  return dates;
};

export default getNext20Days;