const fs = require('fs');
const html = fs.readFileSync('holafly-clone/shop.html', 'utf8');
let i = html.indexOf('Planes regionales');
i = html.indexOf('Planes regionales', i + 1);
console.log(html.substring(Math.max(0, i - 100), i + 400));
