
export default {
getDateFormat: (date) => {
    let givenDate = new Date(date);
    let dateFormat = givenDate.getDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthFormat = monthNames[givenDate.getMonth()];
    // let monthFormat = givenDate.getMonth() + 1;
    let yearFormat = givenDate.getFullYear();
    let selectDate = dateFormat + '/' + monthFormat + '/' + yearFormat;
    return selectDate;
  }
}
