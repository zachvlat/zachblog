---
title: "Eurobasket.com Scrape"
date: "2025-06-19"
slug: "eurobasket"
---

```javascript
// Function to get flag emoji from country code
function getFlagEmoji(countryCode) {
  if (!countryCode) return '';
  
  // Handle special cases (combined flags)
  if (countryCode.includes('-')) {
    const codes = countryCode.split('-');
    return codes.map(code => getFlagEmoji(code)).join('');
  }
  
  // Convert 2-letter country code to flag emoji
  if (countryCode.length === 2) {
    return String.fromCodePoint(...[...countryCode.toUpperCase()].map(c => 0x1F1A5 + c.charCodeAt(0)));
  }
  
  // Handle known special cases
  const specialCases = {
    'USA': '🇺🇸',
    'North-Macedonia': '🇲🇰',
    'Turkey': '🇹🇷',
    'Greece': '🇬🇷',
    'France': '🇫🇷',
    'Spain': '🇪🇸',
    'Italy': '🇮🇹',
    'Serbia': '🇷🇸',
    'Lithuania': '🇱🇹',
    'Germany': '🇩🇪',
    'Uzbekistan': '🇺🇿'
  };
  
  return specialCases[countryCode] || '';
}

// Function to scrape the data
function scrapeRoster() {
  const players = [];
  const rows = document.querySelectorAll('table#trRoster.trRoster_cls tbody tr.clssenior');

  rows.forEach(row => {
    const flagImg = row.querySelector('.tdrsimg img');
    let flagSrc = flagImg?.src || '';
    let countryCode = '';
    
    // Extract country code from image URL
    if (flagSrc) {
      const match = flagSrc.match(/\/([A-Za-z-]+)\.(gif|png|jpg|svg)$/i);
      if (match) {
        countryCode = match[1].replace('IconsFlags', '').replace('Iconsflags', '');
      }
    }
    
    const player = {
      number: row.querySelector('.tduninumber font')?.textContent.trim() || '',
      name: row.querySelector('.spnplnamedesktop')?.textContent.trim() || 
            row.querySelector('.spnplnamemobile')?.textContent.trim() || '',
      height: {
        cm: row.querySelector('.tdhightcls font[face="OSB"][size="3"]')?.textContent.trim() || '',
        inches: row.querySelector('.tdhightcls font[face="OSB"][size="2"]')?.textContent.trim().replace(/[()]/g, '') || ''
      },
      position: row.querySelector('td:nth-child(5) font')?.textContent.trim() || '',
      age: row.querySelector('td:nth-child(6)')?.textContent.trim() || '',
      nationality: getFlagEmoji(countryCode),
      fromYear: row.querySelector('.usefrom font')?.textContent.trim() || '',
      toYear: row.querySelector('#UseTo font')?.textContent.trim() || '',
      formerTeam: {
        name: row.querySelector('.formerteamcls a')?.textContent.trim() || '',
        country: getFlagEmoji(row.querySelector('.formerteamcls img')?.alt?.split('.')[0] || '')
      },
      agent: row.querySelector('.agentCol a')?.textContent.trim() || ''
    };
    players.push(player);
  });

  return players;
}

// Create JSON and download it
function downloadJSON(data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'team_roster_with_flags.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Execute and download
const rosterData = scrapeRoster();
downloadJSON(rosterData);
console.log('Roster data with flag emojis downloaded as team_roster_with_flags.json');
console.log(rosterData);
