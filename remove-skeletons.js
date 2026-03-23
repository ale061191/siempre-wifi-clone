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
    // Replace <li class="skeleton"> with <li>
    html = html.replace(/<li class="skeleton">/g, '<li>');
    // Also try to replace anywhere the skeleton class is used on li
    html = html.replace(/class="([^"]*)skeleton([^"]*)"/g, function(match, p1, p2) {
       let newClass = (p1 + p2).trim();
       if (newClass) {
          return `class="${newClass}"`;
       } else {
          return '';
       }
    });
    fs.writeFileSync(f, html);
    console.log('Removed skeletons from', f);
  }
});
