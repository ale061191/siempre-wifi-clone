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
    
    // Remove ANY existing NEW_MEGAMENU blocks whether they have END or not
    // We'll split by NEW_MEGAMENU_START, take the first part, and discard the rest if we have to.
    // Actually, safer:
    let startIndex = html.indexOf('<!-- NEW_MEGAMENU_START -->');
    if (startIndex !== -1) {
       let endIndex = html.indexOf('<!-- NEW_MEGAMENU_END -->');
       if (endIndex !== -1) {
           html = html.substring(0, startIndex) + html.substring(endIndex + '<!-- NEW_MEGAMENU_END -->'.length);
       } else {
           // If it lacks END, just cut everything from START to the end of the file or </body>
           let bodyEnd = html.indexOf('</body>', startIndex);
           if (bodyEnd !== -1) {
               html = html.substring(0, startIndex) + html.substring(bodyEnd);
           } else {
               html = html.substring(0, startIndex); // brutal cut
           }
       }
    }
    
    // hide old
    html = html.replace(/id="megaMenuDarkOverlay"/g, 'id="old_megaMenuDarkOverlay" style="display:none !important;"');
    html = html.replace(/id="megaMenuContainer"/g, 'id="old_megaMenuContainer" style="display:none !important;"');
    html = html.replace(/onclick="toggleMegaMenu\.call\(this, arguments\[0\]\)"/g, '');
    
    const injection = `\n<!-- NEW_MEGAMENU_START -->\n${megamenuHtml}\n<!-- NEW_MEGAMENU_END -->\n`;
    
    if (html.includes('</body>')) {
        html = html.replace('</body>', injection + '</body>');
    } else {
        html = html + injection;
    }
    
    fs.writeFileSync(f, html);
    console.log('Force injected into', f);
  }
});
