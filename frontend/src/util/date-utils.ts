const dayMillis = 24*60*60*1000

export const timeZoneOffsetMillis = () => new Date().getTimezoneOffset() * 60 * 1000

export const generateDateArray = (firstDay:Date, lastDay:Date) =>{
    var array = []

    var currentDate = new Date(firstDay.getTime() + timeZoneOffsetMillis() )

    while (currentDate <= lastDay) {
        array.push(new Date (currentDate));
        var auxdate = new Date(currentDate.getTime() + dayMillis);
        currentDate = auxdate
    }

    return array;
}