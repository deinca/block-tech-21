const express = require('express'); // hiermee maak ik een applicatie mee bouwen
const loDash = require('lodash'); 
const camelCase = require('camelcase');
const pug = require('pug');
const slug = require('slug');
const bodyParser = require('body-parser');
const multer  = require('multer')

const port = 2021; // type in de terminal: node index.js

    //Hieronde maar ik een const variabel zodat 
    const messageInCamelCase = camelCase('testing-this-text-in-camel-case');
    // print de bovenstaande variabel
    console.log(messageInCamelCase);

const app = express();
// In dit const variabel wordt de express framework opgeroepen en gemaakt als een module

let jsonParser = bodyParser.json()
let urlencodedParser = bodyParser.urlencoded({ extended: false })

//Storage files hieronder stel ik de bestanden namen erbij
let storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './static/uploads/')
    },
    filename: function (req, file, cb)   {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
    }
})
let upload = multer({storage: storage})

app.use('/static', express.static('static'));
// alle files die gepubliceerd moeten worden via de client zitten in de directory static



app.set('views', './views');
app.set('view engine', 'pug');




app.get('/', (req, res) => {
    res.render('welkom',  {title: "Welkom in de iCu website", message: "Welkom in de iCu website" });

});

app.get('/home', (req, res) => {
    res.render('home', {paginaTitel: "Home pagina"});

});

app.get('/login', (req,res) => {
    res.render('login.pug', {paginaTitel: "Login pagina"})
});

app.get('/profile', (req,res) => {
    res.render('profile.pug', {paginaTitel: "Profiel pagina"})
});

app.post('/profile', upload.single('filename'), (req, res) => {
    // req.file is the `avatar` file
    //res.send(req.file)
    // req.body will hold the text fields, if there were any
    // res.send(`<p><img src="/static/uploads/${req.file.path}"></p>`)

    let data = [];
    data.push({       
        photopath:req.file.path,
        username: req.body.username,
        game: req.body.game,
        character: req.body.character,
        photofile: req.file
    })
    console.log(data);
    res.send(`<h1>Dit zijn je gegevens</h1><p><img src="/${req.file.path}"></p><ul><li>${req.body.filename}</li><li>${req.body.username}</li><li>${req.body.game}</li><li>${req.body.character}</li></ul>`); 
    
});

// app.post('/profile', urlencodedParser, function (req, res) {
//     let data = [];
//     data.push({       
//         filename: req.body.filename,
//         username: req.body.username,
//         game: req.body.game,
//         character: req.body.character,
//         photo: req.file

//     })
//     console.log(data);
//     res.send(`<h1>Dit zijn je gegevens</h1><p><img src="/static/uploads/${req.file.path}"></p><ul><li>${req.body.filename}</li><li>${req.body.username}</li><li>${req.body.game}</li><li>${req.body.character}</li></ul>`);
// });

app.get('*', (req, res) =>{
    res.render('404', {title:'404 page', paginaTitel: "404 pagina niet gevonden", message:'oeps deze pagina bestaat helaas niet'});
});


app.listen(port, () => {
  // we maken een locale server aan
    console.log("app is listening to port 2021");
  // en de conlose moet de bonvenstaande uitprinten als hij een server port open staat.
});