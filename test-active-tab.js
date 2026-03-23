const fs = require('fs');
const html = fs.readFileSync('holafly-clone/shop.html', 'utf8');
const matches = [...html.matchAll(/<a[^>]*href="\/es\/shop\/?[^>]*>[\s\S]*?<span[^>]*class="label">([^<]+)<\/span><\/a>/g)];
matches.forEach(m => {
  if (m[0].includes('volare-icon-interface-check')) {
    console.log('ACTIVE: ' + m[1]);
  } else {
    console.log('Inactive: ' + m[1]);
  }
});
