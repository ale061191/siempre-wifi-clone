const fs = require('fs');
const files = ['shop.html', 'shop-planes-regionales.html', 'shop-paises.html', 'shop-ciudades.html', 'shop-destinos.html'];
files.forEach(f => {
  const html = fs.readFileSync('holafly-clone/' + f, 'utf8');
  if (html.includes('shop-planes-regionales.html')) {
    console.log(f + ' has the routing script');
  } else {
    console.log(f + ' DOES NOT HAVE the routing script!');
  }
});
