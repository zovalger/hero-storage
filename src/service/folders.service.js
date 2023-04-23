import mongoose from "mongoose";
import folderModel from "../models/Folder.model";

export const newFolder_service = async (name, idUser) => {
	try {
		const folderExists = await folderModel.exists({ name, idUser });

		if (folderExists) return { error: { message: "la carpeta ya existe" } };

		const folder = await folderModel.create(folder);

		return folder;
	} catch (error) {
		console.log(error);
	}
};

export const findByUserId_service = async (idUser) => {
	try {
		const folders = await folderModel.find({ idUser }).sort({ name: 1 });
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

export const updateFolderName_service = async (folderId, newName) => {
	try {
		const folder = await folderModel.findById(folderId);

		if (!folder) return { error: { message: "carpeta no existe"}};

		folder.name = newName;
	  	const updatedFolder = await folder.save();
	  	return updatedFolder;
	} catch (error) {
		console.log(error);
	}
};


export const delFolder_service = async (folderId) => {
	try {
		// todo: eliminar sus relaciones con los heroes

		const result = await folderModel.deleteOne({ _id: folderId });

		return result.deletedCount > 0;
	} catch (error) {
		console.log(error);
	}
};
