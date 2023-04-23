import mongoose from "mongoose";
import folderModel from "../models/Folder.model";


export const newFolder_service = async (folder) => {
    try {
      const folderExists = await folderModel.exists({ name: folder.name });
  
      if (folderExists) {
        return false;
      } else {
        await folderModel.create(folder);
        return true;
      };
    } catch (error) {
      console.log(error);
    };
};



export const findByUserId_service = async (idUsr) => {
    try {
      const folders = await folderModel.find({ idUser: idUsr });
      return folders;
    } catch (error) {
      console.log(error);
    }
};



export const findByName_service = async (name) => {
    try {
      const folder = await folderModel.findOne({ name });
      return folder;
    } catch (error) {
      console.log(error);
    }
};



export const delFolder_service = async (folderId) => {
  try {
    const result = await folderModel.deleteOne({ _id: folderId });
    return result.deletedCount > 0;
  } catch (error) {
    console.log(error);
  }
};