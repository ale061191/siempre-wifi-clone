import{b as m}from"./consts.BBeVVN35.js";import{g as p}from"./tolgee.CHalhcTU.js";import{g as h,d as y,b as v}from"./cdn.DiMJwHep.js";import{b as _}from"./locales.C_M5sTiJ.js";import{_ as C}from"./debounce.DSsuHmJs.js";import"./i18n.Cms4_8pR.js";import"./logger.Dp7A2KxE.js";import"./_commonjsHelpers.Cpj98o6Y.js";import"./toNumber.Cgy_pbJh.js";import"./isSymbol.lOulipCc.js";function w(t){const{flag:e,title:s,permalink:a,subtitle:n="eSIM",seoTitle:c=s,isCity:o=!1,cardSize:r="xl"}=t,d=`card-flag card-flag--${r} ${o?"card-flag--city":""}`,u=`card-flag__flag ${o?"card-flag__flag--city":""}`,g=!["sm","s","selector-currency"].includes(r),f=h("destination/wave_button.svg");return`
    <a href="${a}" class="card-flag__link" title="${c}">
      <div class="${d}">
        <div class="card-flag__flag-content">
          <img
            class="${u}"
            width="129"
            height="129"
            src="${e}"
            alt="esim ${s}"
            loading="lazy"
          />
        </div>
        <div class="card-flag__info-content">
          <h3>
            ${n?`<span class="card-flag__subtitle">${n}</span>`:""}
            <span class="card-flag__title">${s}</span>
          </h3>
        </div>
        ${g?`<div class="card-flag__wave-button">
                <img width="180" height="40" src="${f}" alt="Wave button" loading="lazy" fetchpriority="low" />
              </div>`:""}
      </div>
    </a>
  `}function L(){return new URLSearchParams(globalThis.location.search).get("s")}function $(){const t=sessionStorage.getItem("searchQueryPage");if(!t||t==="[]")return null;try{const e=JSON.parse(t);return Array.isArray(e)&&e.length>0?e:null}catch{return null}}function i(t){const{slotContent:e,noResultsDiv:s,searchResultsContainer:a}=t;e&&(e.style.display=""),s&&(s.style.display="none"),a&&(a.innerHTML="")}function b(){return _(document.documentElement.lang)?.urlCode??m}function T(t){const e=t.isCity?y("public/icons/destination/city-icon.svg"):v(t.isocode);return`<li class="h-full xl:min-h-0 lg:min-h-[135px]">${w({flag:e,title:t.title,permalink:t.permalink,subtitle:"eSIM",seoTitle:t.title,isCity:t.isCity,cardSize:"xl"})}</li>`}async function S(t,e){const s=b(),a=await p();await a.changeLanguage(s);const n=t.map(T).join("");e.innerHTML=`
    <div class="mb-4">
      <p class="text-(--text-secondary) text-sm font-bold uppercase">
        ${a.t("search.search_result_placeholder",{ns:"ui_component",noWrap:!0,value:t.length})}
      </p>
    </div>
    <ul class="grid items-stretch md:gap-6 sm:gap-4 gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      ${n}
    </ul>
  `}async function l(){const t=L(),e={searchResultsContainer:document.getElementById("search-results-container"),noResultsDiv:document.getElementById("search-query-no-results"),slotContent:document.getElementById("slot-content")};if(!t){i(e);return}if(!e.searchResultsContainer)return;const s=$();if(!s){i(e);return}e.slotContent&&(e.slotContent.style.display="none"),e.noResultsDiv&&(e.noResultsDiv.style.display="none"),await S(s,e.searchResultsContainer)}(()=>{const t=document.getElementById("shop-nav-buttons");if(!t)return;const s=t.offsetTop-88;function a(){window.scrollY>=s?t.classList.add("p-5"):t.classList.remove("p-5")}window.addEventListener("scroll",a,{passive:!0}),a()})();const I=C(l,150);l();window.addEventListener("searchCleared",l);window.addEventListener("popstate",I);
