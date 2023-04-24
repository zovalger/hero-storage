const mongoose = require("mongoose");

const FolderSchema = mongoose.Schema({
	name: String,
	idUser: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
});

export default mongoose.models.Folder || mongoose.model("Folder", FolderSchema);
