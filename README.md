# mtgProxyMaker

## Generate Sheets from EDHREC

## TL;DR

1. Go to any edh rec page that contains cards cards: ex. https://edhrec.com/commanders/kumena-tyrant-of-orazca then open a console and run:

`copy($('div.card > a').map((index,ele) => { return ele.href.split('/')[4] }))` then

2. Then go to `http://localhost:8000/proxyMaker.html` and in the console:

And paste into an assigned variable `var cards = <PASTE CONTENT>`:

3. Generate cards with:

```
generateEDHREC(cards)
```

4. Remove blanks with:

```
removeBlanks(cards)
```

5. Remove duplicates with:

```
removeDuplicates(cards)
```

6. Get an updated count of cards with:

```
updateCardCount()
```

7. Filter or make additions. Click on cards to delete them. Use the search bar at the top to add them.

Double check for any cards with apostrophies `Gaea's Cradle`, commas `Sorin, Grim Nemesis`, double sided `Thaumatic Compass` => `Spires of Orazca`, or dual cards i.e. `Wear // Tear`. Also this method inserts weird card art sometimes.

Sheets should print 3x3 cards, and cards should be playable size.

Barebones, but works.

Bonus script for getting approx total retail price of cards on EDHREC page. Pop open a console at an EDHREC page and run:

```
function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

precisionRound(Array.from(document.querySelectorAll("div.price > a")).filter((ele) => {return ele.text.split("$")[1]}).reduce((memo,ele) => {console.log(parseFloat(ele.text.split("$")[1])); return memo + parseFloat(ele.text.split("$")[1]); },0),2)
```

Example URL https://edhrec.com/commanders/mathas-fiend-seeker has $1157.29 of cards on it.

https://edhrec.com/commanders/sliver-legion has $2398.63 of cards on it.

## Notes

### Select all card names. 

Go to URL. 

Example: https://edhrec.com/commanders/kumena-tyrant-of-orazca

Example: `$('div.card > a').map((index,ele) => { return ele.href.split('/')[4] })`

Example of log result
```
m.fn.init(198) ["seafloor-oracle", "merfolk-mistbinder", "deeproot-elite", "forerunner-of-the-heralds", "jadelight-ranger", "hadanas-climb", "merrow-reejerey", "master-of-the-pearl-trident", "merfolk-sovereign", "merrow-commerce", "stonybrook-banneret", "silvergill-adept", "lord-of-atlantis", "deeproot-waters", "kopala-warden-of-waves", "lullmage-mentor", "merrow-harbinger", "harbinger-of-the-tides", "seahunter", "coralhelm-commander", "kioras-follower", "cyclonic-rift", "cold-eyed-selkie", "tishana-voice-of-thunder", "herald-of-secret-streams", "vanquishers-banner", "simic-signet", "thada-adel-acquisitor", "shapers-of-nature", "master-of-waves", "metallic-mimic", "prime-speaker-zegana", "heralds-horn", "cultivate", "wanderwine-prophets", "surgespanner", "murkfiend-liege", "wake-thrasher", "kumenas-speaker", "tempest-caller", "thrasios-triton-hero", "fallowsage", "vineshaper-mystic", "merfolk-branchwalker", "vorel-of-the-hull-clade", "cosis-trickster", "deepchannel-mentor", "swift-warden", "wistful-selkie", "river-sneak", "enclave-cryptologist", "merfolk-looter", "sage-of-fables", "deeproot-champion", "riverwise-augur", "jungleborn-pioneer", "tidal-courier", "thassa-god-of-the-sea", "mist-cloaked-herald", "empress-galina", "waterspout-weavers", "jade-bearer", "talrand-sky-summoner", "stormtide-leviathan", "tishanas-wayfinder", "eternal-witness", "streambed-aquitects", "adaptive-automaton", "seedborn-muse", "silvergill-douser", "drowner-of-secrets", "true-name-nemesis", "cursecatcher", "sigil-tracer", "waker-of-the-wilds", "jade-guardian", "world-shaper", "master-biomancer", "progenitor-mimic", "merfolk-skyscout", "tideshaper-mystic", "birds-of-paradise", "counterspell", "beast-within", "krosan-grip", "heroic-intervention", "disallow", "negate", "kindred-summons", "plasm-capture", "reality-shift", "swan-song", "rapid-hybridization", "worldly-tutor", "brainstorm", "arcane-denial", "mana-drain", "cryptic-command", "rewind", "river-heralds-boon", …]
```

### Copy the result:

`copy($('div.card > a').map((index,ele) => { return ele.href.split('/')[4] }))`

