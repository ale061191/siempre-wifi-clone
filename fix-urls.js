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
    
    // Fix external URLs that were accidentally broken by the global replace
    html = html.replace(/siempre-wifi\.com/g, 'holafly.com');
    // But then let's re-replace text nodes carefully, or just let it be if we want the links to still go to holafly for login etc
    // The prompt says "cambies todas las palabras que dicen holafly... por la palabra Siempre-Wifi"
    // Wait, replacing 'siempre-wifi.com' back to 'holafly.com' will ensure JS and assets work.
    
    // Re-fix specific URLs that should not be changed for resources
    html = html.replace(/com\.siempre-wifi\.siempre-wifi/g, 'com.holafly.holafly');
    html = html.replace(/@siempre-wifi_com/g, '@holafly_com');
    
    fs.writeFileSync(f, html);
    console.log('Fixed URLs in', f);
  }
});
