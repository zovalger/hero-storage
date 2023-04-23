const mongoose = require("mongoose");

const FolderSchema = mongoose.Schema({
	name: String,
	idUsr: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
});

export default mongoose.models.Folder || mongoose.model("Folder", FolderSchema);
