const FormatDate = (date) => {
  date = new Date(date);
  return (
    date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
  );
};

const FormatInput = (date) => {
  const data = date.split("-");
  //console.log(data);
  return data[2] + "-" + data[1] + "-" + data[0];
};
export { FormatDate, FormatInput };
