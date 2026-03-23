const fs = require('fs');
const html = fs.readFileSync('holafly-clone/shop.html', 'utf8');
const regex = /<a[^>]*href="([^"]+)"[^>]*>[\s\S]*?<span[^>]*class="label">([^<]+)<\/span>/g;
let m;
while ((m = regex.exec(html)) !== null) {
  console.log('Href: ' + m[1] + ' | Text: ' + m[2]);
}
