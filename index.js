const express = require("express");
const pug = require("pug");
const multer = require("multer");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

// Hieronder roep de profile routes
const profileRoutes = require("./routes/profileRoutes");

// Hieronder roep ik mijn profile schema aan vande models folder
const UserConstructor = require("./models/userSchema");

// In dit const variabel wordt de express framework opgeroepen en gemaakt als een module
const app = express();

// Dit heb ik gebruik om te H13 error op heroku op te lossen
mongoose.set("bufferCommands", false);

// alle files die gepubliceerd moeten worden via de client zitten in de directory static
app.use("/static", express.static("static"));

// Hieronder stel ik waar mijn views map staat en welk template engine ik gebruik om html te compilen
app.set("views", "./views");
app.set("view engine", "pug");

// Hier zit de URI API van mongodb
// const url = process.env.DB_URL;

//Port listening setting
// const port = process.env.PORT || "0.0.0.0/0";
const PORT = process.env.PORT || 2021;

// Conecting Database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("Mongo-Database is connected (^.^)!");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

//Hieronder maakt ik een request functie aan waar de welkom-pagina wordt gerenderd
app.get("/", (req, res) => {
  res.render("welkom.pug", { paginaTitel: "Welkom in de iCu webapp" });
});

//Hieronder maakt ik een request functie aan waar de login-pagina wordt gerenderd
app.get("/matches", (req, res) => {
  res.render("matches.pug", { paginaTitel: "Matches pagina" });
});

//Hieronder maakt ik een request functie aan waar de profile wordt gerenderd
app.get("/profile", (req, res) => {
  res.render("profile.pug", {
    paginaTitel: "Profiel pagina",
    formAction: "/profile",
    reqMethod: "post",
  });
});

//Hier gebruik ik de profileRoutes die in de folder routes staat.
//Dit maakt de index .js overzichterlijker en zouden elke router zijn eigen model js file hebben
//maar voor nu laat ik met deze voobeeld zien hoe het kan.
app.use(profileRoutes);

//FIND ALL = Hieronder zeg ik dat als de client naar home gaat, dat alle objecten moeten worden opgehaald vanuit de database
// en weergegeven moeten worden in de client door de PUG egine. Hiervoor heb ik de (result) call-back gebruikt en in een variabel gezet met de naam usersData.
// Zo kan de PUG enige profiel kaarten aanmaken.
app.get("/home", (req, res) => {
  UserConstructor.find()
    .then((result) => {
      // res.send(result);
      res.render("home.pug", {
        paginaTitel: "Home pagina",
        usersData: result,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

// Hier geef ik aan dat als er een willekeurige path wordt aangevraagd door de client-side en deze bestaat niet dan krijg je een error 404 pagina.
app.get("*", (req, res) => {
  res.render("404", {
    paginaTitel: "404 pagina niet gevonden",
    message: "oeps deze pagina bestaat helaas niet",
  });
});

// Hieronder zeg ik tegen (express) mijn server naar welke port hij moet luisteren.
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("listening for requests");
  });
});
