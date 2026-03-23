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
    
    // Replace exact hrefs to prevent Astro from taking over navigation
    html = html.replace(/href="\/es\/blog\/esim\/que-es-esim\/"/g, 'href="que-es-esim.html"');
    html = html.replace(/href="\/es\/faq\/"/g, 'href="faq.html"');
    html = html.replace(/href="\/es\/planes-esim\/"/g, 'href="planes.html"');
    html = html.replace(/href="\/es\/programa-afiliados\/"/g, 'href="afiliados.html"');
    html = html.replace(/href="\/es\/"/g, 'href="index.html"');
    
    // Also remove the prefetch attributes for these newly replaced links
    html = html.replace(/data-astro-prefetch/g, '');

    fs.writeFileSync(f, html);
    console.log('Replaced top navbar hrefs in', f);
  }
});
