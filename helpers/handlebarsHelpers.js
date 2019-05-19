const moment = require('moment');

exports.timePretty = function(time) {
    return moment(time).format("dddd, ha");
}

exports.timeHourFormat = function(time) {
    return moment(time).format("hh:mm a");
}

exports.conferenceExpiredDisable = function(status) {
    if(status === "complete") return "disabled";
    return "";
}
