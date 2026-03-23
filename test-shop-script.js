const fs = require('fs');
const html = fs.readFileSync('holafly-clone/shop.html', 'utf8');
const i = html.indexOf('Routing intercepts');
console.log(html.substring(Math.max(0, i - 200), i + 200));
