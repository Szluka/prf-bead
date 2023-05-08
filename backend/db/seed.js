const User = require("../models/user");
const Listing = require("../models/listing");
const Comment = require("../models/comment");

async function seed() {
	await User.deleteMany({});
	await Listing.deleteMany({});
	await Comment.deleteMany({});
	try {
		const users = await Promise.all([
			{ username: "admin", password: "admin", role: "admin" },
			{ username: "user", password: "user", role: "user" },
		].map((user) => new User(user).save()));

		const listings = await Promise.all([	// 1. feladat
			{ title: "Valakinek van eladó Iphone-ja?", description: "Sziasztok! Valakinek van eladó Iphone-ja? Köszi!", upvotes: 0, user: users[0]._id },
			{ title: "Eladó 2 db 4 személyes kemping sátor", description: "Eladó 2 db 4 személyes kemping sátor. Ár: 22.500 Ft/db", upvotes: 0, user: users[1]._id },
		].map((listing) => new Listing(listing).save()));

		const comments = await Promise.all([	// 2. feladat
			{ text: "Szia! Igen, nekem van egy eladó Iphone 6S-em. Ár: 30.000 Ft", listing: listings[0]._id, user: users[1]._id, },
			{ text: "Szia! Majd hívlak.", listing: listings[0]._id, user: users[0]._id, },
		].map((comment) => new Comment(comment).save()));
		users[0].listings = [listings[0]._id];
		users[1].listings = [listings[1]._id];
		users[0].comments = [comments[1]._id];
		users[1].comments = [comments[0]._id];
		listings[0].comments = [comments[0]._id, comments[1]._id];
		await Promise.all(users.map((user) => user.save()));
		await Promise.all(listings.map((listing) => listing.save()));
	} catch (err) {
		console.log(err);
	}
}

module.exports = seed;