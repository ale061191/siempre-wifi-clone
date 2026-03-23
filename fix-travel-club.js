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
    
    // Replace the Travel Club link
    // It might look like href="https://customers.siempre-wifi.com/loyalty-program?language=es" or holafly.com
    html = html.replace(/href="[^"]*loyalty-program[^"]*"/g, 'href="#" onclick="alert(\'Travel Club de Siempre-Wifi: Próximamente.\'); return false;"');

    // Also just in case check "Iniciar sesión" which goes to login?language=es
    // If the user wants NO connection, let's make sure "For Business" and "Iniciar sesión" are also disconnected if they point to holafly.
    // The prompt only explicitly mentioned "travel club", so we strictly do Travel Club, but keeping it robust.
    
    fs.writeFileSync(f, html);
    console.log('Fixed Travel Club link in', f);
  }
});
