const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: { type: String, enum: ['user', 'admin'], default: 'user' },
	listings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listing' }],
	comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});

userSchema.pre('save', function (next) {
	if (this.isModified('password')) {

		const hashed = bcrypt.hashSync(this.password, 10);
		this.password = hashed;
	}
	if (this.isModified('username')) {
		this.username = this.username.toLowerCase();
	}
	next();
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
		if (err) return cb(err);
		cb(null, isMatch);
	});
};

const User = mongoose.model('User', userSchema);
module.exports = User;