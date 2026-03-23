const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('holafly-clone/index.html', 'utf8');
const $ = cheerio.load(html);
$('a').each((i, el) => {
  const t = $(el).text();
  if (t && t.includes('FAQ')) {
    console.log(`TEXT: "${t.trim()}" -> HREF: "${$(el).attr('href')}"`);
  }
});
