const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('public/তারাবীহর সালাতে কুরআনের বার্তা [boimate.com].pdf');

pdf(dataBuffer).then(function (data) {
    console.log("Pages:", data.numpages);
    console.log(data.text.substring(0, 5000));
}).catch(err => {
    console.error(err);
});
