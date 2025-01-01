export const formatDateMDY = (date) => {
  const dateChange = new Date(date);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Intl.DateTimeFormat('en-US', options).format(dateChange);
};