Copies to clipboard.


### Should paste into something like this:

```
{
  "0": "seafloor-oracle",
  "1": "merfolk-mistbinder",
  "2": "deeproot-elite",
  "3": "forerunner-of-the-heralds",
  "4": "jadelight-ranger",
  
  ../

  "195": "yavimaya-hollow",
  "196": "gaeas-cradle",
  "197": "tropical-island",
  "length": 198,
  "prevObject": {
    "0": {},
    "1": {},
    "2": {},
    "3": {},
...

    "194": {},
    "195": {},
    "196": {},
    "197": {},
    "length": 198,
    "prevObject": {
      "0": {
        "location": {
          "href": "https://edhrec.com/commanders/kumena-tyrant-of-orazca",
          "ancestorOrigins": {},
          "origin": "https://edhrec.com",
          "protocol": "https:",
          "host": "edhrec.com",
          "hostname": "edhrec.com",
          "port": "",
          "pathname": "/commanders/kumena-tyrant-of-orazca",
          "search": "",
          "hash": ""
        },
        "jQuery111305984771093166146": 1
      },
      "context": {
        "location": {
          "href": "https://edhrec.com/commanders/kumena-tyrant-of-orazca",
          "ancestorOrigins": {},
          "origin": "https://edhrec.com",
          "protocol": "https:",
          "host": "edhrec.com",
          "hostname": "edhrec.com",
          "port": "",
          "pathname": "/commanders/kumena-tyrant-of-orazca",
          "search": "",
          "hash": ""
        },
        "jQuery111305984771093166146": 1
      },
      "length": 1
    },
    "context": {
      "location": {
        "href": "https://edhrec.com/commanders/kumena-tyrant-of-orazca",
        "ancestorOrigins": {},
        "origin": "https://edhrec.com",
        "protocol": "https:",
        "host": "edhrec.com",
        "hostname": "edhrec.com",
        "port": "",
        "pathname": "/commanders/kumena-tyrant-of-orazca",
        "search": "",
        "hash": ""
      },
      "jQuery111305984771093166146": 1
    },
    "selector": "div.card > a"
  },
  "context": {
    "location": {
      "href": "https://edhrec.com/commanders/kumena-tyrant-of-orazca",
      "ancestorOrigins": {},
      "origin": "https://edhrec.com",
      "protocol": "https:",
      "host": "edhrec.com",
      "hostname": "edhrec.com",
      "port": "",
      "pathname": "/commanders/kumena-tyrant-of-orazca",
      "search": "",
      "hash": ""
    },
    "jQuery111305984771093166146": 1
  }
}
```

Paste into a new object in `http://localhost:8000/proxyMaker.html` console:

```
let cards = {
  "0": "seafloor-oracle",
  "1": "merfolk-mistbinder",
  "2": "deeproot-elite",
  "3": "forerunner-of-the-heralds",
  "4": "jadelight-ranger",

...

  "194": "oran-rief-the-vastwood",
  "195": "yavimaya-hollow",
  "196": "gaeas-cradle",
  "197": "tropical-island",

...

    "context": {
    "location": {
      "href": "https://edhrec.com/commanders/kumena-tyrant-of-orazca",
      "ancestorOrigins": {},
      "origin": "https://edhrec.com",
      "protocol": "https:",
      "host": "edhrec.com",
      "hostname": "edhrec.com",
      "port": "",
      "pathname": "/commanders/kumena-tyrant-of-orazca",
      "search": "",
      "hash": ""
    },
    "jQuery111305984771093166146": 1
  }
  
```

## Fetch the cards.

Set the value of the input field.

Ex: `$('#card-search').value = 'Itli'`

Click the submit button

Ex: `$('#card-input > input[type="submit"]:nth-child(2)').click()`

Do that for all cards

```
for (var i = 0; i < cards.length; i++){ 
  console.log(cards[i].replace(/-/g, ' ')); 
  $('#card-search').value = cards[i].replace(/-/g, ' '); 
  $('#card-input > input[type="submit"]:nth-child(2)').click(); 
  }
```
## Detail your sheet.

1. Filter for your card prefered art.

1. Filter out cards you don't want.

1. Add any additinoal searches. For example the script will choke a bit at `Growing Rites of Itlimoc // Itlimoc, Cradle of the Sun` in that it will get Growing Rites, but not Itlimoc, Cradle of the Sun. You can add that manually. It also currently fails on cards with apostraphies... so `Gaea's Cradle` needs it's own search.

1. Make sure all your cards are there.

Resize your screen into 3-wide
