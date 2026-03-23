const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('holafly-clone/index.html', 'utf8');
const $ = cheerio.load(html);
$('a').each((i, el) => {
  const href = $(el).attr('href');
  if (href && href.includes('que-es-esim.html')) {
    console.log($.html(el));
  }
});
