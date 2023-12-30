export const currencyFormat = (num) => {
  return num?.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export const getDayDifference = (startDate, endDate) => {
  const newEndDate = new Date(endDate)
  const newStartDate = new Date(startDate)
  // To calculate the time difference of two dates
  let Difference_In_Time = newEndDate?.getTime() - newStartDate?.getTime()

  // To calculate the no. of days between two dates
  let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24))

  return Difference_In_Days
}
