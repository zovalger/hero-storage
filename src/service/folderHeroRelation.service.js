import mongoose from "mongoose";
import relationModel from "../models/FolderHeroRelation.model";



export const createHeroRelation_service = async (heroId, folderId) => {
  try {
    const relationExists = await relationModel.exists({ idHero: heroId, idFolder: folderId });

    if (relationExists) {
      return false;
    } else {
      await relationModel.create(heroId, folderId);
      return true;
    };
  } catch (error) {
    console.log(error);
  };
};



export const findRelationBy_Id = async (id) => {
    try {
      const relation = await relationModel.findById(id);
      return relation;
    } catch (error) {
      console.log(error);
    };
};



export const findRelationsBy_FolderId = async (folderId) => {
  try {
    const relations = await relationModel.find({ folderId });
    return relations;
  } catch (error) {
    console.log(error);
  };
};



export const deleteRelationBy_Id = async (id) => {
    try {
      const deletedRelation = await relationModel.findByIdAndDelete(id);
      return deletedRelation;
    } catch (error) {
      console.log(error);
    };
};