const moment = require('moment');

let createdAt = 1234;
let date = moment(createdAt);
let someTimestamp = moment().valueOf();
console.log(someTimestamp);
// Playing with moment manipulation
// date.add(1, 'year').subtract(8, 'months');

// Jan 1st 1970 00:00:00 am
console.log(date.format('MMM Do YYYY HH:mm:ss'));

// 10:35 am
console.log(date.format('h:mm a'))
