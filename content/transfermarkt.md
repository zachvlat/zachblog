---
title: "Transfermarkt"
date: "2025-06-19"
slug: "transfermarkt"
---

```javascript
function getCountryFlag(countryName) {
    const countryCodes = {
        "Poland": "PL",
        "Russia": "RU",
        "Albania": "AL",
        "Greece": "GR",
        "Iceland": "IS",
        "Croatia": "HR",
        "Netherlands": "NL",
        "United States": "US",
        "Germany": "DE",
        "Serbia": "RS",
        "Brazil": "BR",
        "Spain": "ES",
        "France": "FR",
        "Morocco": "MA",
        "Slovenia": "SI",
        "Uruguay": "UY",
        "Argentina": "AR",
        "Nigeria": "NG",
        "Algeria": "DZ",
        "Sweden": "SE",
        "Portugal": "PT",
        "Italy": "IT"
    };

    const code = countryCodes[countryName];
    const flag = code ? [...code].map(c => String.fromCodePoint(0x1F1E6 + c.charCodeAt(0) - 65)).join('') : "";
    return flag ? `${flag} ${countryName}` : countryName;
}

// Select all the table rows within the specified tbody
const rows = document.querySelectorAll('.items > tbody:nth-child(2) > tr');

// Array to store the formatted data
const players = [];

rows.forEach(row => {
    const number = row.querySelector('td.zentriert.rueckennummer.bg_Torwart > div')?.textContent.trim() ||
                   row.querySelector('td.zentriert.rueckennummer')?.textContent.trim() || 
                   null;

    const name = row.querySelector('td.posrela .hauptlink a')?.textContent.trim() || null;
    const position = row.querySelector('td.posrela table tbody tr:nth-child(2) td')?.textContent.trim() || null;
    const countryName = row.querySelector('td:nth-child(4) img')?.title || null;
    const country = countryName ? getCountryFlag(countryName) : null;
    const height = row.querySelector('td:nth-child(5)')?.textContent.trim() || null;
    const foot = row.querySelector('td:nth-child(6)')?.textContent.trim() || null;
    const contractStarted = row.querySelector('td:nth-child(7)')?.textContent.trim() || null;
    const contractEnds = row.querySelector('td:nth-child(9)')?.textContent.trim() || null;

    // Extract age from parentheses
    const ageText = row.querySelector('td:nth-child(3)')?.textContent || '';
    const ageMatch = ageText.match(/\((\d+)\)/);
    const age = ageMatch ? ageMatch[1] : null;

    const value = row.querySelector('td.rechts.hauptlink a')?.textContent.trim() || null;

    // Get image URL with lazy-load support
    const imgElement = row.querySelector('td.posrela > table > tbody > tr:nth-child(1) > td:nth-child(1) > img');
    let imageUrl = null;
    if (imgElement) {
        imageUrl = imgElement.getAttribute('data-src') || imgElement.getAttribute('src');
        if (imageUrl && imageUrl.startsWith('data:image/gif')) {
            imageUrl = null; // Ignore placeholders
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

// Convert the array to JSON
const jsonResult = JSON.stringify(players, null, 2);
console.log(jsonResult);
