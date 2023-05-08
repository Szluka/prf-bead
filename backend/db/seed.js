const User = require("../models/user");
const Listing = require("../models/listing");
const Comment = require("../models/comment");

async function seed() {
	try {
		const testUser = await User.findOne({ username: "andras" });
		if (!testUser) {
			const newUser = new User({
				username: "teszt",
				password: "teszt",
			});
			await newUser.save();
			console.log("Teszt felhasználó létrehozva");
		}
	} catch (err) {
		console.log(err);
	}
}

module.exports = seed;