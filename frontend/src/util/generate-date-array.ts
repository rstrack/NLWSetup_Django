export const generateDateArray = (firstDay:Date, lastDay:Date) =>{
    var array = []
    var currentDate = firstDay;
    while (currentDate <= lastDay) {
        array.push(new Date (currentDate));
        var auxdate = new Date(currentDate);
        auxdate.setDate(auxdate.getDate() + 1);
        currentDate = auxdate
    }
    return array;
}