import FolderModel from "@/models/Folder.model";
import relationModel from "../models/FolderHeroRelation.model";
import { getTheseHeroes } from "./hero.service";

export const createHeroRelation_service = async (idHero, idFolder) => {
	try {
		const relationExists = await relationModel.exists({ idHero, idFolder });

		if (relationExists)
			return { error: { message: "ya existe esta relacion" } };

		const relation = await relationModel.create({ idHero, idFolder });

		if (!relation) return;

		return relation;
	} catch (error) {
		console.log(error);
	}
};

export const createHeroFavoriteRelation_service = async (idHero, idUser) => {
	try {
		const folder = await FolderModel.findOne({ idUser, name: "favorite" });

		const relationExists = await relationModel.exists({
			idHero,
			idFolder: folder._id,
		});

		if (relationExists)
			return { error: { message: "ya existe esta relacion" } };

		const relation = await relationModel.create({
			idHero,
			idFolder: folder._id,
		});

		if (!relation) return;

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

export const deleteRelationByFolderAndHero_service = async (
	idFolder,
	idHero
) => {
	try {
		const deletedRelation = await relationModel.findOneAndDelete({
			idFolder,
			idHero,
		});
		return deletedRelation;
	} catch (error) {
		console.log(error);
	}
};

export const deleteFavoriteRelationByHero_service = async (idHero, idUser) => {
	try {
		const folder = await FolderModel.findOne({ idUser, name: "favorite" });

		const deletedRelation = await relationModel.findOneAndDelete({
			idFolder: folder._id,
			idHero,
		});
		
		return deletedRelation;
	} catch (error) {
		console.log(error);
	}
};

export const getHeroesInFolder_service = async (idFolder) => {
	try {
		const folder = await FolderModel.findById(idFolder);

		if (!folder) return { error: { message: "no existe la carpeta" } };

		const relations = await findRelationsBy_FolderId(idFolder);

		if (relations.length <= 0)
			return { error: { message: "no hay nada en la carpeta" } };

		const idsHeroes = relations.map((r) => r.idHero.toString());

		console.log(idsHeroes);

		const heroes = await getTheseHeroes(idsHeroes);

		return heroes;
	} catch (error) {
		console.log(error);
	}
};
