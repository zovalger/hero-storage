const mongoose = require("mongoose");

const FolderSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	idUser: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
});

export default mongoose.models.Folder || mongoose.model("Folder", FolderSchema);
