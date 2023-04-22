const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
	username: String,
	email: String,
	password: String
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
