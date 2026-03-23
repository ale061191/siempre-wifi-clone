const fs = require('fs');
const files = ['shop.html', 'shop-planes-regionales.html', 'shop-paises.html', 'shop-ciudades.html', 'shop-destinos.html'];
files.forEach(f => {
  const html = fs.readFileSync('holafly-clone/' + f, 'utf8');
  const match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (match) {
    console.log(f + ': ' + match[1].trim());
  } else {
    console.log(f + ': No h1 found');
  }
});
