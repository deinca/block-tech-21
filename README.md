# Welkom
Dit is mijn repo voor Block Tech Course 20-21

## Concept
Binnen block tech ga ik werken aan een matching app die gemaakt is met NODE.js en NPM.

### preview
![app-screenshot-versie-1](https://raw.githubusercontent.com/deinca/block-tech-21/main/assets/app-preview-imgs/app-ss-v1.png)

## Wat heb ik nodig?
Kennis in JavaScipt, HTML, CSS, NODE.js, NPM en MONGO DB.

Je moet dus ook NODE.js Git en NPM hebben geinstalleerd hebben in je computer voor dat je deze repo cloned.
Dit doe je door:
* `node install`
* `npm install`
* `git install`

Je kan NPM en NODE.js sneller installeren door NVM te installeren hiervoor heb je de volgende code nodig.
* `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash` 

of je kan kijken of je de programmas al in je computer hebt staan door in de terminal te typen:
* `node --version`
* `npm --version`
* `git --version`


## Hoe gebruik je deze applicatie
Clonde mijn repo:
* `git clone https://github.com/deinca/block-tech-21`

Installeer de volgende dependencies:
Express
* `npm express install` dit module van NODE.js is om de HTTP server te kunnen runnnen.

* `npm install pug` dit is de template engine die ik gebruik om HTML paginas aan te maken.

* `npm install slug` dit npm zet je URL op een veilig manier in string om.

* `npm install body-parser` dit npm heb je nodig om data te kunnen opvragen via express.

* `npm install multer` dit npm maakt het mogelijk dat je files(en meer) kan uploaden via een client formulieren.

* `npm install dotenv` dit heb je nodig om onafhankelijke variabelen te kunnen gebruiken uit de `.env` bestand. In deze bestand zet ik mijn mongoDB wachtwoord en username bijvoorbeeld.

* `npm i mongodb@3.6.3 ` hiermee installeren we het mongoDB omgeving programma zodat het later mogelijk is om data ui de database te roepen.

Essentieel om te installeren in de devdependencies:
dit zorgt ervoor dat je bewerkingen automatisch bijgewerkt worden. Dus je hoeft niet de applicatie niet steeds te herstarten.
* `npm nodemon install`

Als je al de bovenstaande heb gedaan kan je de applicatie gebruiken door in de terminal het volgende uit te voeren:
* `nodemon index.js`

### Documentatie
Raadpleeg mijn documentatie als je ergens vast zit

* [Project Wiki](https://github.com/deinca/block-tech-21/wiki)

## License 
[MIT license](https://github.com/deinca/block-tech-21/blob/main/LICENSE)