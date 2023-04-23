import {
	createHeroRelation_service,
	findRelationBy_Id,
	findRelationsBy_FolderId,
	deleteRelationBy_Id,
} from "@/service/folderHeroRelation.service.js";

export async function createNewRelation(req, res) {
	try {
		const { idHero, idFolder } = req.query;
		const data = { idHero, idFolder };
		const relationCreated = await createHeroRelation_service(
			data.idHero,
			data.idFolder
		);

		if (relationCreated) {
			console.log(`relacion creada entre ${idHero} y ${idFolder} `);
		} else {
			console.log(`ya existe una relacion entre ${idHero} y ${idFolder}`);
		}
	} catch (error) {
		console.log(error);
	}
}

export async function findRelationById(req, res) {
	try {
		const { id } = req.query;
		const relation = await findRelationBy_Id(id);

		console.log(`relacion encontrada: ${relation}`);
	} catch (error) {
		console.log(error);
	}
}

export async function findRelationByFolderId(req, res) {
	try {
		const { folderId } = req.query;
		const relations = await findRelationsBy_FolderId(folderId);

		console.log(`relacion(es) encontrada(s): ${relations}`);
	} catch (error) {
		console.log(error);
	}
}

export async function deleteRelationById(req, res) {
	try {
		const { id } = req.params;
		const deletedRelation = await deleteRelationBy_Id(id);

		if (deletedRelation) {
			console.log(`relacion ${deletedRelation} eliminada`);
		} else {
			console.log("relacion no encontrada");
		}
	} catch (error) {
		console.log(error);
	}
}
