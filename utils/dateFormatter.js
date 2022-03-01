export const dateFormatter = (date) => {
  const newDate = new Date(date.seconds);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
  };
  const formattedHour = newDate.toLocaleTimeString('en-UK').slice(0, -3);
  const formattedDate = newDate.toLocaleDateString('en-UK', options);

  return `${formattedDate}, ${formattedHour}`;
};
