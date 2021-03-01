const express = require('express'); // hiermee maak ik een applicatie mee bouwen
const loDash = require('lodash'); 
const camelCase = require('camelcase');
const pug = require('pug');
const slug = require('slug');
const bodyParser = require('body-parser');
const multer  = require('multer')
// const mongo = require('mongodb'); // geprobeerd maar duurde mij te lang
const mongoose = require('mongoose');
const { result } = require('lodash');
// Door de dotenv NPM package aante roepen kan ik codes variabelen uit de .env bestand gebruiken. 
const dotenv = require('dotenv').config();

// In dit const variabel wordt de express framework opgeroepen en gemaakt als een module
const app = express();

app.use('/static', express.static('static'));
// alle files die gepubliceerd moeten worden via de client zitten in de directory static

// hieronder zeg ik dat elke keer als er iets wordt gedaan 

// Hieronder stel ik mijn files in
app.set('views', './views');
app.set('view engine', 'pug');

// Database URI
const url = 'mongodb+srv://delinca:'+ process.env.DB_PASSWORD +'@icudata.bp6bm.mongodb.net/'+ process.env.DB_NAME +'?retryWrites=true&w=majority';

// Conecting Database
mongoose.connect(url, {
    useNewUrlParser: true, 
    useUnifiedTopology: true })
    // We gebruiken de promise method om erros of berichten te loggen 
    .then((result) => console.log('Mongo-Database is connected (^.^)!'))
    .catch((err) => console.log(err))

// In deze variabel zet ik een model/ schema/ blauw druk hoe de objecten eruit moeten zien, dit wordt ook gezien als een constructor
// const Cat = mongoose.model('users', { name: String }); // **Example



// Binnen de deze get req zullen wij de data doorsturen naar onze database
// app.get('/add-object', (req, res)=>{
//     const kitty = new Cat({ name: 'deinca' });
//     kitty.save().then(() => {
//         res.send(kitty)
//         console.log('meow')});
// }); **Example




//Port listening setting
const port = process.env.DB_PORT || 2021;

    //Hieronde maar ik een const variabel zodat 
    const messageInCamelCase = camelCase('testing-this-text-in-camel-case');
    // print de bovenstaande variabel
    console.log(messageInCamelCase);

// Body-parser variabelen die het mogelijk makne om de data op te vragen van een formulier
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

//Hieronder maakt ik een request functie aan waar de welkompagina wordt gerenderd
app.get('/', (req, res) => {
    res.render('welkom',  {title: "Welkom in de iCu website", message: "Welkom in de iCu website" });

});

//Hieronder maakt ik een request functie aan waar de loginpagina wordt gerenderd
app.get('/login', (req,res) => {
    res.render('login.pug', {paginaTitel: "Login pagina"})
});

//Hieronder maakt ik een request functie aan waar de profile wordt gerenderd
app.get('/profile', (req,res) => {
    res.render('profile.pug', {paginaTitel: "Profiel pagina", formAction:"/profile", reqMethod:"post", reqDelete: 'delete'})
});

// // ***** zet weer actief 
// //Hieronder maakt ik een functie aan waar ik afbeeldingen en informatie wordt gere-renderd in de profile pagina,die af komt van de fomulier.
// app.post('/profile', upload.single('filename'), (req, res) => {
//     // res.send(`<h1>Dit zijn je gegevens</h1><p><img src="/${req.file.path}"></p><ul><li>${req.body.filename}</li><li>${req.body.username}</li><li>${req.body.game}</li><li>${req.body.character}</li></ul>`); 
//     res.render('profile.pug', {
//         infoTitel:`Hey ${req.body.username}!, dit zijn je gegevens`,
//         userAva: req.file.path,
//         nameGamer: req.body.username,
//         favGame: req.body.game,
//         favChar: req.body.character,
//         uploaded: true
//     })   

//     //Hieronder zet ik de data in een array die wordt opgehaald door de body-parser
//     let data = [];
//     data.push({       
//         photopath:req.file.path,
//         username: req.body.username,
//         game: req.body.game,
//         character: req.body.character,
//         photofile: req.file
//     })
//     //hieronder test ik of de data goed is doorgegeven
//     console.log('De data hieronder is geupload',data);
// });

// // ********
const UserConstructor = mongoose.model('users', {
    gamerAvatar: String,
    gamerNickName: String,
    gamerFavGame:String,
    gamerFavChar:String,
    uploaded: Boolean,

});

