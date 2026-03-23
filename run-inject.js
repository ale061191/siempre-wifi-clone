const fs = require('fs');

const megamenuHtml = fs.readFileSync('megamenu.html', 'utf8');
const files = [
  'index.html', 
  'que-es-esim.html', 
  'faq.html', 
  'contacto.html',
  'planes.html',
  'afiliados.html',
  'partners.html',
  'shop.html',
  'shop-planes-regionales.html',
  'shop-paises.html',
  'shop-ciudades.html',
  'shop-destinos.html'
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    let html = fs.readFileSync(f, 'utf8');
    
    // Remove old injections completely
    html = html.replace(/<!-- NEW_MEGAMENU_START -->[\s\S]*?<!-- NEW_MEGAMENU_END -->/g, '');
    
    // Ensure the old mega menu elements are hidden or removed
    html = html.replace(/id="megaMenuDarkOverlay"/g, 'id="old_megaMenuDarkOverlay" style="display:none !important;"');
    html = html.replace(/id="megaMenuContainer"/g, 'id="old_megaMenuContainer" style="display:none !important;"');
    
    // Strip original onclick toggles to avoid conflicting
    html = html.replace(/onclick="toggleMegaMenu\.call\(this, arguments\[0\]\)"/g, '');
    
    const injection = `\n<!-- NEW_MEGAMENU_START -->\n${megamenuHtml}\n<!-- NEW_MEGAMENU_END -->\n</body>`;
    html = html.replace('</body>', injection);
    
    fs.writeFileSync(f, html);
    console.log('Injected clean megamenu into', f);
  } else {
    console.log('File not found:', f);
  }
});
