const fs = require('fs');

const files = [
  'holafly-clone/shop.html',
  'holafly-clone/shop-planes-regionales.html',
  'holafly-clone/shop-paises.html',
  'holafly-clone/shop-ciudades.html',
  'holafly-clone/shop-destinos.html'
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    let html = fs.readFileSync(f, 'utf8');
    
    // Replace exact hrefs to prevent Astro from breaking
    html = html.replace(/href="\/es\/shop\/planes-regionales\/"/g, 'href="shop-planes-regionales.html"');
    html = html.replace(/href="\/es\/shop\/paises\/"/g, 'href="shop-paises.html"');
    html = html.replace(/href="\/es\/shop\/ciudades\/"/g, 'href="shop-ciudades.html"');
    html = html.replace(/href="\/es\/shop\/destinos\/"/g, 'href="shop-destinos.html"');
    html = html.replace(/href="\/es\/shop\/"/g, 'href="shop.html"');

    // Remove Astro's client-side routing attributes for these links if any
    html = html.replace(/data-astro-prefetch/g, '');

    fs.writeFileSync(f, html);
    console.log('Replaced hrefs directly in', f);
  }
});
