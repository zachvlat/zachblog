---
title: "Transfermarkt"
date: "2025-06-19"
slug: "transfermarkt"
---

```javascript
function countryCodeToFlag(code) {
    return [...code.toUpperCase()]
        .map(c => String.fromCodePoint(127397 + c.charCodeAt()))
        .join('');
}

const rows = document.querySelectorAll('.items > tbody:nth-child(2) > tr');

const players = [];

rows.forEach(row => {
    const number =
        row.querySelector('td.zentriert.rueckennummer.bg_Torwart > div')?.textContent.trim() ||
        row.querySelector('td.zentriert.rueckennummer')?.textContent.trim() ||
        null;

    const name =
        row.querySelector('td.posrela .hauptlink a')?.textContent.trim() ||
        null;

    const position =
        row.querySelector('td.posrela table tbody tr:nth-child(2) td')?.textContent.trim() ||
        null;

    let country = null;

    const countryImg = row.querySelector('td:nth-child(4) img');

    if (countryImg) {
        const countryName = countryImg.title?.trim();

        const imageUrl =
            countryImg.getAttribute('data-src') ||
            countryImg.getAttribute('src') ||
            '';

        // Extract country code from URL like ".../pl.png"
        const match = imageUrl.match(/\/([a-z]{2})\.png(?:\?|$)/i);

        if (match) {
            const code = match[1].toUpperCase();
            const flag = countryCodeToFlag(code);
            country = `${flag} ${countryName}`;
        } else {
            country = countryName;
        }
    }

    const height =
        row.querySelector('td:nth-child(5)')?.textContent.trim() ||
        null;

    const foot =
        row.querySelector('td:nth-child(6)')?.textContent.trim() ||
        null;

    const contractStarted =
        row.querySelector('td:nth-child(7)')?.textContent.trim() ||
        null;

    const contractEnds =
        row.querySelector('td:nth-child(9)')?.textContent.trim() ||
        null;

    const ageText =
        row.querySelector('td:nth-child(3)')?.textContent || '';

    const ageMatch = ageText.match(/\((\d+)\)/);
    const age = ageMatch ? parseInt(ageMatch[1], 10) : null;

    const value =
        row.querySelector('td.rechts.hauptlink a')?.textContent.trim() ||
        null;

    const imgElement = row.querySelector(
        'td.posrela > table > tbody > tr:nth-child(1) > td:nth-child(1) > img'
    );

    let imageUrl = null;

    if (imgElement) {
        imageUrl =
            imgElement.getAttribute('data-src') ||
            imgElement.getAttribute('src');

        if (imageUrl?.startsWith('data:image/gif')) {
            imageUrl = null;
        }
    }

    players.push({
        number,
        name,
        position,
        country,
        height,
        foot,
        contractStarted,
        contractEnds,
        age,
        value,
        imageUrl
    });
});

const jsonResult = JSON.stringify(players, null, 2);

console.log(jsonResult);

const blob = new Blob([jsonResult], {
    type: 'application/json'
});

const url = URL.createObjectURL(blob);

const a = document.createElement('a');
a.href = url;
a.download = 'players.json';

document.body.appendChild(a);
a.click();

document.body.removeChild(a);
URL.revokeObjectURL(url);
```
