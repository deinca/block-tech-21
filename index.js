const express = require("express");
const pug = require("pug");
const multer = require("multer");
const mongoose = require("mongoose");

const dotenv = require("dotenv").config();

//Hieronder roep de profile routes
const profileRoutes = require("./routes/profileRoutes");

//Hieronder roep ik mijn profile schema aan vande models folder
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

const url = process.env.DB_URL;

// Conecting Database
mongoose
	.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	// We gebruiken de promise method om erros of berichten te loggen
	.then((result) => console.log("Mongo-Database is connected (^.^)!"))
	.catch((err) => console.log(err));

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
		reqDelete: "delete",
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
			res.render("home", {
				paginaTitel: "Home pagina",
				usersData: result,
			});
		})
		.catch((err) => {
			console.log(err);
		});
});

// Hier geef ik aan dat als er een willekeurige path wordt aangevraagd door de client-side en deze bestaat niet dan krijg je een error 404 pagina.
app.get("*", (req, res) => {
	res.render("404", {
		paginaTitel: "404 pagina niet gevonden",
		message: "oeps deze pagina bestaat helaas niet",
	});
});

//Port listening setting
const port = process.env.PORT || "0.0.0.0";
const host = process.env.HOST || 2021;

// Hieronder zeg ik tegen (express) mijn server naar welke port hij moet luisteren.
app.listen(port, host, () => {
	// we maken een locale server aan
	console.log(`The app is listening to port ${port} or ${host}`);
	// en de conlose moet de bonvenstaande uitprinten als hij een server port open staat.
});
