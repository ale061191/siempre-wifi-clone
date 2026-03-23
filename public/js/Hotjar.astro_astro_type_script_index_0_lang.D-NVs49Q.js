import{H as r}from"./consts.BBeVVN35.js";import{g as c}from"./geolocation.DcqzTHnl.js";import{a,c as s}from"./settingsStore.BmsiWLAp.js";import{g as h}from"./userAgent.B102jL28.js";import{s as m,I as p}from"./integrationControls.C7y5Qvit.js";import"./i18n.Cms4_8pR.js";import"./logger.Dp7A2KxE.js";import"./_commonjsHelpers.Cpj98o6Y.js";import"./buildPath.Dm-cTGCe.js";import"./index.C7BV1ZGy.js";if(m(p.HOTJAR)){const t=document.createElement("script");t.text=`(function(h,o,t,j,a,r){
      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
      h._hjSettings={hjid:${r},hjsv:6};
      a=o.getElementsByTagName('head')[0];
      r=o.createElement('script');r.async=1;
      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
      a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,document.head.appendChild(t),d()}async function d(){const e=(await c())?.countryIsoAlpha2Code,o=a.get(),n=s.get(),i=h();typeof window.hj=="function"&&window.hj("identify",null,{country:e||"unknown",language:n,currency:o,device_type:i})}
