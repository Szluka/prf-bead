const { Router } = require("express");
const Listing = require("../models/listing");
const User = require("../models/user");

// middleware to check if user is logged in
const isLoggedIn = (req, res, next) => {
	if (req.user) return next();
	return res.status(401).json({ message: "Nincs bejelentkezve" });
};


const r = Router();

r.get("/", async (req, res) => {
	// get all listings
	const listings = await Listing.find({})
		.populate("user", "username")
		.populate({
			path: "comments",
			populate: {
				path: "user",
				select: "username",
			},
		})
		.sort({ upvotes: -1 });
	console.log(listings)
	return res.status(200).json(listings);
});

r.get("/:id", async (req, res) => {
	// get one listing
	const listing = await Listing.findById(req.params.id)
		.populate("user", "username")
		.populate({
			path: "comments", populate: { path: "user", select: "username" }
		});
	return res.status(200).json(listing);
});

r.post("/",
	isLoggedIn,
	async (req, res) => {
		// create a listing
		const { title, description } = req.body;
		const listing = new Listing({ title, description, user: req.user._id });
		await listing.save();
		const user = await User.findById(req.user._id);
		user.listings.push(listing._id);
		await user.save();
		return res.status(200).json(listing);
	});
r.put("/:id/upvote",
	isLoggedIn,
	async (req, res) => {
		// upvote a listing
		const listing = await Listing.findById(req.params.id)
			.populate("user", "username")
			.populate({ path: "comments", populate: { path: "user", select: "username" } });
		listing.upvotes++;
		await listing.save();
		return res.status(200).json(listing);
	});

r.delete("/:id",
	isLoggedIn,
	async (req, res) => {
		// delete a listing
		const listing = await Listing.findById(req.params.id);
		if (!listing) return res.status(404).json({ message: "Nincs ilyen hirdetés" });
		if (listing.user.toString() !== req.user._id.toString()) {
			return res.status(401).json({ message: "Nem a te hirdetésed" });
		}

		await Listing.deleteOne({ _id: req.params.id });
		return res.status(200).json(listing);
	});

module.exports = r;