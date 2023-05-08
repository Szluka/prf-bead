const { Router } = require("express");
const Listing = require("../models/listing");
const User = require("../models/user");
const Comment = require("../models/comment");

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

r.post("/:id/comments",
	isLoggedIn,
	async (req, res) => {
		// create a comment
		const { text } = req.body;
		if (
			!text || text.trim() === "" || text.length > 200 || text.length < 1
		) return res.status(400).json({ message: "A komment tartalma nem megfelelő" });
		const listing = await Listing.findById(req.params.id);
		if (!listing) return res.status(404).json({ message: "Nincs ilyen hirdetés" });
		const newComment = new Comment({ text, user: req.user._id });
		await newComment.save();

		listing.comments.push(newComment);
		await listing.save();
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
		if (req.user.role === 'admin' || listing.user.toString() === req.user._id.toString()) {
			await Listing.deleteOne({ _id: req.params.id });
			return res.status(200).json(listing);
		}

		return res.status(401).json({ message: "Nem a te hirdetésed" });
	});

module.exports = r;