const fs = require('fs');

const files = [
  'holafly-clone/index.html', 
  'holafly-clone/que-es-esim.html', 
  'holafly-clone/faq.html', 
  'holafly-clone/contacto.html',
  'holafly-clone/planes.html',
  'holafly-clone/afiliados.html',
  'holafly-clone/partners.html',
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
    // For the main shop, we only want to replace href="/es/shop/" exactly, so it doesn't break other things
    html = html.replace(/href="\/es\/shop\/"/g, 'href="shop.html"');
    html = html.replace(/href="https:\/\/esim\.holafly\.com\/es\/shop\/"/g, 'href="shop.html"');

    fs.writeFileSync(f, html);
    console.log('Replaced global hrefs in', f);
  }
});
