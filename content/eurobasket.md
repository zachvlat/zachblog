---
title: "Eurobasket.com Roster Scrape"
date: "2025-06-19"
slug: "eurobasket"
---

JavaScript snippet to scrape basketball team rosters from Eurobasket.com with flag emojis.

```javascript
function getFlagEmoji(code) {
  if (!code) return '';

  const alpha3ToAlpha2 = {
    USA: 'US',
    GER: 'DE',
    GRE: 'GR',
    FRA: 'FR',
    ESP: 'ES',
    ITA: 'IT',
    SRB: 'RS',
    LTU: 'LT',
    TUR: 'TR',
    MKD: 'MK',
    RUS: 'RU',
    GBR: 'GB',
    CAN: 'CA',
    AUS: 'AU',
    ARG: 'AR',
    BRA: 'BR',
    CHN: 'CN',
    JPN: 'JP',
    KOR: 'KR',
    CRO: 'HR',
    SLO: 'SI',
    ISR: 'IL',
    NGR: 'NG',
    POL: 'PL',
    CZE: 'CZ',
    BEL: 'BE',
    NED: 'NL',
  };

  const parts = code.toUpperCase().split(/[-_]/).filter(Boolean);
  let flag = '';

  for (const part of parts) {
    if (part.length === 2) {
      flag += String.fromCodePoint(0x1F1A5 + part.charCodeAt(0), 0x1F1A5 + part.charCodeAt(1));
    } else {
      const alpha2 = alpha3ToAlpha2[part];
      if (alpha2) {
        flag += String.fromCodePoint(0x1F1A5 + alpha2.charCodeAt(0), 0x1F1A5 + alpha2.charCodeAt(1));
      }
    }
  }

  return flag;
}

function scrapeRoster() {
  const players = [];
  const rows = document.querySelectorAll('.ArRosterplayer.clssenior');

  rows.forEach(row => {
    const jerseyDiv = row.querySelector('.ArRosterjersey');
    const number = jerseyDiv ? jerseyDiv.textContent.trim() : '';

    const nameLink = row.querySelector('.ArRostername .nomobilevisible') 
                  || row.querySelector('.ArRostername a');
    const name = nameLink ? nameLink.textContent.trim() : '';

    const heightDiv = row.querySelector('.ArRosterheight');
    let cm = '', inches = '';
    if (heightDiv) {
      // cm is the direct text node (before the <small>)
      cm = heightDiv.childNodes[0]?.textContent.trim() || '';
      const small = heightDiv.querySelector('small');
      inches = small ? small.textContent.trim() : '';
    }

    const posDiv = row.querySelector('.ArRosterpos');
    const position = posDiv ? posDiv.textContent.trim() : '';

    const ageDiv = row.querySelector('.ArRosterage');
    const age = ageDiv ? ageDiv.textContent.trim() : '';

    const natImg = row.querySelector('.ArRosternat img');
    let nationality = '';
    if (natImg) {
      const src = natImg.getAttribute('src') || '';
      const match = src.match(/\/([A-Za-z-]+)\.(png|gif|jpg|svg)/);
      if (match) {
        nationality = getFlagEmoji(match[1]);
      }
    }

    const fromDiv = row.querySelector('.ArRosterFrom.nomobile');
    const toDiv = row.querySelector('.ArRosterTo.nomobile');
    const fromYear = fromDiv ? fromDiv.textContent.trim() : '';
    const toYear = toDiv ? toDiv.textContent.trim() : '';

    const formerTeamDiv = row.querySelector('.ArRostercollege');
    let formerTeamName = '', formerTeamCountry = '';
    if (formerTeamDiv) {
      const teamLink = formerTeamDiv.querySelector('a');
      formerTeamName = teamLink ? teamLink.textContent.trim() : '';
      const flagImg = formerTeamDiv.querySelector('img');
      if (flagImg) {
        const src = flagImg.getAttribute('src') || '';
        const match = src.match(/\/([A-Za-z-]+)\.(png|gif|jpg|svg)/);
        if (match) {
          formerTeamCountry = getFlagEmoji(match[1]);
        }
      }
    }

    const agentLink = row.querySelector('.ArRosterAgent a');
    const agent = agentLink ? agentLink.textContent.trim() : '';

    players.push({
      number,
      name,
      height: { cm, inches },
      position,
      age,
      nationality,
      fromYear,
      toYear,
      formerTeam: {
        name: formerTeamName,
        country: formerTeamCountry
      },
      agent
    });
  });

  return players;
}

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

const rosterData = scrapeRoster();
downloadJSON(rosterData);
console.log('✅ Done! Roster data with flag emojis downloaded as team_roster_with_flags.json');
console.log(rosterData);
