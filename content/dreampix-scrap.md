---
title: "Dreampix Scrap"
date: "2025-06-19"
slug: "dreampix-scrap"
---

```javascript
const urls = [];

for (let i = 1; i <= 28; i++) {
    const imgElement = document.querySelector(`article.w-full:nth-child(${i}) > div:nth-child(1) > a:nth-child(1) > img:nth-child(1)`);
    if (imgElement) {
        const originalUrl = imgElement.src;
        const previewUrl = originalUrl.replace('/thumbnails/', '/previews/');
        urls.push(previewUrl);
    }
}

// Convert the array to a JSON string if needed
const jsonArray = JSON.stringify(urls);

console.log(jsonArray);
