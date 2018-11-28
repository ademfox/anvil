"use strict";
exports.__esModule = true;
var DateTimeUtil = (function () {
    function DateTimeUtil(yearOrDateTimeString, month, day) {
        if (yearOrDateTimeString === void 0) { yearOrDateTimeString = 1; }
        if (month === void 0) { month = 1; }
        if (day === void 0) { day = 1; }
        this.day = 1;
        this.month = 1;
        this.year = 2017;
        this.hour = 0;
        this.minute = 0;
        this.second = 0;
        if (typeof yearOrDateTimeString === 'string') {
            if (yearOrDateTimeString.match(DateTimeUtil.dateTimeStringRegex) ||
                yearOrDateTimeString.match(DateTimeUtil.dateStrictStringRegex)) {
                this.setFromString(yearOrDateTimeString);
            }
        }
        else if (typeof yearOrDateTimeString === 'number') {
            this.setDate(yearOrDateTimeString, month, day);
        }
        return this;
    }
    DateTimeUtil.prototype.setDate = function (year, month, day) {
        this.year = year;
        this.month = month;
        this.day = day;
        return this;
    };
    DateTimeUtil.prototype.setFromString = function (string) {
        this.day = DateTimeUtil.getDayFromString(string);
        this.month = DateTimeUtil.getMonthFromString(string);
        this.year = DateTimeUtil.getYearFromString(string);
        if (string.match(DateTimeUtil.dateTimeStringRegex)) {
            this.hour = DateTimeUtil.getHourFromString(string);
            this.minute = DateTimeUtil.getMinuteFromString(string);
            this.second = DateTimeUtil.getSecondFromString(string);
        }
        return this;
    };
    DateTimeUtil.IsDateString = function (string) {
        return string.match(DateTimeUtil.dateStrictStringRegex) ? true : false;
    };
    DateTimeUtil.IsDateTimeString = function (string) {
        return string.match(DateTimeUtil.dateTimeStringRegex) ? true : false;
    };
    DateTimeUtil.getDayFromString = function (string) {
        return Number(string.match(DateTimeUtil.dateStringRegex)[3]);
    };
    DateTimeUtil.getHourFromString = function (string) {
        return Number(string.match(DateTimeUtil.dateTimeStringRegex)[4]);
    };
    DateTimeUtil.getMinuteFromString = function (string) {
        return Number(string.match(DateTimeUtil.dateTimeStringRegex)[5]);
    };
    DateTimeUtil.getMonthFromString = function (string) {
        return Number(string.match(DateTimeUtil.dateStringRegex)[2]);
    };
    DateTimeUtil.getSecondFromString = function (string) {
        return Number(string.match(DateTimeUtil.dateTimeStringRegex)[6]);
    };
    DateTimeUtil.getYearFromString = function (string) {
        return Number(string.match(DateTimeUtil.dateStringRegex)[1]);
    };
    DateTimeUtil.getDayOfWeek = function (year, month, day) {
        var days = DateTimeUtil.getNumberOfDaysFromYearZero(year, month, day);
        var remainder = (days + 6) % 7;
        return remainder + 1;
    };
    DateTimeUtil.getDayOfWeekString = function (year, month, day) {
        var dayOfWeek = DateTimeUtil.getDayOfWeek(year, month, day);
        return DateTimeUtil.dayOfWeekStrings[dayOfWeek - 1];
    };
    DateTimeUtil.getNumberOfDaysFromYearZero = function (year, month, day) {
        var sum = (year * 365) + DateTimeUtil.getNumberOfLeapYears(year);
        sum += DateTimeUtil.getNumberOfDaysInMonth(year, month);
        sum += day;
        return sum;
    };
    DateTimeUtil.getNumberOfDaysInMonth = function (year, month) {
        if (DateTimeUtil.isLeapYear(year) &&
            month === 2) {
            return 29;
        }
        else {
            return DateTimeUtil.numberOfDaysInMonth[month + 1];
        }
    };
    DateTimeUtil.getNumberOfLeapYears = function (year) {
        var leapYears = Math.floor(year / 4);
        if (year > 100) {
            leapYears -= Math.floor(year / 100);
        }
        if (year > 400) {
            leapYears -= Math.floor(year / 400);
        }
        return leapYears;
    };
    DateTimeUtil.getTotalNumberOfDaysInMonth = function (year, month) {
        var sum = 0;
        var i = 0;
        while (i < month) {
            sum += DateTimeUtil.getNumberOfDaysInMonth(year, i + 1);
            i++;
        }
        return sum;
    };
    DateTimeUtil.isLeapYear = function (year) {
        var isLeapYear = false;
        if (year % 4 === 0) {
            isLeapYear = true;
        }
        return isLeapYear;
    };
    DateTimeUtil.dateStringRegex = '^([0-9]{4})-(0[0-9]|1[0-2])-([0-2][0-9]|3[0-1])';
    DateTimeUtil.dateStrictStringRegex = '^([0-9]{4})-(0[0-9]|1[0-2])-([0-2][0-9]|3[0-1])$';
    DateTimeUtil.dateTimeStringRegex = '^([0-9]{4})-(0[0-9]|1[0-2])-([0-2][0-9]|3[0-1]) ([0-1][0-9]|2[0-3]):([0-4][0-9]|5[0-9]):([0-4][0-9]|5[0-9])$';
    DateTimeUtil.dayOfWeekStrings = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    DateTimeUtil.monthStrings = ['January', 'Februrary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    DateTimeUtil.numberOfDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return DateTimeUtil;
}());
exports.DateTimeUtil = DateTimeUtil;
//# sourceMappingURL=DateTimeUtil.js.map