export const formateDate = (date: Date) => {
  const myDate = new Date(date);

  const year = myDate.getFullYear();
  const month = String(myDate.getMonth() + 1).padStart(2, "0");
  const day = String(myDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
