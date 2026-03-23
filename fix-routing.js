const fs = require('fs');
const files = ['holafly-clone/index.html', 'holafly-clone/que-es-esim.html', 'holafly-clone/faq.html'];
const scriptToInject = `<script>
document.addEventListener("click", function(e) {
  var a = e.target.closest("a");
  if (a && a.getAttribute("href") && a.getAttribute("href").endsWith(".html")) {
    e.preventDefault();
    e.stopImmediatePropagation();
    window.location.href = a.getAttribute("href");
  }
}, true);
</script>`;

files.forEach(f => {
  if (fs.existsSync(f)) {
    let html = fs.readFileSync(f, 'utf8');
    if (!html.includes('e.target.closest("a")')) {
      // Just append it to the very end of the file!
      html = html + '\\n' + scriptToInject;
      fs.writeFileSync(f, html);
      console.log('Fixed and appended script to', f);
    } else {
      console.log('Already fixed', f);
    }
  }
});
