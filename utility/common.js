exports.filterByDate = (data, start_date, end_date) => {
  const sDate = new Date(start_date).getTime();
  const eDate = new Date(end_date).getTime();
  return data.filter(item => {
    const tDate = new Date(item.created_at).getTime();
    if (!sDate && !eDate) return true;
    if (sDate && eDate && tDate >= sDate && tDate <= eDate) return true;
    if (sDate && !eDate && tDate >= sDate) return true;
    if (eDate && !sDate && tDate <= eDate) return true;
    return false;
  });
};
