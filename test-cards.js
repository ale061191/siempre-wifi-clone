const fs = require('fs');
const files = ['shop.html', 'shop-planes-regionales.html', 'shop-paises.html'];
files.forEach(f => {
  const html = fs.readFileSync('holafly-clone/' + f, 'utf8');
  const match = html.match(/<span class="destination-name[^>]*>([^<]+)<\/span>/g);
  if (match) {
    console.log('--- ' + f + ' (' + match.length + ' cards) ---');
    console.log(match.slice(0, 5).join(', '));
  }
});
