import mongoose from "mongoose";
import relationModel from "../models/FolderHeroRelation.model";


export const createHeroRelation_service = async (idHero, idFolder) => {
    try {
        const heroRelation = new relationModel({ idHero, idFolder});
        const savedRelation = await heroRelation.save();
        return savedRelation;
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
      return null;
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