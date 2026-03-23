const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('holafly-clone/index.html', 'utf8');
const $ = cheerio.load(html);
let out = '';
$('a').each((i, el) => {
  const t = $(el).text().trim().replace(/\s+/g, ' ');
  if (t) {
    out += `TEXT: "${t}" -> HREF: "${$(el).attr('href')}"\n`;
  }
});
fs.writeFileSync('links_utf8.txt', out, 'utf8');
console.log("Links saved to links_utf8.txt");
