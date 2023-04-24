import mongoose from "mongoose";
import folderModel from "../models/Folder.model";
import {
	deleteRelationsBy_idFolder,
	findRelationsBy_FolderId,
} from "./folderHeroRelation.service";

export const newFolder_service = async (name, idUser) => {
	try {
		const folderExists = await folderModel.exists({ name, idUser });

		if (folderExists) return { error: { message: "la carpeta ya existe" } };

		const folder = await folderModel.create({ name, idUser });

		return folder;
	} catch (error) {
		console.log(error);
	}
};

export const findByUserId_service = async (idUser) => {
	try {
		const folders = await folderModel
			.find({ idUser }, { idUser: false })
			.sort({ name: 1 });

		return folders;
	} catch (error) {
		console.log(error);
	}
};

export const findById_service = async (id) => {
	try {
		const folder = await folderModel.findById(id);
		return folder;
	} catch (error) {
		console.log(error);
	}
};

export const updateFolderName_service = async (idFolder, name) => {
	try {
		const folder = await folderModel.findById(idFolder, { idUser: false });

		if (!folder) return { error: { message: "carpeta no existe" } };

		folder.name = name;

		return await folder.save();
	} catch (error) {
		console.log(error);
	}
};

export const delFolder_service = async (idFolder) => {
	try {
		const folder = await folderModel.findById(idFolder);

		// todo: ver que no sea la carpeta favorito
		if (!folder) return;
		if (folder.name == "favorite") return;

		await deleteRelationsBy_idFolder(idFolder);

		const result = await folderModel.deleteOne({ _id: idFolder });

		return result.deletedCount > 0;
	} catch (error) {
		console.log(error);
	}
};
