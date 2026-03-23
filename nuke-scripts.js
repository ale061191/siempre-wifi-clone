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
    
    // 1. Revert the ID back so styles match perfectly if they depended on it
    html = html.replace(/id="cloned-popular-destinations-list"/g, 'id="popular-destinations-list"');
    html = html.replace(/id="cloned-regions-destinations-list"/g, 'id="regions-destinations-list"');
    html = html.replace(/id="cloned-countries-destinations-list"/g, 'id="countries-destinations-list"');
    html = html.replace(/id="cloned-cities-destinations-list"/g, 'id="cities-destinations-list"');
    html = html.replace(/id="cloned-all-destinations-list"/g, 'id="all-destinations-list"');

    // 2. Remove the skeleton classes that might be hardcoded
    html = html.replace(/<li class="skeleton">/g, '<li>');
    html = html.replace(/class="([^"]*)skeleton([^"]*)"/g, function(match, p1, p2) {
       let newClass = (p1 + p2).trim();
       if (newClass) {
          return `class="${newClass}"`;
       } else {
          return '';
       }
    });

    // 3. NUKE the JS modules that are overwriting the DOM!
    // The issue is that the JS checks for data, fails (because it's local), and then replaces our beautiful HTML with empty skeleton <li> tags.
    // We will remove all script tags that load local JS files matching Shop* or destinationsStore, etc.
    html = html.replace(/<script[^>]*src="[^"]*Shop[^"]*"[^>]*><\/script>/gi, '');
    html = html.replace(/<script[^>]*src="[^"]*destinationsStore[^"]*"[^>]*><\/script>/gi, '');
    html = html.replace(/<script[^>]*src="[^"]*updateDestinationCards[^"]*"[^>]*><\/script>/gi, '');
    
    // Actually, to be safe, let's remove ALL type="module" scripts from the body that might be doing API calls.
    // Wait, some might be for the search Algolia. Let's just target the ones in the page end.
    
    // We will find the specific scripts.
    html = html.replace(/<script type="module" src="js\/Shop.*?<\/script>/g, '');
    html = html.replace(/<script type="module" src="js\/destinations.*?<\/script>/g, '');

    // Let's just aggressively remove any script that mentions "Shop" or "destination"
    html = html.replace(/<script type="module" src="js\/[^"]*(Shop|destination)[^"]*"><\/script>/gi, '');

    // 4. In case the JS is inline:
    html = html.replace(/<script type="module" data-sveltekit-fetched.*?<\/script>/gi, '');

    fs.writeFileSync(f, html);
    console.log('Nuked malicious scripts from', f);
  }
});
