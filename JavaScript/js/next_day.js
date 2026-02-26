/*
 * Functions to determine the next day after a given date
 *
 * Gilberto Echeverria
 * 2025-02-10
 */

function isLeap(year) {
    if ((year % 4 == 0 && year % 100 != 0) ||(year % 400 == 0))
        return true;
    return false
}

function monthDays(month, year) {
    if (month == 4 || month == 6 || month == 9 || month == 11)
        return 30;
    else if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month ==12)
        return 31;
    else if (isLeap(year) && month == 2)
        return 29;
    else
        return 28;
}

function nextDay(day, month, year) {
    let nextDay = day;
    let nextMonth = month;
    let nextYear = year;
    let currentMonth = monthDays(month,year);
    if (day == currentMonth){
        nextDay = 1;
        if(month == 12){
            nextMonth = 1;
            nextYear += 1;
        }
        else
            nextMonth += 1;
    }
    else
        nextDay += 1;    
    
    return [nextDay,nextMonth,nextYear]
}

export { isLeap, monthDays, nextDay };
