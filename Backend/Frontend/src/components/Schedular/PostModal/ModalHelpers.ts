import dayjs, { Dayjs } from 'dayjs';

export const validDate = (date: string) => {
  const convertedDate = dayjs(date);

  // Calculate upcoming date
  const upcomingDate = convertedDate.add(74, 'day');

  return dayjs(upcomingDate).format('YYYY-MM-DDTHH:mm');
};
export const validTime = () => {
  const currentTime = new Date();
  const newTime = new Date(currentTime.getTime() + 15 * 60000);

  // Format the new time for display
  const hours = newTime.getHours();
  const minutes = newTime.getMinutes();
  const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  return formattedTime;
};
