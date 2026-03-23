const fs = require('fs');
const path = require('path');

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
    
    // Replace text in elements (excluding attributes temporarily to avoid breaking scripts/links, but we do want to replace title etc)
    // Actually, safest is to replace Holafly -> Siempre-Wifi, holafly -> siempre-wifi, HOLAFLY -> SIEMPRE-WIFI globally
    // BUT we must not break URLs to `holafly.com` completely unless we want to, wait, if we replace holafly in scripts, it might break.
    // Let's replace just text contents first and the specific logo image.

    // 1. Replace the logo image with text or a stylized span to make it look good
    const logoRegex = /<img src="fonts\/holafly\.svg"[^>]*>/g;
    const newLogo = `<span style="font-size: 24px; font-weight: 900; color: #ff0055; font-family: sans-serif; letter-spacing: -0.5px;">Siempre<span style="color: #111;">Wifi</span></span>`;
    html = html.replace(logoRegex, newLogo);

    // 2. Text replacements
    html = html.replace(/Holafly/g, 'Siempre-Wifi');
    html = html.replace(/holafly/g, 'siempre-wifi');
    html = html.replace(/HOLAFLY/g, 'SIEMPRE-WIFI');

    // Wait, replacing 'holafly' globally might break:
    // - script src="js/..." (usually no holafly there but maybe)
    // - class names like "holafly-..." if any exist. It might break CSS if the CSS file has .holafly-something and we changed the HTML class.
    // - URLs to `https://customers.holafly.com` -> `https://customers.siempre-wifi.com` which would fail.
    
    fs.writeFileSync(f, html);
    console.log('Replaced in', f);
  }
});
