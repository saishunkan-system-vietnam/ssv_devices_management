export function toShortDate(dateTime) {
    let _dateTime = new Date(dateTime);
    let date = '';
    if (!isNaN(_dateTime)) {
        let month = _dateTime.getMonth() < 10 ? `0${_dateTime.getMonth() + 1}` : _dateTime.getMonth() + 1;
        let day = _dateTime.getDate() < 10 ? `0${_dateTime.getDate()}` : _dateTime.getDate();
        date = `${_dateTime.getFullYear()}-${month}-${day}`;
    }
    return date;
}
