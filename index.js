const express = require('express');
const loDash = require('lodash');
const camelCase = require('camelcase');

//Hieronde maar ik een let variabel zodat 
let messageInCamelCase = camelCase('testing-this-text-in-camel-case');
// print de bovenstaande variabel
console.log(messageInCamelCase);
// type in de terminal: node index.js


const app = express();
// we zetten de module in een variabel

app.listen(2021,
// we maken een locale server aan

    function(){console.log('app is listening to port 2021')}
    // en we loggen in de console als de port is geopend
    );


app.get('/', (req, res) => {
// vervolgens maken we een route aan 

    res.send('Hallo Block Tech 2021!');
    //als de bezoeker localhost:2021/ bezoekt dan krijgt het bericht te zien.

});
