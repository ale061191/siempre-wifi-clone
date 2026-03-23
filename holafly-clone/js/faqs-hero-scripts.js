const { autocomplete } = window["@algolia/autocomplete-js"];
const { getAlgoliaResults } = window["@algolia/autocomplete-preset-algolia"];

const searchClient = algoliasearch(
    "5HR806GLU5",
    "c044fab728a1c11671b2a8a62fa1fc68"
);

let lang = document.querySelector('.lang.selector-item-modal.active')?.getAttribute("data-language");

let EsimLang = lang.toUpperCase();

//***************** verifica si el prefijo del idioma existe en el objeto
mapper = {
    zh_tw: "zh",
    zh_cn: "cn",
    nb: "no",
};

let variable1 = lang.toLowerCase();
let result = mapper[variable1] || variable1;

let resultUpper = result.toUpperCase();

// *******************

let $wrapper = document.getElementsByClassName("global-search__wrapper");

if ($wrapper.length > 0) {
    autocomplete({
        container: ".global-search__wrapper.autocomplete",
        placeholder: algolia_search.search_algolia_text,
        detachedMediaQuery: "none",
        getSources({ query }) {
            return [
                {
                    sourceId: "products",
                    getItems() {
                        return getAlgoliaResults({
                            searchClient,
                            queries: [
                                {
                                    indexName:
                                        "WP_ECOMMERCE_FAQ_" +
                                        resultUpper,
                                    query,
                                    params: {
                                        hitsPerPage: 5,
                                    },
                                },
                            ],
                        });
                    },
                    templates: {
                        item({ item, html }) {
                            return html`<a
                                href="${item.permalink}"
                                class="aa-ItemLink"
                            >
                                <div class="aa-ItemLink__title">
                                    ${item.post_title}
                                </div>
                            </a> `;
                        },
                    },
                },
            ];
        },
    });
}

//ejecutar con enter
var input = document.querySelector(".aa-InputWrapper #autocomplete-0-input");
if (input !== null) {
    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            let inputValue = document.querySelector(
                ".aa-InputWrapper #autocomplete-0-input"
            ).value;
            let cleanedValue = inputValue.replace(/\s/g, "+");
            let encodedSearchTerm = encodeURIComponent(cleanedValue);

            let enLang = "/search-faqs/?s=" + encodedSearchTerm + "&search_type=faqs";
            let otherLang =
                "/" +
                lang +
                "/search-faqs/" +
                "?s=" +
                encodedSearchTerm +
                "&search_type=faqs";

            let urlValue = lang === "en" ? enLang : otherLang;
            window.location.href = urlValue;
        }
    });
}

//ejecutar al ahcer click en el icono de buscar
let icon = document.querySelector(".aa-SubmitButton");
if (icon !== null) {
    icon.addEventListener("click", function (event) {
        let inputValue = document.querySelector(
            ".aa-InputWrapper #autocomplete-0-input"
        ).value;
        let cleanedValue = inputValue.replace(/\s/g, "+");

        let enLang = "/search-faqs/?s=" + cleanedValue + "&search_type=faqs";
        let otherLang =
            "/" + lang + "/search-faqs/" + "?s=" + cleanedValue + "&search_type=faqs";

        let urlValue = lang === "en" ? enLang : otherLang;

        window.location.href = urlValue;
    });
}

//valida cuando se usa # en la busqueda
let inputValueAlgolia = document.querySelector(".faqs-hero .aa-Form");
if (inputValueAlgolia !== null) {
    inputValueAlgolia.addEventListener("submit", function (event) {
        event.preventDefault();
        $site = document.location.origin;
        searchTerm = document.querySelector(".faqs-hero .aa-Input").value;
        var encodedSearchTerm = encodeURIComponent(searchTerm);

        var enConstructedURL =
            $site + "/?s=" + encodedSearchTerm + "&search_type=faqs";
        var otherConstructedURL =
            $site +
            "/" +
            lang +
            "/search-faqs/?s=" +
            encodedSearchTerm +
            "&search_type=faqs";

        let constructedURL =
            lang === "en" ? enConstructedURL : otherConstructedURL;

        window.location.href = constructedURL;
    });
}
