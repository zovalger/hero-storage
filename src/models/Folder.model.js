const mongoose = require("mongoose");

const FolderSchema = mongoose.Schema({
	name: String,
    idUsr: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

export default mongoose.models.User || mongoose.model("Folder", FolderSchema);