export const getLastDate = (key) => {
  const date = new Date();

  switch (key) {
    case 'year':
      return date.getFullYear();
    case 'month':
      return date.getMonth() - 1;
    case 'day':
      return date.getDate();
    default:
      return NaN;
  }
};

export const getDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month =
    date.getMonth() > 8 ? date.getMonth() : '0' + (date.getMonth() + 1);
  const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
  return `${year}${month}${day}`;
};
