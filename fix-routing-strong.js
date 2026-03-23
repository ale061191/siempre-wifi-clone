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

const scriptReplacement = `
<script id="custom-routing-script">
document.addEventListener("click", function(e) {
  var a = e.target.closest("a");
  var btn = e.target.closest("button");
  var li = e.target.closest("li");
  
  var isDestinosClick = false;
  var textStr = (e.target.textContent || "").toUpperCase();
  if (textStr.includes("DESTINOS") && !textStr.includes("TODOS")) isDestinosClick = true; 
  if (a && (a.textContent || "").toUpperCase().includes("DESTINOS") && !(a.textContent || "").toUpperCase().includes("TODOS")) isDestinosClick = true;
  if (btn && (btn.textContent || "").toUpperCase().includes("DESTINOS") && !(btn.textContent || "").toUpperCase().includes("TODOS")) isDestinosClick = true;
  if (li && (li.textContent || "").toUpperCase().includes("DESTINOS") && !(li.textContent || "").toUpperCase().includes("TODOS")) isDestinosClick = true;

  if (isDestinosClick && !e.target.closest(".megamenu-destinations")) {
      var menu = document.getElementById("megaMenuContainer");
      var overlay = document.getElementById("megaMenuDarkOverlay");
      if (menu) {
          var isHidden = (menu.style.display === "none" || menu.style.display === "");
          menu.style.display = isHidden ? "block" : "none";
          if (overlay) overlay.style.display = isHidden ? "block" : "none";
          
          if (isHidden && overlay && !overlay.hasOverlayEvent) {
              overlay.addEventListener("click", function() {
                  menu.style.display = "none";
                  overlay.style.display = "none";
              });
              overlay.hasOverlayEvent = true;
          }
          e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
      }
      return;
  }

  if (e.target.closest("#close_megamenu") || e.target.closest("#close_megamenu_mobile") || e.target.closest(".volare-icon-interface-close")) {
      var m = document.getElementById("megaMenuContainer");
      var o = document.getElementById("megaMenuDarkOverlay");
      if (m) m.style.display = "none";
      if (o) o.style.display = "none";
  }

  if (btn && btn.closest(".megamenu-destinations__tabs")) {
      var tabId = btn.getAttribute("data-tab");
      var allTabs = btn.closest(".megamenu-destinations__tabs").querySelectorAll("button");
      allTabs.forEach(t => { 
        t.classList.remove("active-tab", "volare-icon-interface-check"); 
        t.setAttribute("aria-selected", "false"); 
      });
      btn.classList.add("active-tab", "volare-icon-interface-check");
      btn.setAttribute("aria-selected", "true");

      ["popular", "regional", "all"].forEach(tid => {
          var p = document.getElementById("tab-" + tid);
          if (p) { p.classList.add("hidden"); p.style.display = "none"; }
      });
      var target = document.getElementById("tab-" + tabId.toLowerCase());
      if (target) { target.classList.remove("hidden"); target.style.display = "block"; }
      return;
  }

  // Routing intercepts
  if (!a && !btn) return;
  var text = (textStr || (a ? a.textContent : "") || "").toUpperCase();
  var href = (a ? a.getAttribute("href") : "") || "";
  var h = href.toLowerCase();

  function goTo(url, evt) {
      evt.preventDefault();
      evt.stopPropagation();
      evt.stopImmediatePropagation();
      window.location.href = url;
  }

  if (h.includes("customers.holafly.com") || h.includes("partners.holafly.com")) {
      e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
      alert('Esta es una vista clonada localmente. Los enlaces externos de login/partners han sido deshabilitados para no redirigir a Holafly.');
      return;
  }

  // EXACT MATCHES FOR TABS (prevents Astro intercepting)
  if (h.includes("shop/planes-regionales") || (text.includes("PLANES REGIONALES") && (h.includes("shop") || h === ""))) { return goTo("shop-planes-regionales.html", e); }
  else if (h.includes("shop/paises") || (text.includes("PAÍSES") && (h.includes("shop") || h === ""))) { return goTo("shop-paises.html", e); }
  else if (h.includes("shop/ciudades") || (text.includes("CIUDADES") && (h.includes("shop") || h === ""))) { return goTo("shop-ciudades.html", e); }
  else if (h.includes("shop/destinos") || (text.includes("TODOS LOS DESTINOS") && (h.includes("shop") || h === ""))) { return goTo("shop-destinos.html", e); }
  
  else if (h.includes("es/shop") && h.endsWith("shop/")) { return goTo("shop.html", e); }
  else if ((text === "EXPLORAR" || text === "POPULAR") && (h.includes("shop") || h === "")) { return goTo("shop.html", e); }
  
  // NAV MENU LINKS - Now intercepting based on our new local hrefs and original paths just in case
  else if (text.includes("FAQ") || h.includes("faq.html") || h.includes("/es/faq/")) { return goTo("faq.html", e); }
  else if (text.includes("ESIM Y CÓMO FUNCIONA") || h.includes("que-es-esim.html") || h.includes("que-es-esim")) { return goTo("que-es-esim.html", e); }
  else if (text.includes("CONTACT") || h.includes("contacto.html") || h.includes("contacto")) { return goTo("contacto.html", e); }
  else if (text.includes("AFILIADO") || h.includes("afiliados.html") || h.includes("programa-afiliados")) { return goTo("afiliados.html", e); }
  else if (text.includes("PARTNERS") || h.includes("partners.html") || h.includes("partners")) { return goTo("partners.html", e); }
  
  else if (text === "PLANS" || text === "PLANES" || text === "NUEVO" || h.includes("planes.html") || h.includes("planes-esim")) { return goTo("planes.html", e); }
  
  // Logo home click
  else if (h === "index.html" || h === "/es/") { return goTo("index.html", e); }
  
  else if (h.includes("esim-") && !h.includes("localhost")) {
      e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
      alert('Vista de la eSIM: ' + text + '. ¡En el sitio original esto llevaría a la página del producto!');
      return;
  }
}, true);
</script>
`;

files.forEach(f => {
  if (fs.existsSync(f)) {
    let html = fs.readFileSync(f, 'utf8');
    
    // Remove ALL instances of `<script id="custom-routing-script">...</script>` safely
    while (html.includes('<script id="custom-routing-script">')) {
        let start = html.indexOf('<script id="custom-routing-script">');
        let end = html.indexOf('</script>', start) + 9;
        if (start !== -1 && end !== -1 && end > start) {
            html = html.substring(0, start) + html.substring(end);
        } else break;
    }

    if (html.includes('</body>')) {
        html = html.replace('</body>', '\n' + scriptReplacement + '\n</body>');
    } else if (html.includes('</html>')) {
        html = html.replace('</html>', '\n' + scriptReplacement + '\n</html>');
    } else {
        html = html + '\n' + scriptReplacement;
    }

    fs.writeFileSync(f, html);
    console.log('Robustly updated routing for nav menu in', f);
  }
});
