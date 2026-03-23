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
    
    const cssInjection = `
<style>
  /* FORCING CARDS TO BE VISIBLE */
  .skeleton {
     background-color: transparent !important;
     animation: none !important;
  }
  .card-flag, .card-flag__link {
     opacity: 1 !important;
     visibility: visible !important;
     background: white !important;
     border: 1px solid #e5e7eb !important;
     display: flex !important;
  }
  .card-flag * {
     opacity: 1 !important;
     visibility: visible !important;
  }
  .card-flag__info-content { display: block !important; }
  .card-flag__flag-content { display: block !important; }
  
  ul.grid > li {
     background-color: transparent !important;
     animation: none !important;
  }
</style>
`;
    if (!html.includes('/* FORCING CARDS TO BE VISIBLE */')) {
        html = html.replace('</head>', cssInjection + '</head>');
    }
    
    // also rename ID to prevent JS from wiping it out
    html = html.replace(/id="popular-destinations-list"/g, 'id="cloned-popular-destinations-list"');
    html = html.replace(/id="regions-destinations-list"/g, 'id="cloned-regions-destinations-list"');
    html = html.replace(/id="countries-destinations-list"/g, 'id="cloned-countries-destinations-list"');
    html = html.replace(/id="cities-destinations-list"/g, 'id="cloned-cities-destinations-list"');
    html = html.replace(/id="all-destinations-list"/g, 'id="cloned-all-destinations-list"');

    fs.writeFileSync(f, html);
    console.log('Injected force CSS and renamed IDs in', f);
  }
});
