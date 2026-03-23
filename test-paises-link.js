const fs = require('fs');
const html = fs.readFileSync('holafly-clone/shop-planes-regionales.html', 'utf8');
const regex = /<a[^>]*href="\/es\/shop\/paises\/"[^>]*>[\s\S]*?<\/a>/g;
let m;
while ((m = regex.exec(html)) !== null) {
  console.log(m[0]);
}
