const mongoose = require("mongoose");

// Dit is mijn constructor schema model voor de gebruikers, deze schema wordt aangemaakt voor elke nieuwe object die in de database komt in collections 'users'
const UserConstructor = mongoose.model("users", {
	gamerAvatar: String,
	gamerNickName: String,
	gamerFavGame: String,
	gamerFavChar: String,
	uploaded: Boolean,
});

module.exports = UserConstructor;
