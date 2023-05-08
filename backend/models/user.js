const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	listings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listing' }],
	comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});

userSchema.pre('save', function (next) {
	if (!this.isModified('password')) return next();
	bcrypt.hash(this.password, 10, (err, hashedPassword) => {
		if (err) return next(err);
		this.password = hashedPassword;
		next();
	});
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
		if (err) return cb(err);
		cb(null, isMatch);
	});
};

const User = mongoose.model('User', userSchema);
module.exports = User;