const fs = require('fs');
const files = ['shop.html', 'shop-planes-regionales.html'];
files.forEach(f => {
  const html = fs.readFileSync('holafly-clone/' + f, 'utf8');
  console.log('--- ' + f + ' ---');
  if (html.includes('Europa')) console.log('Contains Europa');
  if (html.includes('Japón')) console.log('Contains Japón');
});
