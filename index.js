const express = require('express'); // hiermee maak ik een applicatie aan
const loDash = require('lodash'); 
const camelCase = require('camelcase');
const pug = require('pug');

    //Hieronde maar ik een const variabel zodat 
    const messageInCamelCase = camelCase('testing-this-text-in-camel-case');
    // print de bovenstaande variabel
    console.log(messageInCamelCase);
    // type in de terminal: node index.js
    const port = 2021;

    
const app = express();
// In dit const variabel wordt de express framework opgeroepen en gemaakt als een module

app.use('/static', express.static('static'));
// alle files die gepubliceerd moeten worden zitten in de directory static

app.set('views', './views');
app.set('view engine', 'pug');


// app.get('/', (req, res) => { 
// // vervolgens wordt een route aangemaakt
//     res.send('<h1>Hallo Block Tech 2021!</h1>');
//     //als de bezoeker localhost:2021/ bezoekt dan krijgt het bericht te zien.

// });

app.get('/', (req, res) => {
    res.render('welkom',  {title: "Welkom in de iCu website", message: "Hello there!" });

});

app.get('/home', (req, res) => {
    res.render('home', {paginaTitel: "Home"});

});

app.get('/login', (req,res) => {
    res.render('login.pug', {paginaTitel: "Login pagina"})
});

app.get('/profile', (req,res) => {
    res.render('profile.pug', {paginaTitel: "Profiel pagina"})
});

// app.get('*', (req, res) =>{
//     res.send('<title>My site</title><link rel="stylesheet" href="/static/public/style.css"> <body class="bg-black fnt-white"><b>404 not fount page</b>  <p><img src="/static/images/404-cat.jpg"></p> </body>');
// });
app.get('*', (req, res) =>{
    res.render('404', {title:'404 page', paginaTitel: "404 pagina niet gevonden", message:'oeps deze pagina bestaat helaas niet'});
});


app.listen(port, () => {
    // we maken een locale server aan
        console.log('app is listening to port 2021');
        // en de conlose moet de bonvenstaande uitprinten als hij een server port open staat.
    });