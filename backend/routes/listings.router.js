const { Router } = require("express");
const Listing = require("../models/listing");

const r = Router();

r.get("/", async (req, res) => {
  // get all listings
  const listings = await Listing.find({}).populate("user","username");
	console.log(listings)
	return res.status(200).json({ listings });
});

r.get("/:id", async (req, res) => {
	// get one listing
	const listing = await Listing.findById(req.params.id).populate("user","username");
	return res.status(200).json({ listing });
});

r.post("/", async (req, res) => {
	// create a listing
	const { title, description } = req.body;
	const listing = new Listing({ title, description, user: req.user._id });
	await listing.save();
	const user = await User.findById(req.user._id);
	user.listings.push(listing._id);
	await user.save();
	return res.status(200).json({ message: "Sikeres létrehozás" });
});

r.put("/:id", async (req, res) => {
	// update a listing
	const { title, description } = req.body;
	const listing = await Listing.findById(req.params.id);
	listing.title = title;
	listing.description = description;
	await listing.save();
	return res.status(200).json({ message: "Sikeres módosítás" });
});

r.delete("/:id", async (req, res) => {
	// delete a listing
	const listing = await Listing.findById(req.params.id);
	await listing.remove();
	return res.status(200).json({ message: "Sikeres törlés" });
});

module.exports = r;