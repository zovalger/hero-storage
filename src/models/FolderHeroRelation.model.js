const mongoose = require("mongoose");

const HeroRelationSchema = mongoose.Schema({
	idHero: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hero'
    },
    idFolder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Folder'
    }
});


export default mongoose.models.User || mongoose.model("HeroRelation", HeroRelationSchema);