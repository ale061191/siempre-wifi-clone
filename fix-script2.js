const fs = require('fs');

let html = fs.readFileSync('megamenu.html', 'utf8');

// I will just replace the entire script block with a fresh one to avoid mistakes.
const newScript = `
<script>
(function() {
    var menu = document.getElementById('megaMenuContainer');
    var overlay = document.getElementById('megaMenuDarkOverlay');
    var closeBtn = document.getElementById('close_megamenu');
    
    function openMenu(e) {
        if(e) e.preventDefault();
        if(menu) menu.style.display = 'block';
        if(overlay) overlay.style.display = 'block';
    }
    
    function closeMenu() {
        if(menu) menu.style.display = 'none';
        if(overlay) overlay.style.display = 'none';
    }
    
    // Attach to ALL possible "Destinos" links
    var destinosLinks = document.querySelectorAll('li[data-attribute="megamenu"] a, a[title="¿A dónde viajas después?"], .header__navbar-menu-item-link.has-chevron');
    
    // Also try to find the specific one if the selector missed it
    document.querySelectorAll('.header__navbar-menu-item-link').forEach(function(el) {
        if (el.textContent.includes('Destinos')) {
            el.addEventListener('click', openMenu);
        }
    });

    destinosLinks.forEach(function(link) {
        link.addEventListener('click', openMenu);
    });
    
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);

    // Tabs logic
    var btns = {
        'Popular': { btn: document.getElementById('btn-popular'), panel: document.getElementById('tab-popular') },
        'Regional': { btn: document.getElementById('btn-regional'), panel: document.getElementById('tab-regional') },
        'All': { btn: document.getElementById('btn-all'), panel: document.getElementById('tab-all') }
    };

    function setActiveTab(tabName) {
        Object.keys(btns).forEach(function(key) {
            var item = btns[key];
            if (!item.btn || !item.panel) return;
            
            var checkmark = item.btn.querySelector('.checkmark');
            
            if (key === tabName) {
                item.btn.style.background = '#111';
                item.btn.style.color = 'white';
                item.btn.style.border = 'none';
                if(checkmark) checkmark.style.display = 'inline';
                item.panel.style.display = 'block';
            } else {
                item.btn.style.background = 'white';
                item.btn.style.color = '#555';
                item.btn.style.border = '1px solid #e5e7eb';
                if(checkmark) checkmark.style.display = 'none';
                item.panel.style.display = 'none';
            }
        });
    }

    if (btns['Popular'].btn) btns['Popular'].btn.addEventListener('click', function(e) { e.preventDefault(); setActiveTab('Popular'); });
    if (btns['Regional'].btn) btns['Regional'].btn.addEventListener('click', function(e) { e.preventDefault(); setActiveTab('Regional'); });
    if (btns['All'].btn) btns['All'].btn.addEventListener('click', function(e) { e.preventDefault(); setActiveTab('All'); });

    // Search logic
    var searchInput = document.getElementById('searchInput-ylueg34');
    var clearSearchBtn = document.getElementById('clearSearchBtn');
    var searchMinChars = document.getElementById('search-min-chars');
    var searchResultsContainer = document.getElementById('search-results-container');
    var megamenuContent = document.getElementById('megamenu-destinations__content');

    function handleSearch() {
        if (!searchInput) return;
        var val = searchInput.value.trim();
        
        if (val.length > 0) {
            if(clearSearchBtn) clearSearchBtn.style.display = 'inline';
        } else {
            if(clearSearchBtn) clearSearchBtn.style.display = 'none';
        }

        if (val.length === 0) {
            // Empty state -> show tabs
            if(searchMinChars) searchMinChars.style.display = 'none';
            if(searchResultsContainer) searchResultsContainer.style.display = 'none';
            if(megamenuContent) megamenuContent.style.display = 'block';
        } else if (val.length > 0 && val.length < 3) {
            // Typing state (<3)
            if(searchMinChars) searchMinChars.style.display = 'block';
            if(searchResultsContainer) searchResultsContainer.style.display = 'none';
            if(megamenuContent) megamenuContent.style.display = 'none';
        } else if (val.length >= 3) {
            // Results state
            if(searchMinChars) searchMinChars.style.display = 'none';
            if(searchResultsContainer) searchResultsContainer.style.display = 'block';
            if(megamenuContent) megamenuContent.style.display = 'none';
        }
    }

    if(searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    if(clearSearchBtn) {
        clearSearchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if(searchInput) {
                searchInput.value = '';
                handleSearch();
            }
        });
    }
    
    // Fallback: If there is an inline onclick="toggleMegaMenu()", define it globally
    window.toggleMegaMenu = function(e) {
        if(e) e.preventDefault();
        openMenu(e);
    };

})();
</script>`;

html = html.replace(/<script>[\s\S]*<\/script>/, newScript);
fs.writeFileSync('megamenu.html', html);
console.log('Fixed script in megamenu.html');
