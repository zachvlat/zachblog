---
title: "Skroutz No Promo"
date: "2025-06-19"
slug: "skroutz-nopromo"
---

```javascript
function addGlobalStyle(css) {
    var styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerHTML = css;
    document.head.appendChild(styleSheet);
}

var css = `
  .labeled-product { display: none !important; }
  .promo-video-card { display: none !important; }
  .guide-pick-shelf { display: none !important; }
`;

addGlobalStyle(css);