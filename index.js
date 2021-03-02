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
const url = 'mongodb+srv://'+ process.env.DB_USERNAME +':'+ process.env.DB_PASSWORD +'@icudata.bp6bm.mongodb.net/'+ process.env.DB_NAME +'?retryWrites=true&w=majority';

// Conecting Database
mongoose.connect(url, {
    useNewUrlParser: true, 
    useUnifiedTopology: true })
    // We gebruiken de promise method om erros of berichten te loggen 
    .then((result) => console.log('Mongo-Database is connected (^.^)!'))
    .catch((err) => console.log(err))


//Port listening setting
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 2021;

    //Hieronde maar ik een const variabel zodat 
    const messageInCamelCase = camelCase('testing-this-text-in-camel-case');
    // print de bovenstaande variabel
    console.log(messageInCamelCase);

// Body-parser variabelen die het mogelijk makne om de data op te vragen van een formulier
let jsonParser = bodyParser.json()
let urlencodedParser = bodyParser.urlencoded({ extended: false })

//Storage files hieronder stel ik de bestand namen 
let storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './static/uploads/')
    },
    filename: function (req, file, cb)   {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
    }
})
// Met deze variable kan multer gebruiken om de geuploade bestanden een bepaalde naam moet krijgen.
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

// Dit mijn constructor schema model voor de gebruikers, deze schema wordt aangemaakt voor elke nieuwe object die in de database komt
const UserConstructor = mongoose.model('users', {
    gamerAvatar: String,
    gamerNickName: String,
    gamerFavGame:String,
    gamerFavChar:String,
    uploaded: Boolean,

});

//POST = hieronder zeg ik dat objecten gemaakt kunnen worden als er bepaalde dat wordt verstuur vanuit de client-side
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

        //We geven een redirect aan zodat we de net geuploade data weergegven wordt op de profile pagina met een ID query 
        res.redirect(`/profile/${newGamer._id}`)

        console.log('A new user object is uploaded (^.^)!')
    })

});

//FIND & INSERT = hieronder zeggen we dat als er een bepaalde id wordt meegeven vanuit de client-side, 
// dat de data gehaald wordt van uit de database uit de specifieke id
app.get('/profile/:id', (req,res) => {

    
    let id = req.params.id
    UserConstructor.findById(id)

    .then(newGamer => {
        res.render('profile.pug', {
        infoTitel:`Hey ${newGamer.gamerNickName}!, dit zijn je gegevens`,
        userAva:  '../' + newGamer.gamerAvatar,
        nameGamer: newGamer.gamerNickName,
        favGame: newGamer.gamerFavGame,
        favChar: newGamer.gamerFavChar,
        uploaded: newGamer.uploaded,
        idGamer: newGamer._id,
        reqDelete: 'post',
        formAction: '/profile/' + newGamer._id,
        reqMethod: 'post'
        }) 
        // console.log(newGamer.gamerNickName) // mocht er iets fouts gaan dan kunnen we kijken als er echt data wordt opgehaald
    })
    .catch((err) => {
    console.log(err);
    })
    // console.log(id) //
});


//UPDATE IN THE DATABASE =  
// Ik heb gekozen om de data te laten bwereken door de client-side met een post fomulier, omdat ik de client JS wil gebruiken voor functioinaliteit in de cleintside.
// want volgens de MDN website heb ik gezien dat je een PUT handler kan gebruiken maar dit gaat samen met de Client JS en dit leek mij niet handig omdat ik denk aan de Progessive Enhancement principe

app.post('/profile/:id', upload.single('filename'), (req,res) => {
    let id = req.params.id  
    UserConstructor.findByIdAndUpdate(id, {$set: { gamerAvatar: req.file.path, gamerNickName: req.body.username, gamerFavGame: req.body.game, gamerFavChar: req.body.character}}, 
    { sort: {_id: -1},    upsert: true  }, 
    (result) => {    
        if (err) 
        return 
        //zodra de boevenstade velden zijn aangepast in de database, zeg ik dat de gebruiker weer terug gestuurd wordt naar zijn profiel pagina.
        res.redirect(`/profile/${id}`)  
        console.log(`id:${id} is updated`)
    })

})

//DELETE FROM THE DATABASE = Hier heb ik ook hetzelfde toegepast wat ik bij het UPDATE heb gedaan dur ik heb niet de delete hanlder gebruikt vanwegen de Progresseive Enhancement principe.
// Zo kunnen mensen die niet het CSS of bepaalde dunctionaliteit in de Cleint JS alsnog gebruikt maken van mijn applicatie.
app.post('/delete/:id', (req, res)=> {
    let id = req.params.id
    UserConstructor.findByIdAndDelete(id,   
        (err, result) => {    
            if (err) 
            return 
            // res.send(500, err) 
    res.send('Je profiel is verwijderd <br> <a href="/home"> <button> Terug naar home als gast? </button></a> ')
    })
}) 

//FIND ALL = Hieronder zeg ik dat als de client naar home gaat, dat alle objecten moeten worden opgehaald vanuit de database
// en weergegeven moeten worden in de client door de PUG egine. Hiervoor heb ik de (result) call-back gebruikt en in een variabel gezet met de naam usersData.
// Zo kan de PUG enige profiel kaarten aanmaken.
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

// Hier geef ik aan dat als er een willekeurige path wordt aangevraagd door de client-side en deze bestaat niet dan krijg je een error 404 pagina.
app.get('*', (req, res) =>{
    res.render('404', {title:'404 page', paginaTitel: "404 pagina niet gevonden", message:'oeps deze pagina bestaat helaas niet'});
});

// Hieronder zeg ik tegen (express) mijn server naar welke port hij moet luisteren. 
app.listen(port, host, () => {
  // we maken een locale server aan
    console.log(`The app is listening to port ${port} or ${host}`); 
  // en de conlose moet de bonvenstaande uitprinten als hij een server port open staat.
});