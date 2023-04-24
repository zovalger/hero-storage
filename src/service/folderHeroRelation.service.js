import mongoose from "mongoose";
import relationModel from "../models/FolderHeroRelation.model";

export const createHeroRelation_service = async (idHero, idFolder) => {
	try {
		const relationExists = await relationModel.exists({ idHero, idFolder });

		if (relationExists)
			return { error: { message: "ya existe esta relacion" } };

		const relation = await relationModel.create({ idHero, idFolder });

		return relation;
	} catch (error) {
		console.log(error);
	}
};

export const findRelationBy_Id = async (id) => {
	try {
		const relation = await relationModel.findById(id);
		return relation;
	} catch (error) {
		console.log(error);
	}
};


export const findRelationsBy_FolderId = async (idFolder) => {
	try {
		const relations = await relationModel.find({ idFolder });
		return relations;
	} catch (error) {
		console.log(error);
	}
};

export const deleteRelationsBy_idFolder = async (idFolder) => {
	try {
		const result = await relationModel.deleteMany({ idFolder });
		console.log(result);
		return result;
	} catch (error) {
		console.log(error);
	}
};

export const deleteRelationBy_Id = async (id) => {
	try {
		const deletedRelation = await relationModel.findByIdAndDelete(id);
		return deletedRelation;
	} catch (error) {
		console.log(error);
	}
};
