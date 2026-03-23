jQuery(function () {

    // Selección de elementos
    const $menuDestinos = $("#li-menu-destinos"),
        $destinosContainer = $(".submenu-destinos"),
        $chevronDestinos = $("#chevron-destinos"),
        $mobileDestinosBack = $(".megamenu-mobile-btn"),
        $blackBackground = $(".megamenu-container"),
        $header = $(".header"),
        $closeMarkMegamenu = $("#close-mark-megamenu"),
        $tabsMobile = $(".destinos-tabs-container"),
        $destinosPopulares = $(".destinos-populares"),
        $destinosRegionales = $(".destinos-regionales"),
        $searchInputDiv = $("#buscador-destinos-megamenu"),
        $innercontainer = $(".inner-container-destinos"),
        $blackBackgroundMegamenu = $("#black-bg-modal-megamenu"),
        $closeMenuIcon = $(".close-menu-icon"),
        $popularTab = $(".popular-tab-destinos"),
        $regionalTab = $(".reginal-tab-destinos"),
        $allTab = $(".all-tab-destinos"),

        $popularDestinos = $(".destinos-populares"),
        $regionalDestinos = $(".destinos-regionales"),
        $allDestinos = $(".destinos-all"),

        $fondonegro = $("#black-bg-modal-megamenu"),
        screenWidth = $(window).width();

    function stickyTabs($scrollElement) {
        if ($scrollElement.scrollTop() >= 30) {
            $tabsMobile.addClass('destinos-tabs-container-mobile-sticky');
            $searchInputDiv.hide();
        } else {
            $tabsMobile.removeClass('destinos-tabs-container-mobile-sticky');
            $searchInputDiv.show();
        }
    }


    function initializeStickyTabs() {
        if ($destinosPopulares.length && $destinosRegionales.length) {
            let screenWidth = $(window).width();     
            // Lógica para ejecutar al redimensionar la ventana
            $(window).on('resize', function () {
                screenWidth = $(window).width();
                // Verificar el tamaño de la pantalla y ajustar la funcionalidad
                handleScreenResize(screenWidth);
            });
    
            // Inicializa las funciones según el tamaño de pantalla inicial
            handleScreenResize(screenWidth);
        }
    }
    
    // Función que maneja la lógica según el tamaño de la pantalla
    function handleScreenResize(screenWidth) {
        if (screenWidth < 768) {
            // Asignar funciones de scroll para mobile
            $destinosPopulares.on('scroll', function () {
                stickyTabs($destinosPopulares);
            });
            $destinosRegionales.on('scroll', function () {
                stickyTabs($destinosRegionales);
            });

            $allDestinos.on('scroll', function () {
                stickyTabs($allDestinos);
            });

            $destinosContainer.on('scroll', function () {
                stickyTabs(  $destinosContainer);
                let currentScrollTop =   $destinosContainer.scrollTop();
                if (currentScrollTop === 0) {
                    $('#busqueda-destinos-container').removeClass('desactivate-search-destinos');
                } else {
                    $('#busqueda-destinos-container').addClass('desactivate-search-destinos');
                }
            });
            stickyTabs($destinosPopulares);
            stickyTabs($destinosRegionales);
            stickyTabs($allDestinos);
    
        } else {
            $destinosPopulares.off('scroll');
            $destinosRegionales.off('scroll');
            $allDestinos.off('scroll');

            $destinosContainer.off('scroll');
            $tabsMobile.removeClass('destinos-tabs-container-mobile-sticky');
            $searchInputDiv.show();
            $('#busqueda-destinos-container').removeClass('desactivate-search-destinos');
        }
    }
    

    function toggleDestinosMenu() {
        $destinosContainer.toggleClass("oculto");
        $blackBackground.toggleClass("open");
        $header.toggleClass("header-megamenu");
        const menuOculto = $destinosContainer.hasClass("oculto");
        $("body").toggleClass("no-scroll", !menuOculto);
        $blackBackgroundMegamenu.toggle(!menuOculto);

        const rotation = menuOculto ? 'rotate(180deg)' : 'rotate(0deg)';
        $chevronDestinos.css('transform', rotation);
    }
    

    function removeMegamenuClases(){
        $destinosContainer.addClass("oculto");
        $blackBackground.removeClass("open");
        $header.removeClass("header-megamenu");
        $('#black-bg-modal-megamenu').css('display', 'none');
        $chevronDestinos.css("transform", "rotate(180deg)");

    }


    $('.lang-currency').on('click', function (){
        removeMegamenuClases();
    }); 

    $('#partnerships_main').on('click', function (){
        removeMegamenuClases();
    });

    $('.buscador-header').on('click', function (){
        removeMegamenuClases();
    });

    function hideDestinosContainer() {
        $destinosContainer.addClass("oculto");
        $blackBackground.removeClass("open");
        $header.removeClass("header-megamenu");
        $chevronDestinos.css("transform", "rotate(180deg)");
        $blackBackgroundMegamenu.hide();
        $("body").removeClass("no-scroll");
        $('.inner-container-destinos').removeClass('no-results-search-bar-active');
    
      
    }

    // Si es Safari, agregamos la clase al elemento
    if (isSafari()) {
        $('.inner-container-destinos').addClass('safari-inner-container-destinos-mobile-height'); // Agrega la clase que desees
    }

    function checkAndAddScrollEvent()
    {
        let $elemento = $(".destinos-all.contenido-activo .destinos-populares-container");

        if ($elemento.length)
        {
            $(".destinos-all.contenido-activo").css("display", "flex");

            $elemento.off("scroll").on("scroll", function ()
            {
                let scrollTop = $(this).scrollTop(); // Posición actual del scroll
                let scrollHeight = $(this)[0].scrollHeight; // Altura total del contenido
                let clientHeight = $(this).innerHeight(); // Altura visible del elemento

                if (scrollTop + clientHeight >= scrollHeight - 10) { 
                    load_more_products_megamenu();
                }
            });
        }
        else
        {
            console.log("No se encontró .contenido-activo aún.");
        }
    }


    function toggleActiveTab($activeTab, $activeContent)
    {
        $(".destinos-all").css('display', 'none');

        $(".megamenu-tabs").removeClass("tab-activa");

        $activeTab.addClass("tab-activa");
        
        $('.inner-container-destinos').removeClass('no-results-search-bar-active');

        $(".megamenu-destinos-container").removeClass("contenido-activo").scrollTop(0);
        
        $activeContent.addClass("contenido-activo");
        
        $searchInputDiv.show(); 
        $tabsMobile.removeClass('destinos-tabs-container-mobile-sticky');
    }
    

    // Inicialización de tabs sticky
    initializeStickyTabs();

    // Actualizar cuando la ventana se redimensiona
    $(window).resize(function () {
        initializeStickyTabs();
    });

    // Manejo de eventos para abrir/cerrar menú
    $menuDestinos.on("click", toggleDestinosMenu);
    $closeMenuIcon.on("click", hideDestinosContainer);
    $closeMarkMegamenu.on("click", hideDestinosContainer);
    $mobileDestinosBack.on("click", hideDestinosContainer);

    // Tabs de megamenu
    $popularDestinos.addClass("contenido-activo"); // Mostrar por defecto

    $popularTab.on("click", function () {
        toggleActiveTab($popularTab, $popularDestinos);
    });

    $regionalTab.on("click", function () {
        toggleActiveTab($regionalTab, $regionalDestinos);
    });

    $allTab.on("click", function () {
        toggleActiveTab($allTab, $allDestinos);

        // Ejecutar la función cuando el documento esté listo
        checkAndAddScrollEvent();
    });


    // Cambio de color al enfocar en el input
    $('#busqueda-destinos-container input').on("focus", function () {
        $('#busqueda-destinos-container').toggleClass('busqueda-destinos-container-focus', true);
    }).on("blur", function () {
        $('#busqueda-destinos-container').toggleClass('busqueda-destinos-container-focus', false);
    });

    // Cerrar megamenu al hacer clic fuera
    $fondonegro.on("click", hideDestinosContainer);

    // Cerrar el megamenu si se abre el carrito flotante
    $(document).on('click', function () {
        const $floatingCartMegamenu = $('.floating-cart-hidden');
        if (!$floatingCartMegamenu.length) {
            hideDestinosContainer();
        }
    });

    let page = 2;
    let loading = false;

    function load_more_products_megamenu()
    {
        if (loading) return;
        loading = true;

        let megaMenuContainer = document.querySelector(".destinos-all.megamenu-destinos-container");
        let $ul = $(".destinos-all.contenido-activo .destinos-populares-container ul");

        let loader = document.getElementById("megamenu-products-loader");

        // Verifica si el contenedor padre tiene la clase "contenido-activo"
        if (!megaMenuContainer || !megaMenuContainer.classList.contains("contenido-activo")) {
            loading = false;
            return;
        }

        megaMenuContainer.style.opacity = "0.5";
        if (loader) loader.style.display = "flex";

        let data = new FormData();
        data.append("action", "get_all_destinos_ajax");
        data.append("filtro_destino", 'All');
        data.append("limite", 20);
        data.append("paged", page);

        fetch(custom_integrations_ajax_object.ajaxurl, {
            method: "POST",
            body: data
        })
        .then(response => response.text())
        .then(html => {
            if (html.trim() !== "no-more-products")
            {
                $ul.append(html);
                page++;
                loading = false;

                megaMenuContainer.style.opacity = "1";
                if (loader)
                    loader.style.display = "none";
            }
            else
            {
                loading = false;

                megaMenuContainer.style.opacity = "1";
                if (loader)
                    loader.style.display = "none";
            }
        })
        .catch(error => {
            console.error("Error al cargar más destinos:", error);
            loading = false;

            megaMenuContainer.style.opacity = "1";
            if (loader)
                loader.style.display = "none";
        });
    }

    const containers = document.querySelectorAll(".destinos-all, .destinos-populares, .destinos-regionales");

    containers.forEach(container => {
        const ul = container.querySelector("ul");

        // IntersectionObserver para manejar la opacidad de los elementos visibles
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.intersectionRatio < 0.8 && entry.boundingClientRect.top < container.getBoundingClientRect().top) {
                    entry.target.classList.add("megamenu-faded");
                } else {
                    entry.target.classList.remove("megamenu-faded");
                }
            });
        }, {
            root: container, // Observa dentro del contenedor con scroll
            threshold: 0.8 // Aplica opacidad cuando un 40% del elemento esté fuera
        });

        // Función para observar elementos nuevos
        function observarElemento(item) {
            observer.observe(item);
        }

        // Observar los elementos iniciales del ul
        ul.querySelectorAll("li").forEach(observarElemento);

        // MutationObserver para detectar elementos nuevos
        const mutationObserver = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeName === "LI") {
                        observarElemento(node);
                    }
                });
            });
        });

        mutationObserver.observe(ul, { childList: true });
    });

});