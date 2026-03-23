const fs = require('fs');

let html = fs.readFileSync('megamenu.html', 'utf8');

html = html.replace("document.addEventListener('DOMContentLoaded', function() {", "(function() {");
// replace the last }); with })();
let lastIndex = html.lastIndexOf('});');
if (lastIndex !== -1) {
  html = html.substring(0, lastIndex) + '})();' + html.substring(lastIndex + 3);
}

fs.writeFileSync('megamenu.html', html);
console.log('Fixed megamenu.html script wrapper');
