const fs = require('fs');

// We also need to fix the megamenu.html file so if it gets injected again or if we already injected it, it has the new logo.
// But the megamenu is already injected in the files. Let's just fix it in megamenu.html too for consistency.
let megaHtml = '';
if (fs.existsSync('megamenu.html')) {
  megaHtml = fs.readFileSync('megamenu.html', 'utf8');
  megaHtml = megaHtml.replace(/<img src="fonts\/holafly\.svg"[^>]*>/g, '<span style="font-size: 24px; font-weight: 900; color: #ff0055; font-family: sans-serif; letter-spacing: -0.5px;">Siempre<span style="color: #111;">Wifi</span></span>');
  fs.writeFileSync('megamenu.html', megaHtml);
}
