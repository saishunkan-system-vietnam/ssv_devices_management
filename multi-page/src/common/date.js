export function toShortDate(dateTime, format_date = true, format_time = false, format_UTC = false) {
    let _dateTime = new Date(dateTime);
    let date = '';
    if (!isNaN(_dateTime)) {
        let month = _dateTime.getMonth() < 10 ? `0${_dateTime.getMonth() + 1}` : _dateTime.getMonth() + 1;
        let day = _dateTime.getDate() < 10 ? `0${_dateTime.getDate()}` : _dateTime.getDate();
        let year = _dateTime.getFullYear();
        let hour = _dateTime.getHours() < 10 ? `0${_dateTime.getHours()}` : _dateTime.getHours();
        let minutes = _dateTime.getMinutes() < 10 ? `0${_dateTime.getMinutes()}` : _dateTime.getMinutes();
        let second = _dateTime.getSeconds() < 10 ? `0${_dateTime.getSeconds()}` : _dateTime.getSeconds();
        if (format_date === true) {
            date += `${year}-${month}-${day}`;
        }
        if (format_time === true) {
            date += ` ${hour}:${minutes}:${second}`;
        }
        if (format_UTC === true) {
            date = `${year}-${month}-${day}T${hour}:${minutes}:${second}`
        }
    }
    return date.trim();
}

