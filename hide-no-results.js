const fs = require('fs');
const files = [
  'holafly-clone/index.html', 
  'holafly-clone/que-es-esim.html', 
  'holafly-clone/faq.html', 
  'holafly-clone/contacto.html',
  'holafly-clone/planes.html',
  'holafly-clone/afiliados.html',
  'holafly-clone/partners.html',
  'holafly-clone/shop.html'
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    let html = fs.readFileSync(f, 'utf8');
    
    // Explicitly hide the "no results" div that tailwind "hidden" class failed to hide
    if (html.includes('id="megamenu-no-results"')) {
        // Find the beginning of the div and add style="display:none !important;"
        html = html.replace('<div id="megamenu-no-results" class="megamenu-destinations__content-no-results hidden" bis_skin_checked="1">', '<div id="megamenu-no-results" class="megamenu-destinations__content-no-results hidden" style="display:none !important;" bis_skin_checked="1">');
        
        // Let's also hide it if the bis_skin_checked="1" wasn't there or it varied
        html = html.replace(/<div id="megamenu-no-results" class="megamenu-destinations__content-no-results hidden"[^>]*>/, '<div id="megamenu-no-results" class="megamenu-destinations__content-no-results hidden" style="display:none !important;">');
    }

    fs.writeFileSync(f, html);
    console.log('Fixed Megamenu No-Results hiding in', f);
  }
});
