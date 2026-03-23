const fs = require('fs');
const path = require('path');

const megamenuHtml = fs.readFileSync('megamenu.html', 'utf8');
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
    
    html = html.replace(/id="megaMenuDarkOverlay"/g, 'id="old_megaMenuDarkOverlay" style="display:none !important;"');
    html = html.replace(/id="megaMenuContainer"/g, 'id="old_megaMenuContainer" style="display:none !important;"');
    
    html = html.replace(/<!-- NEW_MEGAMENU_START -->[\s\S]*?<!-- NEW_MEGAMENU_END -->/g, '');

    html = html.replace(/<div class="destinos-no-result" id="no-resultados-container">[\s\S]*?<\/div><!-- ends destinos-no-result -->/g, '');
    html = html.replace(/<div class="destinos-no-result">[\s\S]*?<\/div>/g, ''); 
    
    html = html.replace(/onclick="toggleMegaMenu\.call\(this, arguments\[0\]\)"/g, '');
    
    const injection = `\n<!-- NEW_MEGAMENU_START -->\n${megamenuHtml}\n<!-- NEW_MEGAMENU_END -->\n</body>`;
    html = html.replace('</body>', injection);
    
    fs.writeFileSync(f, html);
    console.log('Injected clean megamenu into', f);
  }
});
