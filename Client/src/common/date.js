export function toShortDate(dateTime) {
    let _dateTime = new Date(dateTime);
    let date = '';
    if (!isNaN(_dateTime)) {
        let month = _dateTime.getMonth() < 10 ? `0${_dateTime.getMonth()}` : _dateTime.getMonth();
        let day = _dateTime.getDay() < 10 ? `0${_dateTime.getDay()}` : _dateTime.getDay();
        date = `${_dateTime.getFullYear()}-${month}-${day}`;
    }
    return date;
}
