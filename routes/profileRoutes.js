const express = require("express");
const router = express.Router();
//Hieronder roep ik mijn profile schema aan van de models folder
const UserConstructor = require("../models/userSchema");

const multer = require("multer");

//Hieronder wordt de storage gedefineerd en hoe de naam moet worden gegenereerd
let storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./static/uploads/");
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
	},
});

// Met deze variable kan multer gebruiken om de geuploade bestanden een bepaalde naam moet krijgen.
let upload = multer({ storage: storage });

//POST = hieronder zeg ik dat objecten gemaakt kunnen worden als er bepaalde dat wordt verstuur vanuit de client-side
router.post("/profile", upload.single("filename"), (req, res) => {
	// maar een object aan met de ingevolde fomulier
	const newGamer = new UserConstructor({
		gamerAvatar: req.file.path,
		gamerNickName: req.body.username,
		gamerFavGame: req.body.game,
		gamerFavChar: req.body.character,
		uploaded: true,
	});
	//Hiermee kan ik weten wat voor data wordt opgeslagen in de database
	console.log(newGamer);

	//Nadat de data is opgeslagen in een nieuwe variabel zeg ik dat opgeslagen moet worden in de database
	newGamer
		.save()
		.then(() => {
			//Na het opslaan geven we een redirect aan zodat we de net geuploade data weergegven wordt op de profile pagina met een ID query
			res.redirect(`/profile/${newGamer._id}`);

			//Hiermee weet ik zeker dat de data is geupload en dat de functie goed uit wordt gevoerd
			console.log("A new user object is uploaded (^.^)!");
		})
		.catch((err) => {
			console.log(err);
		});
});

//FIND & INSERT = hieronder zeggen we dat als er een bepaalde id wordt meegeven vanuit de client-side,
// dat de data gehaald wordt van uit de database uit de specifieke id
router.get("/profile/:id", (req, res) => {
	let id = req.params.id;

	UserConstructor.findById(id)
		.then((newGamer) => {
			res.render("profile.pug", {
				infoTitel: `Hey ${newGamer.gamerNickName}!, dit zijn je gegevens`,
				userAva: "../" + newGamer.gamerAvatar,
				nameGamer: newGamer.gamerNickName,
				favGame: newGamer.gamerFavGame,
				favChar: newGamer.gamerFavChar,
				uploaded: newGamer.uploaded,
				idGamer: newGamer._id,
				reqDelete: "post",
				formAction: "/profile/" + newGamer._id,
				reqMethod: "post",
			});
			// console.log(newGamer.gamerNickName) // mocht er iets fouts gaan dan kunnen we kijken als er echt data wordt opgehaald
		})
		.catch((err) => {
			console.log(err);
		});
	// console.log(id) //
});

//UPDATE IN THE DATABASE =
// Ik heb gekozen om de data te laten bwereken door de client-side met een post fomulier, omdat ik de client JS wil gebruiken voor functioinaliteit in de cleintside.
// want volgens de MDN website heb ik gezien dat je een PUT handler kan gebruiken maar dit gaat samen met de Client JS en dit leek mij niet handig omdat ik denk aan de Progessive Enhancement principe
router.post("/profile/:id", upload.single("filename"), (req, res) => {
	let id = req.params.id;

	UserConstructor.findByIdAndUpdate(id, {
		$set: {
			gamerAvatar: req.file.path,
			gamerNickName: req.body.username,
			gamerFavGame: req.body.game,
			gamerFavChar: req.body.character,
		},
	})
		.then((result) => {
			console.log(`id:${id} is updated`);
			res.redirect(`/profile/${id}`);
		})
		.catch((error) => {
			console.log(`error ocured on update id..${error}`);
		});
});

//DELETE FROM THE DATABASE = Hier heb ik ook hetzelfde toegepast wat ik bij het UPDATE heb gedaan dur ik heb niet de delete hanlder gebruikt vanwegen de Progresseive Enhancement principe.
// Zo kunnen mensen die niet het CSS of bepaalde dunctionaliteit in de Cleint JS alsnog gebruikt maken van mijn applicatie.
router.post("/delete/:id", (req, res) => {
	let id = req.params.id;
	UserConstructor.findByIdAndDelete(id)
		.then((result) => {
			res.render("delete", { paginaTitel: "Delete pagina" });
		})
		.catch((error) => {
			console.log(`error ocured on delete id..${error}`);
		});
});

module.exports = router;
