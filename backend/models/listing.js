const { Schema,model } = require("mongoose");

const listingSchema = new Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	user: { type: Schema.Types.ObjectId, ref: "User" },
});

const Listing = model("Listing", listingSchema);
module.exports = Listing;