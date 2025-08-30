---
title: "Insta"
date: "2025-08-29"
slug: "insta"
---

```javascript
(() => {
  const urls = [];

  // 1. Collect from <img> tags
  document.querySelectorAll("img").forEach(img => {
    if (img.src && img.src.toLowerCase().includes(".jpg")) {
      urls.push(img.src);
    }
    if (img.srcset) {
      img.srcset.split(",").forEach(src => {
        const clean = src.trim().split(" ")[0];
        if (clean.toLowerCase().includes(".jpg")) {
          urls.push(clean);
        }
      });
    }
  });

  // 2. Collect from ALL elements' attributes
  document.querySelectorAll("*").forEach(el => {
    for (const attr of el.getAttributeNames?.() || []) {
      const val = el.getAttribute(attr);
      if (val && val.toLowerCase().includes(".jpg")) {
        urls.push(val);
      }
    }
  });

  // Deduplicate + filter out "150x150"
  const unique = [...new Set(urls)].filter(u => !u.includes("150x150"));

  console.log("Found JPG URLs (filtered):", unique);

  if (unique.length) {
    navigator.clipboard.writeText(unique.join("\n"))
      .then(() => console.log("✅ Copied JPG URLs to clipboard"))
      .catch(err => console.error("Clipboard error:", err));
  }
})();
