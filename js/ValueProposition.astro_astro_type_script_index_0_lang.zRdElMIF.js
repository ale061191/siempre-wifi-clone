import{r as i}from"./swiper-element-bundle.VWWp-r-A.js";import{B as t}from"./consts.BBeVVN35.js";i();const r=document.querySelector("swiper-container.value-proposition__cards");if(r){const e={loop:!1,pagination:{clickable:!0},navigation:!0,injectStyles:[`
        .swiper {
          overflow: visible;
        }
        .swiper-pagination-bullet {
          width: 24px;
          height: 4px;
          border-radius: 32px;
        }
        .swiper-pagination-bullet-active {
          background: var(--text-primary);
          width: 24px;
          height: 4px;
          border-radius: 32px;
        }
        .swiper-pagination {
          position: unset;
          margin-top: 12px;
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: var(--text-primary);
          border-radius: 50%;
          width: 32px;
          height: 32px;
          background: var(--background-primary);
          border: 1px solid var(--border-primary);
          box-shadow: 0 4px 8px 0 rgba(41, 43, 46, 0.12);
        }
        .swiper-button-next {
          right: -16px;
        }
        .swiper-button-next svg,
        .swiper-button-prev svg {
          width: 8px;
          height: 8px;
          fill: var(--text-primary);
          stroke: var(--text-primary);
        }
      `],slidesPerView:1.15,centeredSlides:!0,spaceBetween:20,grid:{rows:1,fill:"row"},breakpoints:{[t.md]:{slidesPerView:3,centeredSlides:!1,spaceBetween:20,grid:{rows:3}}}};Object.assign(r,e),r.initialize()}