app.post('/profile', upload.single('filename'), (req, res) => {
    // maar een object aan met de ingevolde fomulier
    const newGamer = new UserConstructor({ 
        gamerAvatar: req.file.path,
        gamerNickName: req.body.username,
        gamerFavGame: req.body.game,
        gamerFavChar: req.body.character,
        uploaded: true
    });
    console.log(newGamer)
    newGamer.save().then(() => {

        // res.send('De volgende object is in de database opgeslagen')
        // res.render('profile.pug', {
        //     infoTitel:`Hey ${newGamer.gamerNickName}!, dit zijn je gegevens`,
        //     userAva: newGamer.gamerAvatar,
        //     nameGamer: newGamer.gamerNickName,
        //     favGame: newGamer.gamerFavGame,
        //     favChar: newGamer.gamerFavChar,
        //     link: newGamer._id,
        //     uploaded: newGamer.uploaded
        // })
        
        res.redirect(`/profile/${newGamer._id}`)

        console.log('A new user object is uploaded (^.^)!')
    })

});

app.get('/profile/:id', (req,res) => {

    
    let id = req.params.id
    UserConstructor.findById(id)
    // UserConstructor.findById(req.params.id)
    .then(newGamer => {
        res.render('profile.pug', {
        infoTitel:`Hey ${newGamer.gamerNickName}!, dit zijn je gegevens`,
        userAva:  '../' + newGamer.gamerAvatar,
        nameGamer: newGamer.gamerNickName,
        favGame: newGamer.gamerFavGame,
        favChar: newGamer.gamerFavChar,
        uploaded: newGamer.uploaded,
        idGamer: newGamer._id,
        reqDelete: 'delete',
        formAction: '/profile/' + newGamer._id,
        reqMethod: 'post'
        }) 
        // console.log(newGamer.gamerNickName)
    })
    // .catch((err) => {
    // console.log(err);
    // })
    // console.log(id)
});


//UPDATE post fomulier
app.post('/profile/:id', upload.single('filename'), (req,res) => {
    let id = req.params.id  
    UserConstructor.findByIdAndUpdate(id, {$set: { gamerAvatar: req.file.path , gamerNickName: req.body.username, gamerFavGame: req.body.game, gamerFavChar: req.body.character}}, 
    { sort: {_id: -1},    upsert: true  }, 
    (result) => {    
        // if (err) 
        // return 
        // res.send(err)    
        // res.send('updated')
        res.redirect(`/profile/${id}`)  
        console.log('updated')
    })
    // res.send('updated') 
    // console.log('updated')
})



app.put('/profile/:id', (req, res) => {
    let id = req.params.id
    UserConstructor.findByIdAndUpdate(idGamer, {$set: {gamerNickName: 'Gohan', gamerFavGame: 'Warzone'}})
    
    console.log(id);
    
});

// Hieronder probeer ik een delete functie aan te maken doordat de data wordt opgehaald van de formulier met een knop ook te kunnen verwaijderen.
app.delete('/profile/:id', (req, res) => {

    let id = req.params.id
    console.log(id)
    UserConstructor.findByIdAndDelete(id)
    .then(result => {
        // res.json(result)
        // res.send('profiel is verwijderd')
        console.log(result)
    })
    .catch(err => {
        console.log(err);
    })  
    // res.render('profile.pug',  {
    //     userAva: req.file.path,
    //     nameGamer: req.body.username,
    //     favGame: req.body.game,
    //     favChar: req.body.character
    // })
});




//Hieronder maakt ik een request functie aan waar de homepagina wordt gerenderd
app.get('/home', (req, res) => {
    
    UserConstructor.find()
    .then((result) => {
        // res.send(result);
        res.render('home', {paginaTitel: "Home pagina", usersData: result})
    })
    .catch((err) => {
        console.log(err);
    })
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


// Hier geef ik aan dat als er een willekeurige path wordt aangevraagd door de client-side en deze bestaat niet dan krijg je een error 404 pagina.
app.get('*', (req, res) =>{
    res.render('404', {title:'404 page', paginaTitel: "404 pagina niet gevonden", message:'oeps deze pagina bestaat helaas niet'});
});

// Hieronder zeg ik tegen (express) mijn server naar welke port hij moet luisteren. 
app.listen(port, () => {
  // we maken een locale server aan
    console.log(`The app is listening to port ${port}`);
  // en de conlose moet de bonvenstaande uitprinten als hij een server port open staat.
});