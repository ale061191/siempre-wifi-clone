const fs = require('fs');
const html = fs.readFileSync('holafly-clone/shop.html', 'utf8');
const index = html.indexOf('<span class="label">Popular</span>');
if (index !== -1) {
  console.log(html.substring(Math.max(0, index - 500), index + 500));
} else {
  console.log("Not found");
}
