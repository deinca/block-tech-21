# :octocat: Welkom

Dit is mijn repo voor Block Tech Course 20-21

## :space_invader: Concept

Binnen block-tech heb ik gewerkt aan een feature voor een matching app. De app is gemaakt met NODE.js en gebruik gemaakt van MONGO-DB voor mijn database. De app is ge-deployd en wordt geserveerd door Heroku en je kan de app bezoeken door [hierop te klikken](https://icu-app.herokuapp.com/).

### iCu matching app preview

![app-screenshot-versie-1](https://raw.githubusercontent.com/deinca/block-tech-21/main/assets/app-preview-imgs/app-ss-v1.png)

## :wrench: Pre-installatie

Allereerst voor dat je gebruik gaat maakt van mijn repo, moet je bekend zijn met:

-   [NODE.js](https://nodejs.org/en/) om de applicatie te bewerken
-   [MONGO DB.](https://docs.mongodb.com/drivers/node/quick-start/) om je eigen database aan te sluiten
-   [NPM](https://docs.npmjs.com/about-npm) omdat er npm packages worden gebruikt
-   [Mongoose](https://mongoosejs.com/) omdat we dit gebruik maken om data aan te maken en op te halen vantuit de data base.

    **Optioneel**

-   [Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs) mocht de app te kunnen deployen

---

#### Snelle pre-installatie voor beginners

Mocht je newbie zijn begin begin dan met NODE.js, Git en NPM te installeren
Dit doe je met de volgende commandos gebruiken in je terminal:

-   `node install`
-   `git install`

    of je kan kijken of je de programma's al in je computer hebt staan door in de terminal te typen:

-   `node --version`
-   `git --version`

## :hammer: App Installatie

### Clone mijn repo:

-   `git clone https://github.com/deinca/block-tech-21`

### Installeer npm :

-   `npm install`

### Enviroment veriabelen:

Binnen deze repo zul je gebruik maken van een mongoDB account hiervoor heb je een `.env` document nodig met de volgende variabel:

`DB_URL=mongodb+srv://<link>` Dit zorgt ervoor dat de applicatie verbonden wordt met je mongodb database.

### Start de app met:

-   `npm index.js`

---

#### Of voor beginners

Essentieel om te installeren in de devdependencies:
dit zorgt ervoor dat je bewerkingen automatisch bijgewerkt worden. Dus je hoeft niet de applicatie niet steeds te herstarten.

-   `npm nodemon install`

##### App starten

Als je al de bovenstaande hebt gedaan kun je de applicatie gebruiken door in de terminal het volgende uit te voeren:

-   `nodemon`

### :books: Proces documentatie

Raadpleeg mijn documentatie als je benieuwd bent naar het proces van deze applicatie

-   [Project Wiki](https://github.com/deinca/block-tech-21/wiki)

## License

[MIT license](https://github.com/deinca/block-tech-21/blob/main/LICENSE)
